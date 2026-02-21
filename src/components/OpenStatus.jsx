import { getSingle, TABLES } from '../db/database';
import { Clock } from 'lucide-react';

export default function OpenStatus() {
    const content = getSingle(TABLES.SITE_CONTENT) || {};
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const parseTime = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + (m || 0);
    };

    const openMin = parseTime(content.openTime || '06:00');
    const closeMin = parseTime(content.closeTime || '22:00');
    const isHoliday = content.holidayActive;
    const isOpen = !isHoliday && currentMinutes >= openMin && currentMinutes < closeMin;

    const formatTime12 = (t) => {
        if (!t) return '';
        const [h, m] = t.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)' }}>
            <div className="flex items-center gap-2">
                <Clock size={18} style={{ color: '#00bbc4' }} />
                <span className="text-sm font-medium opacity-80">
                    {formatTime12(content.openTime || '06:00')} – {formatTime12(content.closeTime || '22:00')}
                </span>
            </div>

            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white ${isOpen ? 'badge-open' : 'badge-closed'}`}>
                <div className="w-2 h-2 rounded-full bg-white opacity-90 animate-pulse"></div>
                {isHoliday ? '🎌 Holiday' : isOpen ? '✅ Open Now' : '❌ Closed'}
            </div>

            {isHoliday && content.holidayNotice && (
                <div className="text-xs opacity-70 italic">{content.holidayNotice}</div>
            )}
        </div>
    );
}
