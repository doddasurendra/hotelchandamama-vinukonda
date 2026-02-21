import { useState, useEffect } from 'react';
import { getAll, update, TABLES } from '../../db/database';

export default function FunctionsManager() {
    const [bookings, setBookings] = useState([]);
    const load = () => setBookings(getAll(TABLES.FUNCTION_BOOKINGS).reverse());
    useEffect(load, []);
    const updateStatus = (id, status) => { update(TABLES.FUNCTION_BOOKINGS, id, { status }); load(); };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Function Bookings</h1>
            {bookings.length === 0 ? (
                <div className="text-center py-16 opacity-50"><div className="text-4xl mb-2">🎉</div><div>No bookings yet</div></div>
            ) : (
                <div className="space-y-3">
                    {bookings.map(b => (
                        <div key={b.id} className="peacock-card rounded-xl p-4">
                            <div className="flex flex-wrap justify-between gap-2 mb-3">
                                <div>
                                    <div className="font-mono font-bold text-sm" style={{ color: '#00bbc4' }}>{b.bookingId}</div>
                                    <div className="font-semibold">{b.name}</div>
                                    <div className="text-sm opacity-70">📞 {b.phone}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">{b.eventType}</div>
                                    <div className="text-sm opacity-70">📅 {b.date}</div>
                                    <div className="text-sm opacity-70">👥 {b.guestCount} guests</div>
                                </div>
                            </div>
                            {b.location && <div className="text-xs opacity-60 mb-2">📍 {b.location}</div>}
                            {b.requirements && <div className="text-xs italic opacity-70 mb-2">"{b.requirements}"</div>}
                            <div className="flex items-center gap-3 flex-wrap">
                                <select value={b.status || 'Pending'} onChange={e => updateStatus(b.id, e.target.value)}
                                    style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }}>
                                    {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <a href={`https://wa.me/91${b.phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer"
                                    className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: '#25D366' }}>
                                    WhatsApp
                                </a>
                                <a href={`tel:${b.phone}`} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                    Call
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
