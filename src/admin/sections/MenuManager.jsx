import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, ToggleLeft, ToggleRight } from 'lucide-react';
import { getAll, insert, update, remove, TABLES } from '../../db/database';

const CATEGORIES = ['morning', 'afternoon', 'evening', 'mocktails', 'icecream', 'coffees'];
const CATEGORY_EMOJI = { morning: '🌅', afternoon: '☀️', evening: '🌆', mocktails: '🧃', icecream: '🍦', coffees: '☕' };
const EMPTY = { name: '', nameTE: '', price: '', category: 'morning', description: '', descriptionTE: '', available: true, imageUrl: '', isSpecial: false };

export default function MenuManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const imgRef = useRef();

    const load = () => setItems(getAll(TABLES.MENU));
    useEffect(load, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, imageUrl: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const save = () => {
        if (!form.name || !form.price) return alert('Name and price are required!');
        if (editing) { update(TABLES.MENU, editing, form); }
        else { insert(TABLES.MENU, form); }
        load(); setForm(EMPTY); setEditing(null); setShowForm(false);
    };

    const edit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
    const del = (id) => { if (confirm('Delete this menu item?')) { remove(TABLES.MENU, id); load(); } };
    const toggleAvail = (item) => { update(TABLES.MENU, item.id, { available: !item.available }); load(); };

    const filtered = items.filter(i => {
        if (filter !== 'all' && i.category !== filter) return false;
        if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Menu Manager</h1>
                    <p className="text-sm opacity-60">{items.length} items total</p>
                </div>
                <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(true); }}
                    className="btn-primary flex items-center gap-2">
                    <Plus size={16} /> Add Item
                </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="peacock-card p-5 rounded-2xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-bold" style={{ color: '#00bbc4' }}>{editing ? 'Edit Item' : 'Add New Item'}</h2>
                        <button onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }}><X size={18} /></button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs mb-1 opacity-70">Name (English) *</label>
                            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Masala Dosa" />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 opacity-70">Name (Telugu)</label>
                            <input value={form.nameTE} onChange={e => setForm(f => ({ ...f, nameTE: e.target.value }))} placeholder="e.g. మసాలా దోశ" />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 opacity-70">Price (₹) *</label>
                            <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 opacity-70">Category *</label>
                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs mb-1 opacity-70">Description (English)</label>
                            <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs mb-1 opacity-70">Description (Telugu)</label>
                            <input value={form.descriptionTE} onChange={e => setForm(f => ({ ...f, descriptionTE: e.target.value }))} placeholder="తెలుగు వివరణ" />
                        </div>

                        {/* Image Upload */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs mb-2 opacity-70">Food Image</label>
                            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(0,69,73,0.3)', border: '1px solid rgba(0,187,196,0.2)' }}>
                                {/* Preview */}
                                <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center"
                                    style={{ background: 'rgba(0,30,33,0.8)', border: '2px solid rgba(0,187,196,0.4)' }}>
                                    {form.imageUrl
                                        ? <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                                        : <span className="text-4xl">{CATEGORY_EMOJI[form.category] || '🍽️'}</span>
                                    }
                                </div>
                                {/* Upload Button */}
                                <div>
                                    <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-sm font-semibold text-white w-fit mb-2"
                                        style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                        <Upload size={16} /> Upload Photo
                                        <input type="file" accept="image/*" ref={imgRef} onChange={handleImage} className="hidden" />
                                    </label>
                                    {form.imageUrl ? (
                                        <button onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                                            <X size={12} /> Remove photo
                                        </button>
                                    ) : (
                                        <p className="text-xs opacity-50">Upload a photo of the food item (jpg, png, etc.)</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-xs opacity-70">Available</span>
                                <button type="button" onClick={() => setForm(f => ({ ...f, available: !f.available }))} style={{ color: form.available ? '#00bbc4' : '#4a5568' }}>
                                    {form.available ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                </button>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <span className="text-xs opacity-70">Mark as Special</span>
                                <button type="button" onClick={() => setForm(f => ({ ...f, isSpecial: !f.isSpecial }))} style={{ color: form.isSpecial ? '#FFD700' : '#4a5568' }}>
                                    {form.isSpecial ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                </button>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={14} /> {editing ? 'Update' : 'Save'} Item</button>
                        <button onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY); }} className="btn-danger">Cancel</button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..." style={{ width: '200px' }} />
                <div className="flex gap-2 overflow-x-auto">
                    {['all', ...CATEGORIES].map(c => (
                        <button key={c} onClick={() => setFilter(c)}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium capitalize"
                            style={filter === c ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' } : { background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)', color: '#b3ecef' }}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Items Table */}
            <div className="peacock-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Available</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.imageUrl
                                            ? <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                                            : <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: 'rgba(0,107,113,0.4)' }}>{CATEGORY_EMOJI[item.category] || '🍽️'}</div>
                                        }
                                    </td>
                                    <td>
                                        <div className="font-medium text-sm">{item.name}</div>
                                        {item.nameTE && <div className="text-xs opacity-50">{item.nameTE}</div>}
                                        {item.isSpecial && <span className="text-xs" style={{ color: '#FFD700' }}>⭐ Special</span>}
                                    </td>
                                    <td><span className="px-2 py-0.5 rounded-full text-xs capitalize font-medium" style={{ background: 'rgba(0,187,196,0.15)', color: '#00bbc4' }}>{item.category}</span></td>
                                    <td><span className="font-bold" style={{ color: '#FFD700' }}>₹{item.price}</span></td>
                                    <td>
                                        <button onClick={() => toggleAvail(item)} style={{ color: item.available ? '#00c851' : '#ff4444' }}>
                                            {item.available ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button onClick={() => edit(item)} className="p-1.5 rounded-lg" style={{ color: '#00bbc4' }}><Edit2 size={14} /></button>
                                            <button onClick={() => del(item.id)} className="p-1.5 rounded-lg text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan="6" className="text-center py-8 opacity-50">No items found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
