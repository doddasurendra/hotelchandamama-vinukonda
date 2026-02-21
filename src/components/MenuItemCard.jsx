const CATEGORY_EMOJI = {
    morning: '🌅', afternoon: '☀️', evening: '🌆',
    mocktails: '🧃', icecream: '🍦', coffees: '☕',
};

export default function MenuItemCard({ item, language = 'en', onAddToCart, showCart = false }) {
    const name = language === 'te' && item.nameTE ? item.nameTE : item.name;
    const description = language === 'te' && item.descriptionTE ? item.descriptionTE : item.description;

    return (
        <div className={`peacock-card rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${!item.available ? 'opacity-50' : ''}`}>
            {/* Food Image */}
            <div className="relative w-full" style={{ paddingTop: '70%', background: 'rgba(0,30,33,0.8)' }}>
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <span className="text-5xl">{CATEGORY_EMOJI[item.category] || '🍽️'}</span>
                    </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,14,16,0.75) 0%, transparent 55%)' }} />

                {/* Category badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                    style={{ background: 'rgba(0,14,16,0.75)', border: '1px solid rgba(0,187,196,0.4)', color: '#00bbc4' }}>
                    {CATEGORY_EMOJI[item.category] || '🍽️'} {item.category}
                </div>

                {/* Special badge */}
                {item.isSpecial && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.5)', color: '#FFD700' }}>
                        ⭐ Special
                    </div>
                )}

                {/* Unavailable overlay */}
                {!item.available && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: 'rgba(255,68,68,0.8)' }}>
                            Unavailable
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-sm leading-snug mb-0.5">{name}</h3>
                    {description && (
                        <p className="text-xs opacity-60 leading-relaxed line-clamp-2">{description}</p>
                    )}
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-base" style={{ color: '#FFD700' }}>₹{item.price}</span>
                    {showCart && item.available && onAddToCart && (
                        <button
                            onClick={() => onAddToCart(item)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                            + Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
