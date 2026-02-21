import { useState, useEffect } from 'react';
import { Calendar, Users, Phone, User, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import ChatBot from '../components/ChatBot';
import { insert, TABLES, trackPageView } from '../db/database';

export default function FunctionsPage() {
    const [form, setForm] = useState({ name: '', phone: '', eventType: '', date: '', guestCount: '', location: '', requirements: '' });
    const [submitted, setSubmitted] = useState(false);
    const [bookingId, setBookingId] = useState('');

    useEffect(() => {
        trackPageView('functions');
        document.title = 'Function Bookings – Hotel Chandamama Vinukonda';
    }, []);

    const handle = (e) => {
        e.preventDefault();
        const id = 'FN-' + Date.now().toString(36).toUpperCase();
        setBookingId(id);
        insert(TABLES.FUNCTION_BOOKINGS, { ...form, bookingId: id, status: 'Pending' });
        setSubmitted(true);
    };

    const eventTypes = ['Birthday Party', 'Wedding Reception', 'Corporate Event', 'Anniversary', 'Baby Shower', 'Graduation Party', 'Religious Function', 'Other'];

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000e10 0%, #001f22 100%)' }}>
            <Header />
            <div className="pt-24 pb-12 max-w-3xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-4xl font-black mb-3" style={{ background: 'linear-gradient(135deg, #00bbc4, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Function Food Booking
                    </h1>
                    <p className="opacity-70">We cater food for your special events & functions</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        {['Birthday 🎂', 'Wedding 💍', 'Corporate 💼', 'Religious 🙏', 'Anniversary 💕'].map(t => (
                            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(0,187,196,0.15)', border: '1px solid rgba(0,187,196,0.3)', color: '#00bbc4' }}>{t}</span>
                        ))}
                    </div>
                </div>

                {submitted ? (
                    <div className="peacock-card p-8 rounded-2xl text-center">
                        <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#00c851' }} />
                        <h2 className="text-2xl font-bold mb-2">Booking Received!</h2>
                        <div className="text-3xl font-black mb-3" style={{ color: '#FFD700' }}>{bookingId}</div>
                        <p className="opacity-70 mb-4 text-sm">Thank you {form.name}! We'll contact you at {form.phone} within 24 hours to confirm your booking.</p>
                        <div className="p-4 rounded-xl mb-4 text-left space-y-1.5 text-sm" style={{ background: 'rgba(0,107,113,0.3)' }}>
                            <div><span className="opacity-60">Event:</span> <strong>{form.eventType}</strong></div>
                            <div><span className="opacity-60">Date:</span> <strong>{form.date}</strong></div>
                            <div><span className="opacity-60">Guests:</span> <strong>{form.guestCount}</strong></div>
                        </div>
                        <a href="https://wa.me/919989324091" target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: '#25D366' }}>
                            💬 Continue on WhatsApp
                        </a>
                        <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', eventType: '', date: '', guestCount: '', location: '', requirements: '' }); }}
                            className="block w-full mt-3 text-sm" style={{ color: '#00bbc4' }}>Submit Another Booking</button>
                    </div>
                ) : (
                    <form onSubmit={handle} className="peacock-card p-6 rounded-2xl space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Your Name *</label>
                                <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Phone Number *</label>
                                <input type="tel" placeholder="Mobile number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-1.5 opacity-70">Event Type *</label>
                            <select value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} required>
                                <option value="">Select event type</option>
                                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Event Date *</label>
                                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required min={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Number of Guests *</label>
                                <input type="number" placeholder="e.g. 50" value={form.guestCount} onChange={e => setForm(f => ({ ...f, guestCount: e.target.value }))} required min="1" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm mb-1.5 opacity-70">Event Location</label>
                            <input type="text" placeholder="Venue/address of event" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                        </div>
                        <div>
                            <label className="block text-sm mb-1.5 opacity-70">Special Requirements</label>
                            <textarea rows={3} placeholder="Specific menu items, dietary needs, serving time, etc." value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
                        </div>
                        <button type="submit" className="btn-primary w-full text-base py-3">🎉 Submit Booking Request</button>
                        <p className="text-xs text-center opacity-50">Or WhatsApp us directly at 09989324091 for instant response</p>
                    </form>
                )}
            </div>
            <Footer />
            <FloatingButtons />
            <ChatBot />
        </div>
    );
}
