import { useState, useEffect } from 'react';
import { getAll, update, TABLES } from '../../db/database';

const STATUS_OPTIONS = ['Received', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

export default function OrdersManager() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('all');

    const load = () => setOrders(getAll(TABLES.ORDERS).reverse());
    useEffect(load, []);

    const updateStatus = (id, status) => { update(TABLES.ORDERS, id, { status }); load(); };

    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#00bbc4' }}>Orders Management</h1>
            <p className="text-sm opacity-60 mb-6">{orders.length} total orders</p>

            <div className="flex gap-2 flex-wrap mb-4">
                {['all', ...STATUS_OPTIONS].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                        style={filter === s ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' } : { background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)', color: '#b3ecef' }}>
                        {s}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-12 opacity-50">
                        <div className="text-4xl mb-2">📦</div>
                        <div>No orders found</div>
                    </div>
                ) : filtered.map(o => (
                    <div key={o.id} className="peacock-card rounded-xl p-4">
                        <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
                            <div>
                                <div className="font-mono font-bold" style={{ color: '#00bbc4' }}>{o.orderId}</div>
                                <div className="text-sm">{o.customerName} · 📞 {o.phone}</div>
                                <div className="text-xs opacity-50 mt-0.5">{new Date(o.createdAt).toLocaleString('en-IN')}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-xl" style={{ color: '#FFD700' }}>₹{o.total}</div>
                                <div className="text-xs opacity-60">{o.items?.length || 0} items</div>
                            </div>
                        </div>
                        {/* Items */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {o.items?.map((item, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,107,113,0.4)' }}>
                                    {item.name} ×{item.qty}
                                </span>
                            ))}
                        </div>
                        {o.instructions && <div className="text-xs opacity-60 mb-2 italic">"Special: {o.instructions}"</div>}
                        {/* Status control */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs opacity-60">Status:</span>
                            <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                                style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }}>
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${o.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : o.status === 'Received' ? 'bg-yellow-500/20 text-yellow-400' : o.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {o.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
