import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, MessageSquare, UtensilsCrossed, TrendingUp, Users, Package, CalendarDays } from 'lucide-react';
import { getAll, getSingle, TABLES } from '../../db/database';

export default function DashboardHome() {
    const [stats, setStats] = useState({});
    const content = getSingle(TABLES.SITE_CONTENT) || {};

    useEffect(() => {
        const orders = getAll(TABLES.ORDERS);
        const reviews = getAll(TABLES.REVIEWS);
        const menuItems = getAll(TABLES.MENU);
        const contacts = getAll(TABLES.CONTACT_MESSAGES);
        const functions = getAll(TABLES.FUNCTION_BOOKINGS);
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = orders.filter(o => o.createdAt?.startsWith(today));
        const todayRevenue = todayOrders.reduce((s, o) => s + (o.total || 0), 0);
        const pending = orders.filter(o => o.status === 'Received').length;
        setStats({ orders: orders.length, reviews: reviews.length, menuItems: menuItems.length, contacts: contacts.filter(c => !c.read).length, todayOrders: todayOrders.length, todayRevenue, pending, avgRating: reviews.length > 0 ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : content.rating, functions: functions.length });
    }, []);

    const cards = [
        { label: "Today's Orders", value: stats.todayOrders || 0, icon: ShoppingBag, color: '#00bbc4', to: '/admin/orders', sub: `₹${stats.todayRevenue || 0} revenue` },
        { label: 'Pending Orders', value: stats.pending || 0, icon: TrendingUp, color: '#FF9800', to: '/admin/orders', sub: 'Needs attention' },
        { label: 'Menu Items', value: stats.menuItems || 0, icon: UtensilsCrossed, color: '#9C27B0', to: '/admin/menu', sub: 'Active items' },
        { label: 'Avg Rating', value: stats.avgRating || '4.3', icon: Star, color: '#FFD700', to: '/admin/reviews', sub: `${stats.reviews || 0} reviews` },
        { label: 'Unread Messages', value: stats.contacts || 0, icon: MessageSquare, color: '#E91E63', to: '/admin/contacts', sub: 'Contact queries' },
        { label: 'Function Bookings', value: stats.functions || 0, icon: CalendarDays, color: '#4CAF50', to: '/admin/functions', sub: 'Event orders' },
        { label: 'Total Orders', value: stats.orders || 0, icon: Package, color: '#795548', to: '/admin/orders', sub: 'All time' },
    ];

    // Now/open status
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const isOpen = h >= 6 && (h < 22 || (h === 22 && m === 0));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Dashboard</h1>
                    <p className="text-sm opacity-60">Welcome back, Admin!</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${isOpen ? 'badge-open' : 'badge-closed'}`}>
                    {isOpen ? '✅ Hotel Open' : '❌ Hotel Closed'}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {cards.map(card => (
                    <Link key={card.label} to={card.to} className="peacock-card p-4 rounded-2xl hover:scale-105 transition-transform">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}22` }}>
                                <card.icon size={20} style={{ color: card.color }} />
                            </div>
                        </div>
                        <div className="text-2xl font-black mb-0.5" style={{ color: card.color }}>{card.value}</div>
                        <div className="text-sm font-medium">{card.label}</div>
                        <div className="text-xs opacity-50 mt-0.5">{card.sub}</div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="peacock-card p-5 rounded-2xl mb-6">
                <h2 className="font-bold mb-4" style={{ color: '#00bbc4' }}>Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { to: '/admin/menu', label: 'Add Menu Item', emoji: '➕' },
                        { to: '/admin/orders', label: 'View Orders', emoji: '📦' },
                        { to: '/admin/gallery', label: 'Upload Photo', emoji: '📸' },
                        { to: '/admin/export', label: 'Export Excel', emoji: '📊' },
                        { to: '/admin/qr', label: 'QR Code', emoji: '📱' },
                        { to: '/admin/content', label: 'Edit Content', emoji: '✏️' },
                        { to: '/admin/backup', label: 'Backup Data', emoji: '💾' },
                        { to: '/admin/coupons', label: 'Add Coupon', emoji: '🎟️' },
                    ].map(a => (
                        <Link key={a.to} to={a.to} className="flex flex-col items-center py-3 px-2 rounded-xl text-center hover:opacity-80 transition-opacity"
                            style={{ background: 'rgba(0,107,113,0.3)', border: '1px solid rgba(0,187,196,0.15)' }}>
                            <span className="text-2xl mb-1">{a.emoji}</span>
                            <span className="text-xs font-medium">{a.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            {(() => {
                const recent = getAll(TABLES.ORDERS).slice(-5).reverse();
                return recent.length > 0 ? (
                    <div className="peacock-card p-5 rounded-2xl">
                        <h2 className="font-bold mb-4" style={{ color: '#00bbc4' }}>Recent Orders</h2>
                        <div className="space-y-2">
                            {recent.map(o => (
                                <div key={o.id} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                    <div>
                                        <span className="font-mono text-sm font-bold" style={{ color: '#00bbc4' }}>{o.orderId}</span>
                                        <span className="mx-2 opacity-50">·</span>
                                        <span className="text-sm">{o.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-sm" style={{ color: '#FFD700' }}>₹{o.total}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${o.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : o.status === 'Received' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {o.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null;
            })()}
        </div>
    );
}
