import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import MenuItemCard from '../components/MenuItemCard';
import { getAll, insert, TABLES, trackPageView } from '../db/database';

const CATEGORIES = ['morning', 'afternoon', 'evening', 'mocktails', 'icecream', 'coffees'];

function genOrderId() {
    const d = new Date();
    const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `ORD-${date}-${rand}`;
}

export default function OrderPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});
    const [form, setForm] = useState({ name: '', phone: '', instructions: '' });
    const [step, setStep] = useState('menu'); // menu | cart | confirm
    const [orderId, setOrderId] = useState('');
    const [activeCategory, setActiveCategory] = useState('morning');

    useEffect(() => {
        trackPageView('order');
        setMenuItems(getAll(TABLES.MENU).filter(i => i.available));
        document.title = 'Order – Hotel Chandamama Vinukonda';
    }, []);

    const addToCart = (item) => setCart(c => ({ ...c, [item.id]: { ...item, qty: (c[item.id]?.qty || 0) + 1 } }));
    const removeFromCart = (id) => setCart(c => { const n = { ...c }; if (n[id].qty <= 1) delete n[id]; else n[id] = { ...n[id], qty: n[id].qty - 1 }; return n; });
    const deleteFromCart = (id) => setCart(c => { const n = { ...c }; delete n[id]; return n; });

    const cartItems = Object.values(cart);
    const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

    const handleOrder = (e) => {
        e.preventDefault();
        if (!form.name || !form.phone) return;
        const id = genOrderId();
        setOrderId(id);
        insert(TABLES.ORDERS, {
            orderId: id,
            customerName: form.name,
            phone: form.phone,
            instructions: form.instructions,
            items: cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
            total: cartTotal,
            status: 'Received',
            type: 'dine-in',
        });
        setStep('confirm');
    };

    if (step === 'confirm') {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, #000e10, #001f22)' }}>
                <div className="max-w-md w-full text-center peacock-card p-8 rounded-2xl">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#00bbc4' }}>Order Confirmed!</h2>
                    <div className="text-4xl font-black mb-2" style={{ color: '#FFD700' }}>{orderId}</div>
                    <p className="opacity-70 mb-4 text-sm">Your order has been received! We'll prepare your food shortly.</p>
                    <div className="p-4 rounded-xl mb-4 text-left space-y-1" style={{ background: 'rgba(0,107,113,0.3)' }}>
                        <div className="text-sm"><span className="opacity-60">Name:</span> <strong>{form.name}</strong></div>
                        <div className="text-sm"><span className="opacity-60">Phone:</span> <strong>{form.phone}</strong></div>
                        <div className="text-sm"><span className="opacity-60">Items:</span> <strong>{cartCount} items</strong></div>
                        <div className="text-sm"><span className="opacity-60">Total:</span> <strong style={{ color: '#FFD700' }}>₹{cartTotal}</strong></div>
                        <div className="text-sm"><span className="opacity-60">Status:</span> <strong className="text-green-400">✅ Received</strong></div>
                    </div>
                    <p className="text-xs opacity-50 mb-4">For updates call: 09989324091</p>
                    <button onClick={() => { setStep('menu'); setCart({}); setForm({ name: '', phone: '', instructions: '' }); }}
                        className="btn-primary w-full">Place Another Order</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000e10 0%, #001f22 100%)' }}>
            <Header />

            <div className="pt-20 pb-12 max-w-7xl mx-auto px-4">
                <div className="text-center py-8">
                    <h1 className="text-4xl font-black mb-2" style={{ background: 'linear-gradient(135deg, #00bbc4, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        🛒 Place Your Order
                    </h1>
                    <p className="opacity-60">Select items and we'll get them ready for you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Menu Selection */}
                    <div className="lg:col-span-2">
                        {/* Category tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
                                    style={activeCategory === cat
                                        ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' }
                                        : { background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)', color: '#b3ecef' }}>
                                    {cat === 'morning' ? '🌅' : cat === 'afternoon' ? '☀️' : cat === 'evening' ? '🌆' : cat === 'mocktails' ? '🧃' : cat === 'icecream' ? '🍦' : '☕'} {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {menuItems.filter(i => i.category === activeCategory).map(item => (
                                <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} showCart={true} />
                            ))}
                            {menuItems.filter(i => i.category === activeCategory).length === 0 && (
                                <div className="col-span-full text-center py-10 opacity-50">No items available in this category</div>
                            )}
                        </div>
                    </div>

                    {/* Cart & Order Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 peacock-card rounded-2xl overflow-hidden">
                            {/* Cart header */}
                            <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(0,107,113,0.4)', borderBottom: '1px solid rgba(0,187,196,0.2)' }}>
                                <div className="flex items-center gap-2 font-bold">
                                    <ShoppingCart size={18} style={{ color: '#00bbc4' }} />
                                    Your Order ({cartCount} items)
                                </div>
                                {cartCount > 0 && (
                                    <div className="font-bold" style={{ color: '#FFD700' }}>₹{cartTotal}</div>
                                )}
                            </div>

                            {/* Cart items */}
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8 text-sm opacity-50 px-4">
                                    <div className="text-4xl mb-2">🛒</div>
                                    Your cart is empty. Add items from the menu.
                                </div>
                            ) : (
                                <div className="max-h-52 overflow-y-auto p-3 space-y-2">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(0,107,113,0.3)' }}>
                                            <div className="flex-1 text-xs font-medium leading-snug">{item.name}</div>
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,187,196,0.3)' }}>
                                                    <Minus size={10} />
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                                                <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,187,196,0.3)' }}>
                                                    <Plus size={10} />
                                                </button>
                                            </div>
                                            <div className="text-xs font-bold" style={{ color: '#FFD700' }}>₹{item.price * item.qty}</div>
                                            <button onClick={() => deleteFromCart(item.id)} className="text-red-400"><Trash2 size={12} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Order form */}
                            {cartItems.length > 0 && (
                                <form onSubmit={handleOrder} className="p-4 space-y-3" style={{ borderTop: '1px solid rgba(0,187,196,0.2)' }}>
                                    <input type="text" placeholder="Your Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                                    <input type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
                                    <textarea rows={2} placeholder="Special instructions (optional)" value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} />
                                    <div className="flex justify-between text-sm font-bold py-2" style={{ borderTop: '1px solid rgba(0,187,196,0.2)' }}>
                                        <span>Total</span>
                                        <span style={{ color: '#FFD700' }}>₹{cartTotal}</span>
                                    </div>
                                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                        <CheckCircle size={16} /> Confirm Order
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <FloatingButtons />
        </div>
    );
}
