import { useState, useEffect } from 'react';
import { Search, Filter, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import ChatBot from '../components/ChatBot';
import MenuItemCard from '../components/MenuItemCard';
import { FoodImageStrip } from '../components/ImageSlider';
import { getAll, TABLES, trackPageView } from '../db/database';

const CATEGORIES = [
    { key: 'all', label: 'All', labelTE: 'అన్నీ', emoji: '🍽️' },
    { key: 'morning', label: 'Morning', labelTE: 'ఉదయం', emoji: '🌅' },
    { key: 'afternoon', label: 'Afternoon', labelTE: 'మధ్యాహ్నం', emoji: '☀️' },
    { key: 'evening', label: 'Evening', labelTE: 'సాయంత్రం', emoji: '🌆' },
    { key: 'mocktails', label: 'Mocktails', labelTE: 'మాక్టెయిల్స్', emoji: '🧃' },
    { key: 'icecream', label: 'Ice Cream', labelTE: 'ఐస్ క్రీం', emoji: '🍦' },
    { key: 'coffees', label: 'Coffees', labelTE: 'కాఫీలు', emoji: '☕' },
];

export default function MenuPage() {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [maxPrice, setMaxPrice] = useState(500);
    const [lang, setLang] = useState('en');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        trackPageView('menu');
        setItems(getAll(TABLES.MENU));
        document.title = 'Menu – Hotel Chandamama Vinukonda';
    }, []);

    const filtered = items.filter(item => {
        if (category !== 'all' && item.category !== category) return false;
        if (item.price > maxPrice) return false;
        const q = search.toLowerCase();
        if (q) {
            const nameMatch = (item.name || '').toLowerCase().includes(q) || (item.nameTE || '').includes(q);
            const descMatch = (item.description || '').toLowerCase().includes(q);
            if (!nameMatch && !descMatch) return false;
        }
        return true;
    });

    // Items for the auto-scrolling strip — use all available items
    const stripItems = items.filter(i => i.available);

    const t = (en, te) => lang === 'te' ? te : en;

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000e10 0%, #001f22 100%)' }}>
            <Header />

            <div className="pt-20 pb-12">
                {/* Page Header */}
                <div className="text-center py-8 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                        style={{ background: 'rgba(0,187,196,0.15)', border: '1px solid rgba(0,187,196,0.3)', color: '#00bbc4' }}>
                        🍽️ Pure Vegetarian Menu
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-3"
                        style={{ background: 'linear-gradient(135deg, #00bbc4, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {t('Our Menu', 'మా మెనూ')}
                    </h1>
                    <p className="opacity-60">
                        {t('Fresh & delicious every day | Open 6 AM – 10 PM', 'రోజూ తాజా & రుచికరమైన | ఉదయం 6 – రాత్రి 10')}
                    </p>
                </div>

                {/* ===================== AUTO-SCROLLING FOOD IMAGE STRIP ===================== */}
                <div className="mb-8 px-0">
                    <div className="text-center mb-3 px-4">
                        <span className="text-xs font-semibold tracking-widest uppercase opacity-50">
                            ✨ {t('Scroll to explore our dishes', 'మా వంటకాలు చూడండి')}
                        </span>
                    </div>
                    <FoodImageStrip items={stripItems.length >= 3 ? stripItems : [
                        { name: 'Masala Dosa', price: 60, category: 'morning', imageUrl: '' },
                        { name: 'Veg Biryani', price: 90, category: 'afternoon', imageUrl: '' },
                        { name: 'Blue Lagoon', price: 80, category: 'mocktails', imageUrl: '' },
                        { name: 'Filter Coffee', price: 25, category: 'coffees', imageUrl: '' },
                        { name: 'Ice Cream', price: 55, category: 'icecream', imageUrl: '' },
                        { name: 'Samosa', price: 30, category: 'evening', imageUrl: '' },
                        { name: 'Paneer Dosa', price: 75, category: 'morning', imageUrl: '' },
                        { name: 'Mango Lassi', price: 70, category: 'mocktails', imageUrl: '' },
                        ...stripItems
                    ]} />
                </div>
                {/* ======================================================================== */}

                <div className="max-w-7xl mx-auto px-4">
                    {/* Search & Controls */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex-1 min-w-64 relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: '#00bbc4' }} />
                            <input
                                type="text"
                                placeholder={t('Search menu items...', 'మెనూ వస్తువులు వెతకండి...')}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ paddingLeft: '36px' }}
                            />
                        </div>

                        {/* Language toggle */}
                        <button
                            onClick={() => setLang(l => l === 'en' ? 'te' : 'en')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                            style={lang === 'te'
                                ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' }
                                : { background: 'rgba(0,69,73,0.5)', border: '1px solid rgba(0,187,196,0.3)', color: '#f0fdfe' }}>
                            <Globe size={16} />
                            {lang === 'en' ? 'తెలుగు' : 'English'}
                        </button>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm"
                            style={{ background: 'rgba(0,69,73,0.5)', border: '1px solid rgba(0,187,196,0.3)', color: '#f0fdfe' }}>
                            <Filter size={16} /> {t('Filter', 'ఫిల్టర్')}
                        </button>
                    </div>

                    {/* Price filter */}
                    {showFilters && (
                        <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)' }}>
                            <label className="block text-sm mb-2 opacity-70">
                                {t('Max Price', 'గరిష్ట ధర')}: <span className="font-bold" style={{ color: '#FFD700' }}>₹{maxPrice}</span>
                            </label>
                            <input
                                type="range" min={0} max={500} step={10} value={maxPrice}
                                onChange={e => setMaxPrice(Number(e.target.value))}
                                className="w-full"
                                style={{ background: 'transparent', border: 'none', padding: '0', cursor: 'pointer' }}
                            />
                            <div className="flex justify-between text-xs opacity-50 mt-1">
                                <span>₹0</span><span>₹500</span>
                            </div>
                        </div>
                    )}

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => setCategory(cat.key)}
                                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style={category === cat.key
                                    ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white', boxShadow: '0 4px 12px rgba(0,187,196,0.4)' }
                                    : { background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)', color: '#b3ecef' }}>
                                {cat.emoji} {lang === 'te' ? cat.labelTE : cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <div className="text-sm opacity-50 mb-4">
                        {filtered.length} {t('items found', 'వస్తువులు దొరికాయి')}
                    </div>

                    {/* Menu sections by category */}
                    {category === 'all' ? (
                        CATEGORIES.slice(1).map(cat => {
                            const catItems = filtered.filter(i => i.category === cat.key);
                            if (catItems.length === 0) return null;
                            return (
                                <div key={cat.key} className="mb-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-3xl">{cat.emoji}</span>
                                        <h2 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>
                                            {lang === 'te' ? cat.labelTE : cat.label}
                                        </h2>
                                        <div className="flex-1 h-px opacity-20" style={{ background: '#00bbc4' }} />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                        {catItems.map(item => (
                                            <MenuItemCard key={item.id} item={item} language={lang} showCart={false} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filtered.length === 0 ? (
                                <div className="col-span-full text-center py-16 opacity-50">
                                    <div className="text-5xl mb-3">🔍</div>
                                    <div>{t('No items found', 'ఏ వస్తువులూ దొరకలేదు')}</div>
                                </div>
                            ) : filtered.map(item => (
                                <MenuItemCard key={item.id} item={item} language={lang} showCart={false} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            <FloatingButtons />
            <ChatBot />
        </div>
    );
}
