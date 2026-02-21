// ============================================================
// Hotel Chandamama - Database Layer (localStorage only)
// NO Firebase imports here - keeps this module pure & crash-free
// ============================================================

export const TABLES = {
    MENU: 'hc_menu',
    ORDERS: 'hc_orders',
    REVIEWS: 'hc_reviews',
    CUSTOMERS: 'hc_customers',
    FUNCTION_BOOKINGS: 'hc_functions',
    CONTACT_MESSAGES: 'hc_contacts',
    GALLERY: 'hc_gallery',
    ANALYTICS: 'hc_analytics',
    DELIVERY_SETTINGS: 'hc_delivery',
    COUPONS: 'hc_coupons',
    INVENTORY: 'hc_inventory',
    SITE_CONTENT: 'hc_content',
    CHATBOT: 'hc_chatbot',
    NOTIFICATIONS: 'hc_notifications',
    ADMIN_SESSION: 'hc_admin_session',
};

// Event system for reactivity
const listeners = new Set();
export function subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function notifyUpdate(table, data) {
    listeners.forEach(cb => { try { cb(table, data); } catch { } });
    try {
        window.dispatchEvent(new CustomEvent('hc_data_changed', { detail: table }));
    } catch { }
}

export function getAll(table) {
    try {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function getSingle(table) {
    try {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export function setOne(table, data) {
    try {
        localStorage.setItem(table, JSON.stringify(data));
        notifyUpdate(table, data);
    } catch (e) {
        console.error('setOne error:', e);
    }
}

export function insert(table, record) {
    try {
        const all = getAll(table);
        const newRecord = {
            ...record,
            id: record.id || Date.now().toString(36),
            createdAt: new Date().toISOString()
        };
        all.push(newRecord);
        localStorage.setItem(table, JSON.stringify(all));
        notifyUpdate(table, all);
        return newRecord;
    } catch (e) {
        console.error('insert error:', e);
        return record;
    }
}

export function update(table, id, data) {
    try {
        const all = getAll(table);
        const idx = all.findIndex(r => r.id === id);
        if (idx === -1) return null;
        all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
        localStorage.setItem(table, JSON.stringify(all));
        notifyUpdate(table, all);
        return all[idx];
    } catch (e) {
        console.error('update error:', e);
        return null;
    }
}

export function remove(table, id) {
    try {
        const all = getAll(table).filter(r => r.id !== id);
        localStorage.setItem(table, JSON.stringify(all));
        notifyUpdate(table, all);
    } catch (e) {
        console.error('remove error:', e);
    }
}

// Authentication
export function adminLogin(password) {
    if (password === 'Admin@hotelChandamama') {
        sessionStorage.setItem(TABLES.ADMIN_SESSION, JSON.stringify({
            loggedIn: true,
            at: new Date().toISOString()
        }));
        return true;
    }
    return false;
}

export function adminLogout() {
    sessionStorage.removeItem(TABLES.ADMIN_SESSION);
    window.location.href = '/admin';
}

export function isAdminLoggedIn() {
    try {
        const session = sessionStorage.getItem(TABLES.ADMIN_SESSION);
        if (!session) return false;
        return JSON.parse(session).loggedIn === true;
    } catch {
        return false;
    }
}

// Analytics
export function trackPageView(page) {
    try {
        const stats = getAll(TABLES.ANALYTICS) || [];
        const today = new Date().toISOString().split('T')[0];
        const idx = stats.findIndex(s => s.date === today);
        if (idx === -1) {
            stats.push({ date: today, views: { [page]: 1 } });
        } else {
            stats[idx].views = stats[idx].views || {};
            stats[idx].views[page] = (stats[idx].views[page] || 0) + 1;
        }
        localStorage.setItem(TABLES.ANALYTICS, JSON.stringify(stats));
    } catch { }
}

export function getStats() {
    const orders = getAll(TABLES.ORDERS);
    const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    return {
        totalOrders: orders.length,
        totalRevenue: revenue,
        avgOrderValue: orders.length ? (revenue / orders.length).toFixed(2) : 0
    };
}

export function seedDatabase() {
    try {
        // Seed menu if empty
        if (getAll(TABLES.MENU).length === 0) {
            const initialMenu = [
                { id: '1', name: 'Veg Biryani', price: 180, category: 'afternoon', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800', available: true },
                { id: '2', name: 'Paneer Butter Masala', price: 220, category: 'afternoon', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800', available: true },
                { id: '3', name: 'Masala Dosa', price: 60, category: 'morning', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800', available: true },
                { id: '4', name: 'Filter Coffee', price: 25, category: 'coffees', image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=800', available: true },
            ];
            initialMenu.forEach(item => insert(TABLES.MENU, item));
        }
        // Seed site content if empty
        if (!getSingle(TABLES.SITE_CONTENT)) {
            setOne(TABLES.SITE_CONTENT, {
                hotelName: 'Hotel Chandamama',
                tagline: 'Authentic Pure Vegetarian Cuisine',
                phone: '09989324091',
                email: 'info@hotelchandamama.com',
                address: 'NRT Road, Vinukonda, Andhra Pradesh',
                openTime: '06:00',
                closeTime: '22:00',
                avgRating: '4.9',
                reviewCount: '124',
                heroUrl: '',
                logoUrl: ''
            });
        }
    } catch (e) {
        console.error('seedDatabase error:', e);
    }
}

// Cloud sync helper - called explicitly from App.jsx (NOT auto-run on every write)
export async function syncAllToCloud(firebaseSvc) {
    if (!firebaseSvc || !firebaseSvc.isEnabled()) return { success: false, reason: 'Firebase not available' };
    const results = { pushed: [], failed: [] };
    const allTables = Object.values(TABLES);
    for (const t of allTables) {
        if (t === TABLES.ADMIN_SESSION) continue;
        const localData = localStorage.getItem(t);
        if (localData) {
            try {
                await firebaseSvc.pushToCloud(t, JSON.parse(localData));
                localStorage.setItem(`hc_pushed_${t}`, 'true');
                results.pushed.push(t);
            } catch (err) {
                results.failed.push(t);
                console.warn(`Failed to push ${t}:`, err.message);
            }
        }
    }
    return results;
}
