import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getSingle, setOne, TABLES } from '../../db/database';

export default function NotificationSettings() {
    const [config, setConfig] = useState({ whatsapp: false, email: false, sms: false, soundAlert: false, newOrderAlert: true, newReviewAlert: false, newBookingAlert: true });
    const [saved, setSaved] = useState(false);
    useEffect(() => { const s = getSingle(TABLES.NOTIFICATIONS); if (s) setConfig(s); }, []);
    const save = () => { setOne(TABLES.NOTIFICATIONS, config); setSaved(true); setTimeout(() => setSaved(false), 2000); };
    const Toggle = ({ label, icon, field, note }) => (
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.3)' }}>
            <div><div className="font-medium text-sm">{icon} {label}</div>{note && <div className="text-xs opacity-50 mt-0.5">{note}</div>}</div>
            <input type="checkbox" checked={!!config[field]} onChange={e => setConfig(c => ({ ...c, [field]: e.target.checked }))} style={{ width: 'auto', padding: '0', border: 'none', cursor: 'pointer' }} />
        </div>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Notification Settings</h1>
                <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={14} /> {saved ? '✅ Saved!' : 'Save'}</button>
            </div>
            <div className="space-y-3 max-w-lg">
                <Toggle label="WhatsApp Alerts" icon="💬" field="whatsapp" note="Send order alerts to admin WhatsApp" />
                <Toggle label="Email Notifications" icon="✉️" field="email" note="Email summaries (requires setup)" />
                <Toggle label="SMS Alerts" icon="📱" field="sms" note="SMS on new orders (requires setup)" />
                <Toggle label="Sound Alert" icon="🔔" field="soundAlert" note="Beep on new order in admin panel" />
                <div className="h-px opacity-20 my-2" style={{ background: '#00bbc4' }} />
                <Toggle label="New Order Alert" icon="📦" field="newOrderAlert" />
                <Toggle label="New Review Alert" icon="⭐" field="newReviewAlert" />
                <Toggle label="New Booking Alert" icon="📅" field="newBookingAlert" />
                <div className="p-3 rounded-xl text-xs opacity-50" style={{ background: 'rgba(0,50,54,0.4)' }}>
                    📝 Full WhatsApp/SMS/Email integrations require external API keys (Twilio, SMTP etc.). These toggles save your preferences for when those are configured.
                </div>
            </div>
        </div>
    );
}
