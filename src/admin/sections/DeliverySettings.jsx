import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getSingle, setOne, TABLES } from '../../db/database';

export default function DeliverySettings() {
    const [form, setForm] = useState({ enabled: true, maxDistance: 5, fee: 30, minOrder: 150, freeDeliveryAbove: 500, note: '' });
    const [saved, setSaved] = useState(false);
    useEffect(() => { const d = getSingle(TABLES.DELIVERY_SETTINGS); if (d) setForm(d); }, []);
    const save = () => { setOne(TABLES.DELIVERY_SETTINGS, { ...form, maxDistance: Number(form.maxDistance), fee: Number(form.fee), minOrder: Number(form.minOrder), freeDeliveryAbove: Number(form.freeDeliveryAbove) }); setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Delivery Settings</h1>
                <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={14} /> {saved ? '✅ Saved!' : 'Save'}</button>
            </div>
            <div className="peacock-card p-5 rounded-2xl max-w-lg space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(0,107,113,0.3)' }}>
                    <span className="font-medium">Delivery Enabled</span>
                    <input type="checkbox" checked={!!form.enabled} onChange={e => setForm(f => ({ ...f, enabled: e.target.checked }))} style={{ width: 'auto', padding: '0', border: 'none', cursor: 'pointer' }} />
                </div>
                {[
                    { key: 'maxDistance', label: 'Max Delivery Distance (km)' },
                    { key: 'fee', label: 'Delivery Fee (₹)' },
                    { key: 'minOrder', label: 'Minimum Order Amount (₹)' },
                    { key: 'freeDeliveryAbove', label: 'Free Delivery Above (₹)' },
                ].map(({ key, label }) => (
                    <div key={key}>
                        <label className="block text-sm mb-1 opacity-70">{label}</label>
                        <input type="number" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                ))}
                <div>
                    <label className="block text-sm mb-1 opacity-70">Delivery Note (shown on homepage)</label>
                    <textarea rows={2} value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Food delivery for events/functions only..." />
                </div>
            </div>
        </div>
    );
}
