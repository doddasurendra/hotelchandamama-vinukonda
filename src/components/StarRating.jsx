import { Star } from 'lucide-react';

export function StarDisplay({ rating, max = 5, size = 16 }) {
    const filled = Math.round(rating);
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }, (_, i) => (
                <Star key={i} size={size} fill={i < filled ? '#FFD700' : 'none'} color={i < filled ? '#FFD700' : '#4a5568'} />
            ))}
        </div>
    );
}

export function StarInput({ value, onChange, size = 28 }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => onChange(s)} className="transition-transform hover:scale-110">
                    <Star size={size} fill={s <= value ? '#FFD700' : 'none'} color={s <= value ? '#FFD700' : '#4a5568'} />
                </button>
            ))}
        </div>
    );
}
