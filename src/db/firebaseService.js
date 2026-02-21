import { initializeApp, getApps } from "firebase/app";
import {
    getFirestore, doc, setDoc, getDoc, collection, getDocs, writeBatch
} from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

const isConfigValid =
    firebaseConfig &&
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'YOUR_PROJECT_ID';

let firestoreDb = null;
try {
    if (isConfigValid) {
        const existing = getApps();
        const app = existing.length > 0 ? existing[0] : initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
    }
} catch (e) {
    console.warn("Firebase init failed:", e.message);
}

function withTimeout(promise, ms = 10000) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout ${ms}ms`)), ms)
        )
    ]);
}

// Split large array into chunks for Firestore (< 900KB each)
function splitIntoChunks(items, maxSizeBytes = 800000) {
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;
    for (const item of items) {
        const itemSize = JSON.stringify(item).length;
        if (currentSize + itemSize > maxSizeBytes && currentChunk.length > 0) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentSize = 0;
        }
        currentChunk.push(item);
        currentSize += itemSize;
    }
    if (currentChunk.length > 0) chunks.push(currentChunk);
    return chunks;
}

export const firebaseService = {
    isEnabled: () => !!firestoreDb,
    isStorageEnabled: () => false, // Using Firestore chunking instead

    // Upload image — returns base64 as-is (for compatibility)
    uploadImage: async (base64DataUrl, filename) => {
        // Without Storage, just return the base64 as the URL
        // Chunks handle the size issue in Firestore
        return base64DataUrl;
    },

    // Push table to Firestore, with chunking for large data (like gallery)
    pushToCloud: async (table, data) => {
        if (!firestoreDb) return;
        try {
            if (!Array.isArray(data)) {
                // Single object (e.g. SITE_CONTENT) — store directly
                const payload = { data, updatedAt: new Date().toISOString() };
                if (JSON.stringify(payload).length > 900000) {
                    // Compress: remove long base64 from objects
                    const compressed = {};
                    for (const [k, v] of Object.entries(data)) {
                        if (typeof v === 'string' && v.startsWith('data:') && v.length > 50000) {
                            compressed[k] = v.substring(0, 50000) + '...TRUNCATED';
                        } else {
                            compressed[k] = v;
                        }
                    }
                    await withTimeout(setDoc(doc(firestoreDb, 'hc_sync', table), { data: compressed, updatedAt: new Date().toISOString() }));
                } else {
                    await withTimeout(setDoc(doc(firestoreDb, 'hc_sync', table), payload));
                }
                return;
            }

            // Array data — split into chunks
            const chunks = splitIntoChunks(data);
            const batch = writeBatch(firestoreDb);

            // Store metadata doc
            batch.set(doc(firestoreDb, 'hc_sync', table), {
                data: [], // placeholder
                chunks: chunks.length,
                updatedAt: new Date().toISOString()
            });

            // Store each chunk
            chunks.forEach((chunk, i) => {
                batch.set(doc(firestoreDb, 'hc_sync_chunks', `${table}_${i}`), {
                    table, chunk: i, data: chunk, updatedAt: new Date().toISOString()
                });
            });

            await withTimeout(batch.commit(), 20000);
        } catch (e) {
            console.warn(`pushToCloud failed [${table}]:`, e.message);
            throw e;
        }
    },

    // Pull ALL tables from Firestore (handles chunked arrays)
    pullAllFromCloud: async () => {
        if (!firestoreDb) return false;
        try {
            // Get main docs
            const mainSnap = await withTimeout(getDocs(collection(firestoreDb, 'hc_sync')));
            const mainDocs = {};
            mainSnap.forEach(d => { mainDocs[d.id] = d.data(); });

            // Get all chunks
            let chunkDocs = {};
            try {
                const chunkSnap = await withTimeout(getDocs(collection(firestoreDb, 'hc_sync_chunks')));
                chunkSnap.forEach(d => { chunkDocs[d.id] = d.data(); });
            } catch { }

            let count = 0;
            for (const [table, tableData] of Object.entries(mainDocs)) {
                const numChunks = tableData.chunks;
                if (numChunks && numChunks > 1) {
                    // Reassemble from chunks
                    const allItems = [];
                    for (let i = 0; i < numChunks; i++) {
                        const chunkDoc = chunkDocs[`${table}_${i}`];
                        if (chunkDoc) allItems.push(...chunkDoc.data);
                    }
                    if (allItems.length > 0) {
                        localStorage.setItem(table, JSON.stringify(allItems));
                        count++;
                    }
                } else if (tableData.data !== undefined && tableData.data !== null) {
                    localStorage.setItem(table, JSON.stringify(tableData.data));
                    count++;
                }
            }
            return count > 0;
        } catch (e) {
            console.warn('pullAllFromCloud failed:', e.message);
            return false;
        }
    }
};
