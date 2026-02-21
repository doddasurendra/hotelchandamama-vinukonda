import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { adminLogout, syncAllToCloud } from '../db/database';
import { firebaseService } from '../db/firebaseService';
import {
    LayoutDashboard, UtensilsCrossed, ShoppingBag, CalendarDays, Images,
    Star, QrCode, MessageSquare, Settings, BarChart2, Bot, Package,
    Tag, Bell, Database, Truck, Download, LogOut, Menu, X, ChevronRight, RefreshCw
} from 'lucide-react';

// Import all admin sections
import DashboardHome from './sections/DashboardHome';
import MenuManager from './sections/MenuManager';
import OrdersManager from './sections/OrdersManager';
import FunctionsManager from './sections/FunctionsManager';
import GalleryManager from './sections/GalleryManager';
import ReviewsManager from './sections/ReviewsManager';
import QRManager from './sections/QRManager';
import ContactMessages from './sections/ContactMessages';
import ContentManager from './sections/ContentManager';
import AnalyticsDashboard from './sections/AnalyticsDashboard';
import ChatbotSettings from './sections/ChatbotSettings';
import InventoryControl from './sections/InventoryControl';
import CouponSystem from './sections/CouponSystem';
import NotificationSettings from './sections/NotificationSettings';
import BackupSystem from './sections/BackupSystem';
import DeliverySettings from './sections/DeliverySettings';
import ExcelExport from './sections/ExcelExport';

const NAV_ITEMS = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menu Manager' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/functions', icon: CalendarDays, label: 'Functions' },
    { to: '/admin/gallery', icon: Images, label: 'Gallery' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
    { to: '/admin/qr', icon: QrCode, label: 'QR Manager' },
    { to: '/admin/contacts', icon: MessageSquare, label: 'Messages' },
    { to: '/admin/content', icon: Settings, label: 'Content' },
    { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/admin/chatbot', icon: Bot, label: 'Chatbot' },
    { to: '/admin/inventory', icon: Package, label: 'Inventory' },
    { to: '/admin/coupons', icon: Tag, label: 'Coupons' },
    { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { to: '/admin/delivery', icon: Truck, label: 'Delivery' },
    { to: '/admin/export', icon: Download, label: 'Excel Export' },
    { to: '/admin/backup', icon: Database, label: 'Backup' },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const [syncing, setSyncing] = useState(false);

    const handleLogout = () => {
        adminLogout();
        navigate('/admin');
    };

    const isActive = (path) => location.pathname === path;

    const Sidebar = () => (
        <div className={`admin-sidebar h-full flex flex-col overflow-y-auto`} style={{ width: '240px', minHeight: '100vh' }}>
            {/* Logo */}
            <div className="px-4 py-5 border-b" style={{ borderColor: 'rgba(0,187,196,0.2)' }}>
                <div className="font-bold text-sm" style={{ color: '#00bbc4' }}>Hotel Chandamama</div>
                <div className="text-xs opacity-50">Admin Dashboard</div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-3 px-2 space-y-0.5">
                {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
                    <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(to) ? 'nav-active text-peacock-400' : 'text-peacock-200 hover:bg-peacock-900/40 hover:text-white'}`}>
                        <Icon size={16} />
                        {label}
                        {isActive(to) && <ChevronRight size={14} className="ml-auto" />}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t" style={{ borderColor: 'rgba(0,187,196,0.2)' }}>
                <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs opacity-50 hover:opacity-80 rounded-lg mb-1">
                    ← View Website
                </Link>
                <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut size={15} /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen" style={{ background: '#000e10' }}>
            {/* Desktop sidebar */}
            <div className="hidden lg:block flex-shrink-0" style={{ width: '240px' }}>
                <div className="fixed top-0 left-0 h-full" style={{ width: '240px', zIndex: 40 }}>
                    <Sidebar />
                </div>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="flex-shrink-0" style={{ width: '240px' }}>
                        <Sidebar />
                    </div>
                    <div className="flex-1 bg-black/60" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Topbar */}
                <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(0,14,16,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,187,196,0.2)' }}>
                    <button className="lg:hidden p-1.5 rounded-lg" style={{ color: '#00bbc4' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="text-sm font-semibold" style={{ color: '#00bbc4' }}>
                        {NAV_ITEMS.find(n => n.to === location.pathname)?.label || 'Admin'}
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <button
                            onClick={async () => {
                                setSyncing(true);
                                try {
                                    const result = await syncAllToCloud(firebaseService);
                                    setSyncing(false);
                                    // Show success briefly
                                    const btn = document.getElementById('sync-btn');
                                    if (btn) {
                                        btn.textContent = `✓ Synced ${result?.pushed?.length || 0} tables`;
                                        btn.style.color = '#00c851';
                                        setTimeout(() => {
                                            btn.textContent = '☁ Push to Cloud (Sync Mobile)';
                                            btn.style.color = '#00bbc4';
                                        }, 3000);
                                    }
                                } catch {
                                    setSyncing(false);
                                    const btn = document.getElementById('sync-btn');
                                    if (btn) {
                                        btn.textContent = '✗ Sync Failed - Check Firebase';
                                        btn.style.color = '#ff4444';
                                        setTimeout(() => {
                                            btn.textContent = '☁ Push to Cloud (Sync Mobile)';
                                            btn.style.color = '#00bbc4';
                                        }, 4000);
                                    }
                                }
                            }}
                            id="sync-btn"
                            disabled={syncing}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${syncing ? 'opacity-50' : 'hover:scale-105'}`}
                            style={{ background: 'rgba(0,187,196,0.15)', border: '1px solid rgba(0,187,196,0.3)', color: '#00bbc4', minWidth: '180px', justifyContent: 'center' }}
                        >
                            <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                            {syncing ? 'Syncing... (up to 8s)' : '☁ Push to Cloud (Sync Mobile)'}
                        </button>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>A</div>
                        <span className="text-xs opacity-60 hidden sm:block">Admin</span>
                    </div>
                </div>

                {/* Page content */}
                <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    <Routes>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="menu" element={<MenuManager />} />
                        <Route path="orders" element={<OrdersManager />} />
                        <Route path="functions" element={<FunctionsManager />} />
                        <Route path="gallery" element={<GalleryManager />} />
                        <Route path="reviews" element={<ReviewsManager />} />
                        <Route path="qr" element={<QRManager />} />
                        <Route path="contacts" element={<ContactMessages />} />
                        <Route path="content" element={<ContentManager />} />
                        <Route path="analytics" element={<AnalyticsDashboard />} />
                        <Route path="chatbot" element={<ChatbotSettings />} />
                        <Route path="inventory" element={<InventoryControl />} />
                        <Route path="coupons" element={<CouponSystem />} />
                        <Route path="notifications" element={<NotificationSettings />} />
                        <Route path="delivery" element={<DeliverySettings />} />
                        <Route path="export" element={<ExcelExport />} />
                        <Route path="backup" element={<BackupSystem />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
