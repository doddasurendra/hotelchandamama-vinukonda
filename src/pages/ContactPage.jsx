import { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Mail, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import ChatBot from '../components/ChatBot';
import { insert, TABLES, trackPageView } from '../db/database';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        trackPageView('contact');
        document.title = 'Contact – Hotel Chandamama Vinukonda';
    }, []);

    const handle = (e) => {
        e.preventDefault();
        insert(TABLES.CONTACT_MESSAGES, { ...form, read: false });
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000e10 0%, #001f22 100%)' }}>
            <Header />
            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-3" style={{ background: 'linear-gradient(135deg, #00bbc4, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        📞 Contact Us
                    </h1>
                    <p className="opacity-70">We'd love to hear from you!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Info */}
                    <div className="space-y-5">
                        <div className="peacock-card p-5 rounded-2xl flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                <MapPin size={22} className="text-white" />
                            </div>
                            <div>
                                <div className="font-bold mb-1" style={{ color: '#00bbc4' }}>Our Address</div>
                                <div className="text-sm opacity-80">NRT Road, Beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh</div>
                            </div>
                        </div>
                        <div className="peacock-card p-5 rounded-2xl flex items-center gap-4">
                            <a href="tel:09989324091" className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00c851, #007e33)' }}>
                                <Phone size={22} className="text-white" />
                            </a>
                            <div>
                                <div className="font-bold mb-1" style={{ color: '#00bbc4' }}>Call Us</div>
                                <a href="tel:09989324091" className="text-sm hover:text-peacock-300">09989324091</a>
                            </div>
                        </div>
                        <div className="peacock-card p-5 rounded-2xl flex items-center gap-4">
                            <a href="https://wa.me/919989324091" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                                <MessageCircle size={22} className="text-white" />
                            </a>
                            <div>
                                <div className="font-bold mb-1" style={{ color: '#00bbc4' }}>WhatsApp</div>
                                <a href="https://wa.me/919989324091" target="_blank" rel="noreferrer" className="text-sm hover:text-green-400">Chat with us on WhatsApp</a>
                            </div>
                        </div>
                        <div className="peacock-card p-5 rounded-2xl flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                <span className="text-xl">⏰</span>
                            </div>
                            <div>
                                <div className="font-bold mb-1" style={{ color: '#00bbc4' }}>Opening Hours</div>
                                <div className="text-sm opacity-80">Monday – Sunday: 6:00 AM – 10:00 PM</div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,187,196,0.3)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15372.2!2d79.7556!3d16.0500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVinukonda!5e0!3m2!1sen!2sin!4v1614000000000!5m2!1sen!2sin"
                                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                title="Hotel Chandamama Map" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="peacock-card p-6 rounded-2xl">
                        <h2 className="text-xl font-bold mb-5" style={{ color: '#00bbc4' }}>Send Us a Message</h2>
                        {submitted ? (
                            <div className="text-center py-10">
                                <CheckCircle size={48} className="mx-auto mb-3" style={{ color: '#00c851' }} />
                                <div className="font-bold text-lg">Message Sent!</div>
                                <div className="text-sm opacity-60 mt-1">We'll get back to you soon.</div>
                                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm" style={{ color: '#00bbc4' }}>Send Another Message</button>
                            </div>
                        ) : (
                            <form onSubmit={handle} className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1.5 opacity-70">Name *</label>
                                    <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1.5 opacity-70">Email</label>
                                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1.5 opacity-70">Phone *</label>
                                    <input type="tel" placeholder="Mobile number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1.5 opacity-70">Message *</label>
                                    <textarea rows={4} placeholder="How can we help you?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                                </div>
                                <button type="submit" className="btn-primary w-full">Send Message 📨</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
            <FloatingButtons />
            <ChatBot />
        </div>
    );
}
