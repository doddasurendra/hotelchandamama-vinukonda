import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Share2, MapPin, Phone, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import ChatBot from '../components/ChatBot';
import OpenStatus from '../components/OpenStatus';
import QRCodeSection from '../components/QRCodeSection';
import ImageSlider, { FoodImageStrip } from '../components/ImageSlider';
import { StarDisplay, StarInput } from '../components/StarRating';
import { getAll, insert, getSingle, TABLES, trackPageView } from '../db/database';

// Fallback hotel photos (used when no photos uploaded via Gallery Manager)
const HOTEL_PHOTOS = [
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80', title: 'Hotel Chandamama – Vinukonda' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80', title: 'Authentic South Indian Cuisine' },
    { url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1400&q=80', title: 'Fresh & Hygienic Every Day' },
    { url: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=1400&q=80', title: 'Pure Vegetarian Delicacies' },
];
// Auto-sliding hero background slideshow with peacock overlay
function HeroBackground({ images }) {
    const [idx, setIdx] = useState(0);
    const fallbacks = HOTEL_PHOTOS.map(p => p.url);
    const srcs = images && images.filter(Boolean).length > 0 ? images.filter(Boolean) : fallbacks;

    useEffect(() => {
        if (srcs.length <= 1) return;
        const t = setInterval(() => setIdx(i => (i + 1) % srcs.length), 5000);
        return () => clearInterval(t);
    }, [srcs.length]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {srcs.map((src, i) => (
                <div key={i} className="absolute inset-0" style={{ opacity: i === idx ? 1 : 0, transition: 'opacity 1.5s ease' }}>
                    <img src={src} alt="Hotel Chandamama background" className="w-full h-full object-cover" style={{ opacity: 0.38 }} />
                </div>
            ))}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,14,16,0.88) 0%, rgba(0,50,54,0.72) 60%, rgba(0,107,113,0.45) 100%)' }} />
        </div>
    );
}

