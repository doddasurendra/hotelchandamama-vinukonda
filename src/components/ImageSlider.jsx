import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Auto-scrolling horizontal food image strip
export function FoodImageStrip({ items }) {
    const trackRef = useRef(null);

    // Duplicate items for seamless loop
    const duplicated = [...items, ...items, ...items];

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let pos = 0;
        const speed = 0.6;
        let raf;
        const animate = () => {
            pos += speed;
            if (pos >= track.scrollWidth / 3) pos = 0;
            track.style.transform = `translateX(-${pos}px)`;
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        // Pause on hover
        const pause = () => cancelAnimationFrame(raf);
        const resume = () => { raf = requestAnimationFrame(animate); };
        track.parentElement.addEventListener('mouseenter', pause);
        track.parentElement.addEventListener('mouseleave', resume);

        return () => {
            cancelAnimationFrame(raf);
            track.parentElement?.removeEventListener('mouseenter', pause);
            track.parentElement?.removeEventListener('mouseleave', resume);
        };
    }, [items.length]);

    if (!items || items.length === 0) return null;

    return (
        <div className="relative overflow-hidden" style={{ height: '140px' }}>
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #001f22, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #001f22, transparent)' }} />

            <div ref={trackRef} className="flex gap-3 items-center" style={{ width: 'max-content', willChange: 'transform' }}>
                {duplicated.map((item, i) => (
                    <div key={i} className="flex-shrink-0 relative group cursor-pointer" style={{ width: '160px', height: '120px' }}>
                        <div className="w-full h-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,187,196,0.2)' }}>
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'rgba(0,50,54,0.7)' }}>
                                    <div className="text-3xl mb-1">
                                        {item.category === 'morning' ? '🌅' : item.category === 'afternoon' ? '☀️' : item.category === 'evening' ? '🌆' : item.category === 'mocktails' ? '🧃' : item.category === 'icecream' ? '🍦' : '☕'}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Hover label */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                            <div className="text-white text-xs font-semibold truncate">{item.name}</div>
                            <div className="text-xs font-bold" style={{ color: '#FFD700' }}>₹{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Standard image slider (already built, kept here for reuse)
export default function ImageSlider({ images = [] }) {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const defaultImages = [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
        'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200',
    ];

    const slides = images.length > 0 ? images : defaultImages;

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCurrent(c => (c + 1) % slides.length);
        }, 4000);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [slides.length]);

    const go = (dir) => {
        clearInterval(timerRef.current);
        setCurrent(c => (c + dir + slides.length) % slides.length);
        startTimer();
    };

    return (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden group">
            {slides.map((src, i) => (
                <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
                    <img src={typeof src === 'string' ? src : src.url}
                        alt={typeof src === 'object' ? src.title : `Hotel Chandamama ${i + 1}`}
                        className="w-full h-full object-cover" />
                    {typeof src === 'object' && src.title && (
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                            <div className="text-white font-medium text-sm">{src.title}</div>
                        </div>
                    )}
                </div>
            ))}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,14,16,0.8) 100%)' }} />
            {slides.length > 1 && (
                <>
                    <button onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {slides.map((_, i) => (
                            <button key={i} onClick={() => { clearInterval(timerRef.current); setCurrent(i); startTimer(); }}
                                className="rounded-full transition-all"
                                style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? '#00bbc4' : 'rgba(255,255,255,0.5)' }} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
