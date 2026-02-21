import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { getAll, update, remove, TABLES } from '../../db/database';
import { StarDisplay } from '../../components/StarRating';

export default function ReviewsManager() {
    const [reviews, setReviews] = useState([]);
    const [tab, setTab] = useState('pending');
    const load = () => setReviews(getAll(TABLES.REVIEWS).reverse());
    useEffect(load, []);

    const approve = (id) => { update(TABLES.REVIEWS, id, { approved: true }); load(); };
    const reject = (id) => { update(TABLES.REVIEWS, id, { approved: false }); load(); };
    const del = (id) => { if (confirm('Delete review?')) { remove(TABLES.REVIEWS, id); load(); } };

    const filtered = reviews.filter(r => tab === 'pending' ? !r.approved : tab === 'approved' ? r.approved : true);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Reviews Management</h1>
            <div className="flex gap-2 mb-4">
                {['pending', 'approved', 'all'].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium capitalize"
                        style={tab === t ? { background: 'linear-gradient(135deg, #00bbc4, #006b71)', color: 'white' } : { background: 'rgba(0,69,73,0.4)', border: '1px solid rgba(0,187,196,0.2)', color: '#b3ecef' }}>
                        {t} ({reviews.filter(r => t === 'pending' ? !r.approved : t === 'approved' ? r.approved : true).length})
                    </button>
                ))}
            </div>
            <div className="space-y-3">
                {filtered.map(r => (
                    <div key={r.id} className="peacock-card rounded-xl p-4 flex flex-wrap gap-4 items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="font-semibold">{r.name}</div>
                                <StarDisplay rating={r.rating || 5} size={13} />
                                <span className="text-xs opacity-50">{r.date}</span>
                            </div>
                            <p className="text-sm opacity-80">{r.comment}</p>
                            <div className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${r.approved ? 'text-green-400 bg-green-500/10' : 'text-yellow-400 bg-yellow-500/10'}`}>
                                {r.approved ? '✅ Published' : '⏳ Pending Approval'}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {!r.approved && <button onClick={() => approve(r.id)} className="btn-success flex items-center gap-1 text-xs"><CheckCircle size={14} /> Approve</button>}
                            {r.approved && <button onClick={() => reject(r.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: 'rgba(255,200,0,0.15)', color: '#FFD700', border: '1px solid rgba(255,200,0,0.3)' }}><XCircle size={14} /> Unpublish</button>}
                            <button onClick={() => del(r.id)} className="btn-danger flex items-center gap-1 text-xs"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <div className="text-center py-10 opacity-50">No reviews in this category</div>}
            </div>
        </div>
    );
}