export default function HomePage() {

    const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
    const [submitted, setSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const content = getSingle(TABLES.SITE_CONTENT) || {};

    useEffect(() => {
        trackPageView('home');
        setReviews(getAll(TABLES.REVIEWS).filter(r => r.approved));
        const dbGallery = getAll(TABLES.GALLERY);
        setGalleryImages(dbGallery.length > 0 ? dbGallery : HOTEL_PHOTOS);
        setMenuItems(getAll(TABLES.MENU).filter(i => i.available));
        document.title = 'Hotel Chandamama - Vinukonda | Best Restaurant & Cafe';
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: 'Hotel Chandamama', url: 'https://www.hotel-chandamama-vinukonda.com' });
        } else {
            navigator.clipboard.writeText('https://www.hotel-chandamama-vinukonda.com');
            alert('Website link copied to clipboard!');
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewForm.name || !reviewForm.comment) return;
        insert(TABLES.REVIEWS, { ...reviewForm, approved: false, date: new Date().toISOString().split('T')[0] });
        setSubmitted(true);
        setReviewForm({ name: '', rating: 5, comment: '' });
    };

    const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : content.rating || '4.3';

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000e10 0%, #001f22 100%)' }}>
            <Header />

            {/* ===== AUTO-SCROLLING HERO BACKGROUND SLIDESHOW ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                {/* Animated hero background - uses uploaded photos or high-quality fallbacks */}
                <HeroBackground images={content.heroUrl ? [content.heroUrl, ...galleryImages.map(g => g.url || g)] : galleryImages.map(g => g.url || g)} />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Main Hero Content */}
                        <div className="lg:col-span-2 animate-fade-up">
                            {/* Open status */}
                            <div className="mb-6">
                                <OpenStatus />
                            </div>

                            {/* Hotel name */}
                            <div className="mb-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: 'rgba(0,187,196,0.15)', border: '1px solid rgba(0,187,196,0.3)', color: '#00bbc4' }}>
                                <Sparkles size={14} /> Pure Vegetarian Restaurant
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                                <span style={{ background: 'linear-gradient(135deg, #00bbc4, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Hotel
                                </span>
                                <br />
                                <span className="text-white">Chandamama</span>
                            </h1>

                            <p className="text-xl mb-3 font-semibold tracking-widest" style={{ color: '#00bbc4' }}>
                                SPOONS • SELF SERVICE • TAKE AWAY
                            </p>

                            <p className="text-base opacity-70 mb-6 max-w-lg leading-relaxed">
                                {content.introText || "Welcome to Hotel Chandamama – Vinukonda's most loved pure vegetarian restaurant. Fresh, hygienic South Indian delicacies prepared with love."}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <StarDisplay rating={parseFloat(avgRating)} size={20} />
                                <span className="font-bold text-2xl" style={{ color: '#FFD700' }}>{avgRating}</span>
                                <span className="opacity-60 text-sm">({content.reviewCount || reviews.length || '124'} reviews)</span>
                            </div>

                            {/* Daily Special */}
                            {content.dailySpecial && (
                                <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)' }}>
                                    <span className="text-2xl">⭐</span>
                                    <div>
                                        <div className="text-xs font-bold mb-1" style={{ color: '#FFD700' }}>TODAY'S SPECIAL</div>
                                        <div className="font-semibold">{content.dailySpecial}</div>
                                    </div>
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                <Link to="/menu" className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                    🍽️ View Menu
                                </Link>
                                <Link to="/order" className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #FF9800, #e64a19)' }}>
                                    🛒 Order Now
                                </Link>
                                <button onClick={handleShare} className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:opacity-90" style={{ background: 'rgba(0,107,113,0.5)', border: '1px solid rgba(0,187,196,0.4)' }}>
                                    <Share2 size={16} /> Share
                                </button>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2 text-sm opacity-70">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#00bbc4' }} />
                                <span>NRT Road, Beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh</span>
                            </div>
                        </div>

                        {/* QR Code - TOP RIGHT */}
                        <div className="flex flex-col gap-4 animate-slide-right">
                            <QRCodeSection />

                            {/* Social Links */}
                            <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)' }}>
                                <div className="text-sm font-semibold mb-3 opacity-70">Follow Us</div>
                                <div className="flex gap-3">
                                    <a href={content.instagram || '#'} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)' }}>
                                        <Instagram size={16} /> Instagram
                                    </a>
                                    <a href={content.facebook || '#'} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white transition-transform hover:scale-105" style={{ background: '#1877F2' }}>
                                        <Facebook size={16} /> Facebook
                                    </a>
                                </div>
                                <a href={content.youtube || '#'} target="_blank" rel="noreferrer" className="mt-2 w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white transition-transform hover:scale-105" style={{ background: '#FF0000' }}>
                                    <Youtube size={16} /> YouTube
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== AUTO-SCROLLING FOOD IMAGE STRIP (HOMEPAGE) ===== */}
            <div className="py-6" style={{ background: 'rgba(0,20,22,0.8)' }}>
                <div className="text-center mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase opacity-50">✨ Our Signature Dishes</span>
                </div>
                <FoodImageStrip items={menuItems.length >= 3 ? menuItems : [
                    { name: 'Masala Dosa', price: 60, category: 'morning', imageUrl: '' },
                    { name: 'Veg Biryani', price: 90, category: 'afternoon', imageUrl: '' },
                    { name: 'Blue Lagoon', price: 80, category: 'mocktails', imageUrl: '' },
                    { name: 'Filter Coffee', price: 25, category: 'coffees', imageUrl: '' },
                    { name: 'Chocolate Ice Cream', price: 55, category: 'icecream', imageUrl: '' },
                    { name: 'Samosa', price: 30, category: 'evening', imageUrl: '' },
                    { name: 'Paneer Dosa', price: 75, category: 'morning', imageUrl: '' },
                    { name: 'Mango Lassi', price: 70, category: 'mocktails', imageUrl: '' },
                    ...menuItems,
                ]} />
            </div>

            {/* Image Slider Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#00bbc4' }}>🏨 Our Hotel</h2>
                    <p className="opacity-60">Experience our beautiful dining space</p>
                </div>
                <ImageSlider images={galleryImages} />
            </section>

            {/* Delivery Info */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                {(() => {
                    const delivery = getSingle(TABLES.DELIVERY_SETTINGS) || {};
                    return (
                        <div className="peacock-card rounded-2xl p-6">
                            <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#00bbc4' }}>🚚 Food Delivery for Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                    <div className="text-3xl mb-2">📍</div>
                                    <div className="font-bold" style={{ color: '#FFD700' }}>{delivery.maxDistance || 5} km</div>
                                    <div className="text-sm opacity-70">Delivery Radius</div>
                                </div>
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                    <div className="text-3xl mb-2">💰</div>
                                    <div className="font-bold" style={{ color: '#FFD700' }}>₹{delivery.fee || 30}</div>
                                    <div className="text-sm opacity-70">Delivery Fee</div>
                                </div>
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                    <div className="text-3xl mb-2">🛒</div>
                                    <div className="font-bold" style={{ color: '#FFD700' }}>₹{delivery.minOrder || 150}</div>
                                    <div className="text-sm opacity-70">Minimum Order</div>
                                </div>
                            </div>
                            <p className="text-center text-sm opacity-60 mt-4">
                                {delivery.note || 'Food delivery available for functions & events only. Contact us for catering bookings.'}
                            </p>
                            <div className="flex justify-center mt-4">
                                <Link to="/functions" className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                    Book a Function
                                </Link>
                            </div>
                        </div>
                    );
                })()}
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#00bbc4' }}>📸 Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {galleryImages.slice(0, 8).map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer" style={{ background: 'rgba(0,50,54,0.5)' }}>
                            <img
                                src={typeof img === 'string' ? img : img.url}
                                alt={typeof img === 'object' ? img.title : `Gallery ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#00bbc4' }}>⭐ Customer Reviews</h2>
                <div className="flex items-center justify-center gap-3 mb-8">
                    <StarDisplay rating={parseFloat(avgRating)} size={24} />
                    <span className="text-4xl font-black" style={{ color: '#FFD700' }}>{avgRating}</span>
                    <span className="opacity-60">out of 5</span>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {reviews.map(r => (
                        <div key={r.id} className="peacock-card p-4 rounded-2xl">
                            <div className="flex items-start justify-between mb-2">
                                <div className="font-semibold">{r.name}</div>
                                <div className="text-xs opacity-50">{r.date}</div>
                            </div>
                            <StarDisplay rating={r.rating} size={14} />
                            <p className="mt-2 text-sm opacity-80 leading-relaxed">{r.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Submit Review Form */}
                <div className="max-w-xl mx-auto peacock-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#00bbc4' }}>Share Your Experience</h3>
                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="text-4xl mb-3">🎉</div>
                            <div className="font-bold text-lg">Thank you for your review!</div>
                            <div className="text-sm opacity-60 mt-1">Your review will be published after approval.</div>
                            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm" style={{ color: '#00bbc4' }}>Write Another Review</button>
                        </div>
                    ) : (
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Your Name *</label>
                                <input type="text" placeholder="Enter your name" value={reviewForm.name} onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Rating *</label>
                                <StarInput value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
                            </div>
                            <div>
                                <label className="block text-sm mb-1.5 opacity-70">Your Review *</label>
                                <textarea rows={3} placeholder="Tell us about your experience..." value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required />
                            </div>
                            <button type="submit" className="btn-primary w-full">Submit Review</button>
                        </form>
                    )}
                </div>
            </section>

            {/* Google Maps */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#00bbc4' }}>📍 Find Us</h2>
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,187,196,0.3)' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15372.2!2d79.7556!3d16.0500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVinukonda!5e0!3m2!1sen!2sin!4v1614000000000!5m2!1sen!2sin"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Hotel Chandamama Location"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
                    <a href="tel:09989324091" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #00c851, #007e33)' }}>
                        <Phone size={16} /> Call: 09989324091
                    </a>
                    <a href="https://maps.google.com/?q=Vinukonda+Hotel+Chandamama" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                        <MapPin size={16} /> Get Directions
                    </a>
                </div>
            </section>

            <Footer />
            <FloatingButtons />
            <ChatBot />
        </div>
    );
}
