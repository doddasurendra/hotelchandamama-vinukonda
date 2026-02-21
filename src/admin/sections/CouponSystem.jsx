import { useState, useEffect } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { getAll, insert, update, remove, TABLES } from '../../db/database';

export default function CouponSystem() {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState({ code: '', discount: '', type: 'percent', minOrder: '', active: true, expires: '' });

    const load = () => setCoupons(getAll(TABLES.COUPONS));
    useEffect(load, []);

    const add = () => {
        if (!form.code || !form.discount) return;
        insert(TABLES.COUPONS, { ...form, code: form.code.toUpperCase(), discount: Number(form.discount), minOrder: Number(form.minOrder) });
        load(); setForm({ code: '', discount: '', type: 'percent', minOrder: '', active: true, expires: '' });
    };

    const toggle = (id, active) => { update(TABLES.COUPONS, id, { active: !active }); load(); };
    const del = (id) => { if (confirm('Delete coupon?')) { remove(TABLES.COUPONS, id); load(); } };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Coupon & Offer System</h1>
            <div className="peacock-card p-4 rounded-xl mb-5">
                <h2 className="font-bold mb-3 text-sm" style={{ color: '#00bbc4' }}>Create New Coupon</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="Coupon Code (e.g. SAVE10)" />
                    <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} placeholder="Discount amount" />
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                        <option value="percent">Percentage (%)</option>
                        <option value="flat">Flat (₹)</option>
                    </select>
                    <input type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} placeholder="Min order (₹)" />
                    <input type="date" value={form.expires} onChange={e => setForm(f => ({ ...f, expires: e.target.value }))} placeholder="Expires" />
                    <button onClick={add} className="btn-primary flex items-center justify-center gap-1"><Plus size={14} /> Add Coupon</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {coupons.map(c => (
                    <div key={c.id} className={`peacock-card p-4 rounded-xl ${!c.active ? 'opacity-50' : ''}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Tag size={16} style={{ color: '#00bbc4' }} />
                                <span className="font-mono font-black text-lg" style={{ color: '#FFD700' }}>{c.code}</span>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => toggle(c.id, c.active)} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: c.active ? 'rgba(0,200,81,0.2)' : 'rgba(255,68,68,0.2)', color: c.active ? '#00c851' : '#ff4444' }}>
                                    {c.active ? 'Active' : 'Off'}
                                </button>
                                <button onClick={() => del(c.id)} className="text-red-400 ml-1"><Trash2 size={12} /></button>
                            </div>
                        </div>
                        <div className="font-bold text-xl">{c.discount}{c.type === 'percent' ? '%' : '₹'} OFF</div>
                        {c.minOrder > 0 && <div className="text-xs opacity-60">Min order: ₹{c.minOrder}</div>}
                        {c.expires && <div className="text-xs opacity-60">Expires: {c.expires}</div>}
                    </div>
                ))}
                {coupons.length === 0 && <div className="col-span-full text-center py-10 opacity-50"><div className="text-4xl mb-2">🎟️</div><div>No coupons yet</div></div>}
            </div>
        </div>
    );
}
