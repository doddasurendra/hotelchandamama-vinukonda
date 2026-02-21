import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { getSingle, TABLES } from '../db/database';

export default function Footer() {
    const content = getSingle(TABLES.SITE_CONTENT) || {};
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#000e10', borderTop: '1px solid rgba(0,187,196,0.2)' }}>
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <div className="text-2xl font-bold mb-2" style={{ color: '#00bbc4' }}>Hotel Chandamama</div>
                    <div className="text-sm opacity-60 mb-4">SPOONS • SELF SERVICE • TAKE AWAY</div>
                    <div className="flex gap-3">
                        <a href={content.instagram || '#'} target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)' }}>
                            <Instagram size={16} className="text-white" />
                        </a>
                        <a href={content.facebook || '#'} target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ background: '#1877F2' }}>
                            <Facebook size={16} className="text-white" />
                        </a>
                        <a href={content.youtube || '#'} target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                            style={{ background: '#FF0000' }}>
                            <Youtube size={16} className="text-white" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="font-semibold mb-4" style={{ color: '#00bbc4' }}>Quick Links</div>
                    {[['/', 'Home'], ['/menu', 'Menu'], ['/order', 'Order Now'], ['/functions', 'Functions'], ['/contact', 'Contact']].map(([to, label]) => (
                        <Link key={to} to={to} className="block text-sm opacity-70 hover:opacity-100 hover:text-peacock-300 mb-2 transition-opacity">
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Contact */}
                <div>
                    <div className="font-semibold mb-4" style={{ color: '#00bbc4' }}>Contact Us</div>
                    <div className="space-y-3 text-sm opacity-80">
                        <div className="flex gap-2 items-start">
                            <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#00bbc4' }} />
                            <span>NRT Road, Beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Phone size={14} style={{ color: '#00bbc4' }} />
                            <a href={`tel:${content.phone || '09989324091'}`} className="hover:text-peacock-300">{content.phone || '09989324091'}</a>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MessageCircle size={14} style={{ color: '#25D366' }} />
                            <a href={`https://wa.me/91${(content.whatsapp || '09989324091').replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="hover:text-green-400">WhatsApp Us</a>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Clock size={14} style={{ color: '#00bbc4' }} />
                            <span>6:00 AM – 10:00 PM (Daily)</span>
                        </div>
                    </div>
                </div>

                {/* Menu Categories */}
                <div>
                    <div className="font-semibold mb-4" style={{ color: '#00bbc4' }}>Our Menu</div>
                    <div className="space-y-2 text-sm opacity-80">
                        {['🌅 Morning Tiffins', '☀️ Afternoon Meals', '🌆 Evening Snacks', '🧃 Mocktails', '🍦 Ice Creams', '☕ Coffees'].map(item => (
                            <Link key={item} to="/menu" className="block hover:text-peacock-300 hover:opacity-100 transition-opacity">{item}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm opacity-50 gap-2" style={{ borderColor: 'rgba(0,187,196,0.1)' }}>
                <span>© {year} Hotel Chandamama, Vinukonda. All rights reserved.</span>
                <Link to="/admin" className="hover:opacity-100 hover:text-peacock-300">Admin Login</Link>
            </div>
        </footer>
    );
}
