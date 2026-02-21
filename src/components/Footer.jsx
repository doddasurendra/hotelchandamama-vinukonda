import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, UtensilsCrossed } from 'lucide-react';
import { TABLES } from '../db/database';
import { useRecord } from '../db/hooks';

export default function Footer() {
    const content = useRecord(TABLES.SITE_CONTENT) || {};
    const year = new Date().getFullYear();

    return (
        <footer className="footer-gradient pt-16 pb-8 px-4 border-t" style={{ borderColor: 'rgba(0,187,196,0.2)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                                style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                <UtensilsCrossed size={18} />
                            </div>
                            <span className="font-black text-xl tracking-tight" style={{ color: '#00bbc4' }}>HOTEL CHANDAMAMA</span>
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed mb-6">
                            {content.introText || "Vinukonda's most loved pure vegetarian restaurant. Experience the true taste of tradition with every bite."}
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Instagram} url={content.instagram} />
                            <SocialIcon icon={Facebook} url={content.facebook} />
                            <SocialIcon icon={Youtube} url={content.youtube} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Navigation</h4>
                        <div className="grid grid-cols-1 gap-3">
                            <FooterLink to="/">Home Page</FooterLink>
                            <FooterLink to="/menu">Food Menu</FooterLink>
                            <FooterLink to="/order">Online Order</FooterLink>
                            <FooterLink to="/functions">Function Booking</FooterLink>
                            <FooterLink to="/contact">Contact Support</FooterLink>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
                        <div className="space-y-4">
                            <ContactItem icon={Phone} text={content.phone || '09989324091'} />
                            <ContactItem icon={Mail} text={content.email || 'hotel@example.com'} />
                            <ContactItem icon={MapPin} text="NRT Road, Vinukonda, AP" />
                        </div>
                    </div>

                    {/* Timings */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Opening Hours</h4>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.2)', border: '1px solid rgba(0,187,196,0.2)' }}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="opacity-60">Mon - Sun</span>
                                <span className="font-bold text-peacock-300">{content.openTime || '06:00'} AM - {content.closeTime || '10:00'} PM</span>
                            </div>
                            <div className="text-[10px] opacity-40 uppercase tracking-tighter">Open all days including holidays</div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs opacity-40">
                        © {year} Hotel Chandamama. All rights reserved. Vinukonda, Andhra Pradesh.
                    </div>
                    <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-40">
                        <Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
                        <span className="cursor-default">Privacy Policy</span>
                        <span className="cursor-default">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon, url }) {
    return (
        <a href={url || '#'} target="_blank" rel="noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
            style={{ background: 'rgba(0,187,196,0.1)', border: '1px solid rgba(0,187,196,0.2)' }}>
            <Icon size={16} style={{ color: '#00bbc4' }} />
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="text-sm opacity-60 hover:opacity-100 hover:translate-x-1 transition-all flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-peacock-400"></span>
            {children}
        </Link>
    );
}

function ContactItem({ icon: Icon, text }) {
    return (
        <div className="flex items-start gap-3">
            <Icon size={16} className="mt-0.5" style={{ color: '#00bbc4' }} />
            <span className="text-sm opacity-60">{text}</span>
        </div>
    );
}
