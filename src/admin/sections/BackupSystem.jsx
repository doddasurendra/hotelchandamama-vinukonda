import { useState, useEffect } from 'react';
import { Download, Upload, Database, Cloud, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { getAll, setOne, getSingle, TABLES, subscribe } from '../../db/database';
import { firebaseService } from '../../db/firebaseService';
import { isConfigured } from '../../db/firebaseConfig';

const ALL_TABLES = Object.values(TABLES);

function exportBackup() {
    const backup = {};
    ALL_TABLES.forEach(t => { backup[t] = getAll(t); });
    backup['_singletons'] = {};
    ['hc_content', 'hc_delivery', 'hc_chatbot', 'hc_notifications'].forEach(key => {
        backup['_singletons'][key] = getSingle(key);
    });
    backup['_timestamp'] = new Date().toISOString();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `HotelChandamama_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function importBackup(file) {
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const backup = JSON.parse(ev.target.result);
            ALL_TABLES.forEach(t => { if (backup[t]) localStorage.setItem(t, JSON.stringify(backup[t])); });
            if (backup['_singletons']) {
                Object.entries(backup['_singletons']).forEach(([k, v]) => { if (v) localStorage.setItem(k, JSON.stringify(v)); });
            }
            alert(`✅ Backup restored successfully! Backed up at: ${backup._timestamp || 'Unknown'}\n\nPlease refresh the page.`);
        } catch { alert('❌ Invalid backup file!'); }
    };
    reader.readAsText(file);
}

export default function BackupSystem() {
    const [lastSync, setLastSync] = useState(localStorage.getItem('hc_last_sync') || 'Never');
    const [syncing, setSyncing] = useState(false);
    const totalRecords = ALL_TABLES.reduce((s, t) => s + getAll(t).length, 0);

    const handleManualPush = async () => {
        if (!window.confirm('This will overwrite all Cloud data with your Laptop data. Continue?')) return;
        setSyncing(true);
        try {
            for (const table of ALL_TABLES) {
                const data = localStorage.getItem(table);
                if (data) await firebaseService.pushToCloud(table, JSON.parse(data));
            }
            const now = new Date().toLocaleTimeString();
            localStorage.setItem('hc_last_sync', now);
            setLastSync(now);
            alert('✅ Successfully pushed all data to Cloud!');
        } catch (e) {
            alert('❌ Sync failed: ' + e.message);
        } finally {
            setSyncing(false);
        }
    };

    const handleManualPull = async () => {
        if (!window.confirm('This will overwrite your Laptop data with Cloud data. Continue?')) return;
        setSyncing(true);
        try {
            // We just trigger the standard sync from cloud for all tables
            [TABLES.SITE_CONTENT, TABLES.MENU, TABLES.GALLERY, TABLES.DELIVERY_SETTINGS, TABLES.REVIEWS].forEach(t => {
                firebaseService.syncFromCloud(t, () => {
                    window.dispatchEvent(new CustomEvent('hc_data_changed', { detail: t }));
                });
            });
            const now = new Date().toLocaleTimeString();
            localStorage.setItem('hc_last_sync', now);
            setLastSync(now);
            alert('✅ Syncing started! Data will update in real-time.');
        } catch (e) {
            alert('❌ Pull failed: ' + e.message);
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Sync & Backup Center</h1>

            {/* Cloud Sync Status */}
            <div className="peacock-card p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cloud size={100} />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${isConfigured ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            <RefreshCw className={syncing ? 'animate-spin' : ''} style={{ color: isConfigured ? '#4ade80' : '#ff4444' }} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Real-Time Cloud Sync</h2>
                            <p className="text-sm opacity-60">Status: {isConfigured ? 'Connected' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-60">Last Sync Activity</p>
                        <p className="font-mono text-sm" style={{ color: '#00bbc4' }}>{lastSync}</p>
                    </div>
                </div>

                {!isConfigured && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-4 text-sm text-yellow-200">
                        ⚠️ Cloud features are not configured. Your data is currently stored only on this device.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={handleManualPush}
                        disabled={!isConfigured || syncing}
                        className="flex items-center justify-center gap-3 p-4 rounded-xl transition-all hover:scale-102 disabled:opacity-50"
                        style={{ background: 'rgba(0,187,196,0.1)', border: '1px solid rgba(0,187,196,0.3)' }}
                    >
                        <Monitor size={20} />
                        <div className="text-left">
                            <span className="block font-bold">Push to Cloud</span>
                            <span className="block text-[10px] opacity-60">Upload Laptop data to Mobile</span>
                        </div>
                    </button>
                    <button
                        onClick={handleManualPull}
                        disabled={!isConfigured || syncing}
                        className="flex items-center justify-center gap-3 p-4 rounded-xl transition-all hover:scale-102 disabled:opacity-50"
                        style={{ background: 'rgba(255,152,0,0.1)', border: '1px solid rgba(255,152,0,0.3)' }}
                    >
                        <Smartphone size={20} />
                        <div className="text-left">
                            <span className="block font-bold">Pull from Cloud</span>
                            <span className="block text-[10px] opacity-60">Download Cloud data to Laptop</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Export */}
                <div className="peacock-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Download size={24} style={{ color: '#00bbc4' }} />
                        <div>
                            <h2 className="font-bold">JSON Export</h2>
                            <div className="text-xs opacity-60">{totalRecords} total records</div>
                        </div>
                    </div>
                    <p className="text-sm opacity-70 mb-4">Save a physical backup file on your device for safety.</p>
                    <button onClick={exportBackup} className="btn-primary w-full flex items-center justify-center gap-2">
                        <Download size={16} /> Download .json
                    </button>
                </div>

                {/* Import */}
                <div className="peacock-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Upload size={24} style={{ color: '#FFD700' }} />
                        <div>
                            <h2 className="font-bold">Restore Backup</h2>
                            <div className="text-xs opacity-60">Import from file</div>
                        </div>
                    </div>
                    <p className="text-sm opacity-70 mb-4">⚠️ Overwrites all data. Use with caution.</p>
                    <label className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer" style={{ background: 'linear-gradient(135deg, #FF9800, #e64a19)' }}>
                        <Upload size={16} /> Choose File
                        <input type="file" accept=".json" className="hidden" onChange={e => { if (e.target.files[0]) importBackup(e.target.files[0]); }} />
                    </label>
                </div>
            </div>
        </div>
    );
}
