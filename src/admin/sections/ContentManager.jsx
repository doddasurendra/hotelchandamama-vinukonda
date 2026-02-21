import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getSingle, setOne, TABLES } from '../../db/database';

export default function ContentManager() {
    const [form, setForm] = useState({});
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setForm(getSingle(TABLES.SITE_CONTENT) || {});
    }, []);

    const handleSave = () => {
        setOne(TABLES.SITE_CONTENT, form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const f = (key, placeholder, type = 'text', rows = 0) => (
        <div>
            <label className="block text-xs mb-1 opacity-70 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
            {rows > 0
                ? <textarea rows={rows} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} />
                : <input type={type} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} />
            }
        </div>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Website Content</h1>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                    <Save size={14} /> {saved ? '✅ Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {f('hotelName', 'Hotel Chandamama')}
                {f('tagline', 'SPOONS • SELF SERVICE • TAKE AWAY')}
                {f('phone', '09989324091')}
                {f('whatsapp', '09989324091')}
                {f('email', 'hotel@example.com', 'email')}
                {f('address', 'NRT Road, Vinukonda...')}
                {f('openTime', '06:00', 'time')}
                {f('closeTime', '22:00', 'time')}
                {f('rating', '4.3')}
                {f('reviewCount', '124')}
                {f('dailySpecial', 'Today\'s special dish...')}
                {f('instagram', 'https://instagram.com/...')}
                {f('facebook', 'https://facebook.com/...')}
                {f('youtube', 'https://youtube.com/...')}
                <div className="md:col-span-2">{f('introText', 'Welcome to Hotel Chandamama...', 'text', 3)}</div>
                <div className="md:col-span-2">{f('mapEmbed', 'Google Maps iframe src URL...')}</div>
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                        <label className="block text-xs mb-1 opacity-70">Holiday Mode Active</label>
                        <input type="checkbox" checked={!!form.holidayActive} onChange={e => setForm(p => ({ ...p, holidayActive: e.target.checked }))} style={{ width: 'auto', padding: '0', border: 'none' }} />
                    </div>
                </div>
                <div className="md:col-span-2">{f('holidayNotice', 'Holiday notice message...', 'text', 2)}</div>
            </div>
        </div>
    );
}
