import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, AlertTriangle } from 'lucide-react';
import { getAll, insert, update, remove, TABLES } from '../../db/database';

export default function InventoryControl() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', unit: 'kg', quantity: '', minLevel: '', category: 'Vegetables' });
    const [editing, setEditing] = useState(null);

    const load = () => setItems(getAll(TABLES.INVENTORY));
    useEffect(load, []);

    const save = () => {
        if (!form.name || !form.quantity) return;
        if (editing) { update(TABLES.INVENTORY, editing, { ...form, quantity: Number(form.quantity), minLevel: Number(form.minLevel) }); }
        else { insert(TABLES.INVENTORY, { ...form, quantity: Number(form.quantity), minLevel: Number(form.minLevel) }); }
        load(); setForm({ name: '', unit: 'kg', quantity: '', minLevel: '', category: 'Vegetables' }); setEditing(null);
    };

    const del = (id) => { if (confirm('Delete item?')) { remove(TABLES.INVENTORY, id); load(); } };
    const edit = (item) => { setForm({ ...item }); setEditing(item.id); };
    const lowStock = items.filter(i => Number(i.quantity) <= Number(i.minLevel));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Inventory Control</h1>

            {lowStock.length > 0 && (
                <div className="mb-4 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)' }}>
                    <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
                    <div><span className="font-bold text-red-400">Low Stock Alert!</span> {lowStock.map(i => i.name).join(', ')} are running low.</div>
                </div>
            )}

            <div className="peacock-card p-4 rounded-xl mb-5">
                <h2 className="font-bold mb-3 text-sm" style={{ color: '#00bbc4' }}>{editing ? 'Edit Item' : 'Add New Item'}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Item name *" />
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                        {['Grains', 'Pulses', 'Vegetables', 'Dairy', 'Oils', 'Spices', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
                        {['kg', 'g', 'L', 'ml', 'pcs', 'dozen'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} placeholder="Qty *" />
                    <input type="number" value={form.minLevel} onChange={e => setForm(f => ({ ...f, minLevel: e.target.value }))} placeholder="Min level" />
                    <button onClick={save} className="btn-primary flex items-center justify-center gap-1"><Save size={14} /> {editing ? 'Update' : 'Add'}</button>
                </div>
            </div>

            <div className="peacock-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead><tr><th>Item</th><th>Category</th><th>Quantity</th><th>Min Level</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td className="font-medium">{item.name}</td>
                                    <td><span className="text-xs opacity-70">{item.category}</span></td>
                                    <td><span className="font-bold">{item.quantity} {item.unit}</span></td>
                                    <td><span className="opacity-60">{item.minLevel || 0} {item.unit}</span></td>
                                    <td>
                                        {Number(item.quantity) <= Number(item.minLevel)
                                            ? <span className="text-xs text-red-400 font-bold">⚠️ Low</span>
                                            : <span className="text-xs text-green-400">✅ OK</span>}
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button onClick={() => edit(item)} style={{ color: '#00bbc4' }}><Edit2 size={14} /></button>
                                            <button onClick={() => del(item.id)} className="text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && <tr><td colSpan="6" className="text-center py-8 opacity-50">No inventory items yet</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
