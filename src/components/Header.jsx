import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UtensilsCrossed, Lock } from 'lucide-react';
import { TABLES } from '../db/database';
import { useRecord } from '../db/hooks';

export default function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const content = useRecord(TABLES.SITE_CONTENT) || {};
    const logoUrl = content.logoUrl || '';

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/order', label: 'Order' },
        { to: '/functions', label: 'Functions' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'rgba(0,14,16,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,187,196,0.3)' }}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Hotel Chandamama" className="h-12 w-12 rounded-full object-cover border-2 border-peacock-400" />
                    ) : (
                        <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                            <UtensilsCrossed size={22} />
                        </div>
                    )}
                    <div className="hidden sm:block">
                        <div className="font-bold text-lg leading-tight" style={{ color: '#00bbc4' }}>Hotel Chandamama</div>
                        <div className="text-xs opacity-60">Vinukonda, Andhra Pradesh</div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.to) ? 'text-white' : 'text-peacock-200 hover:text-white hover:bg-peacock-800/40'}`}
                            style={isActive(link.to) ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' } : {}}>
                            {link.label}
                        </Link>
                    ))}
                    <a href="tel:09989324091"
                        className="ml-1 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                        style={{ background: 'linear-gradient(135deg, #00c851, #007e33)' }}>
                        <Phone size={14} /> Call
                    </a>
                    {/* Admin Login Button */}
                    <Link to="/admin"
                        className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                        style={{ background: 'rgba(0,69,73,0.6)', border: '1px solid rgba(0,187,196,0.3)', color: '#80e0e5' }}
                        title="Admin Login">
                        <Lock size={13} /> Admin
                    </Link>
                </nav>

                {/* Mobile right-side buttons */}
                <div className="flex lg:hidden items-center gap-2">
                    <a href="tel:09989324091" className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #00c851, #007e33)' }}>
                        <Phone size={12} /> Call
                    </a>
                    <Link to="/admin" className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,69,73,0.6)', border: '1px solid rgba(0,187,196,0.3)', color: '#80e0e5' }}>
                        <Lock size={12} /> Admin
                    </Link>
                    <button className="p-2 rounded-lg text-peacock-300" onClick={() => setOpen(!open)}>
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="lg:hidden px-4 pb-4" style={{ background: 'rgba(0,14,16,0.98)' }}>
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                            className={`block py-3 px-4 rounded-lg mb-1 text-sm font-medium ${isActive(link.to) ? 'text-white' : 'text-peacock-200'}`}
                            style={isActive(link.to) ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)' } : {}}>
                            {link.label}
                        </Link>
                    ))}
                    <a href="tel:09989324091" className="block py-3 px-4 rounded-lg text-center text-sm font-semibold text-white mt-2"
                        style={{ background: 'linear-gradient(135deg, #00c851, #007e33)' }}>
                        📞 Call: 09989324091
                    </a>
                    <Link to="/admin" onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-center text-sm font-medium mt-2"
                        style={{ background: 'rgba(0,69,73,0.6)', border: '1px solid rgba(0,187,196,0.3)', color: '#80e0e5' }}>
                        <Lock size={14} /> Admin Login
                    </Link>
                </div>
            )}
        </header>
    );
}
