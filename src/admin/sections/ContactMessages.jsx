import { useState, useEffect } from 'react';
import { getAll, update, TABLES } from '../../db/database';

export default function ContactMessages() {
    const [msgs, setMsgs] = useState([]);
    const load = () => setMsgs(getAll(TABLES.CONTACT_MESSAGES).reverse());
    useEffect(load, []);
    const markRead = (id) => { update(TABLES.CONTACT_MESSAGES, id, { read: true }); load(); };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Contact Messages</h1>
            <div className="space-y-3">
                {msgs.length === 0 ? <div className="text-center py-12 opacity-50"><div className="text-4xl mb-2">📭</div><div>No messages yet</div></div> :
                    msgs.map(m => (
                        <div key={m.id} className={`peacock-card rounded-xl p-4 ${!m.read ? 'border-l-4' : ''}`} style={!m.read ? { borderLeftColor: '#00bbc4' } : {}}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{m.name}</span>
                                        {!m.read && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,187,196,0.2)', color: '#00bbc4' }}>NEW</span>}
                                        <span className="text-xs opacity-50 ml-auto">{new Date(m.createdAt).toLocaleDateString('en-IN')}</span>
                                    </div>
                                    {m.phone && <div className="text-sm opacity-70">📞 {m.phone}</div>}
                                    {m.email && <div className="text-sm opacity-70">✉️ {m.email}</div>}
                                    <p className="mt-2 text-sm">{m.message}</p>
                                </div>
                            </div>
                            {!m.read && <button onClick={() => markRead(m.id)} className="mt-2 text-xs px-3 py-1 rounded-lg font-medium" style={{ background: 'rgba(0,187,196,0.15)', color: '#00bbc4', border: '1px solid rgba(0,187,196,0.3)' }}>Mark as Read</button>}
                            <div className="flex gap-2 mt-2">
                                {m.phone && <a href={`https://wa.me/91${m.phone.replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: '#25D366' }}>WhatsApp</a>}
                                {m.phone && <a href={`tel:${m.phone}`} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>Call</a>}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
