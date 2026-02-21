import { useEffect, useState } from 'react';
import { getAll, TABLES } from '../../db/database';

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setAnalytics(getAll(TABLES.ANALYTICS));
        setOrders(getAll(TABLES.ORDERS));
    }, []);

    const totalViews = analytics.reduce((s, a) => s + (a.views || 0), 0);
    const pageViews = {};
    analytics.forEach(a => { pageViews[a.page] = (pageViews[a.page] || 0) + (a.views || 0); });
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt?.startsWith(today));
    const todayRev = todayOrders.reduce((s, o) => s + (o.total || 0), 0);

    const maxViews = Math.max(...Object.values(pageViews), 1);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Analytics</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Page Views', value: totalViews, emoji: '👀' },
                    { label: "Today's Orders", value: todayOrders.length, emoji: '📦' },
                    { label: "Today's Revenue", value: `₹${todayRev}`, emoji: '💰' },
                    { label: 'Total Revenue', value: `₹${totalRevenue}`, emoji: '💎' },
                ].map(s => (
                    <div key={s.label} className="peacock-card p-4 rounded-xl text-center">
                        <div className="text-2xl mb-1">{s.emoji}</div>
                        <div className="text-xl font-black" style={{ color: '#00bbc4' }}>{s.value}</div>
                        <div className="text-xs opacity-60">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Page view breakdown */}
                <div className="peacock-card p-5 rounded-2xl">
                    <h2 className="font-bold mb-4" style={{ color: '#00bbc4' }}>Page Views</h2>
                    <div className="space-y-3">
                        {Object.entries(pageViews).map(([page, views]) => (
                            <div key={page}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="capitalize">{page}</span>
                                    <span className="font-bold" style={{ color: '#FFD700' }}>{views}</span>
                                </div>
                                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                    <div className="h-full rounded-full" style={{ width: `${(views / maxViews) * 100}%`, background: 'linear-gradient(90deg, #00bbc4, #006b71)' }} />
                                </div>
                            </div>
                        ))}
                        {Object.keys(pageViews).length === 0 && <div className="text-center opacity-50 py-4">No page view data yet. Visit the public pages to generate analytics.</div>}
                    </div>
                </div>

                {/* Order breakdown */}
                <div className="peacock-card p-5 rounded-2xl">
                    <h2 className="font-bold mb-4" style={{ color: '#00bbc4' }}>Order Status Breakdown</h2>
                    <div className="space-y-2">
                        {['Received', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map(status => {
                            const count = orders.filter(o => o.status === status).length;
                            return (
                                <div key={status} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'rgba(0,107,113,0.2)' }}>
                                    <span className="text-sm">{status}</span>
                                    <span className="font-bold" style={{ color: '#FFD700' }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
