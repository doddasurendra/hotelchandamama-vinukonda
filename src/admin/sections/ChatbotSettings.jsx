import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { getSingle, setOne, TABLES } from '../../db/database';

export default function ChatbotSettings() {
    const [config, setConfig] = useState({ enabled: true, greeting: '', faqs: [] });
    const [saved, setSaved] = useState(false);

    useEffect(() => { const c = getSingle(TABLES.CHATBOT); if (c) setConfig(c); }, []);

    const save = () => { setOne(TABLES.CHATBOT, config); setSaved(true); setTimeout(() => setSaved(false), 2000); };
    const addFaq = () => setConfig(c => ({ ...c, faqs: [...(c.faqs || []), { q: '', a: '' }] }));
    const updateFaq = (i, field, value) => setConfig(c => { const faqs = [...(c.faqs || [])]; faqs[i] = { ...faqs[i], [field]: value }; return { ...c, faqs }; });
    const delFaq = (i) => setConfig(c => ({ ...c, faqs: c.faqs.filter((_, j) => j !== i) }));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Chatbot Settings</h1>
                <button onClick={save} className="btn-primary flex items-center gap-2"><Save size={14} /> {saved ? '✅ Saved!' : 'Save'}</button>
            </div>
            <div className="peacock-card p-5 rounded-2xl mb-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Chatbot Enabled</span>
                    <input type="checkbox" checked={!!config.enabled} onChange={e => setConfig(c => ({ ...c, enabled: e.target.checked }))} style={{ width: 'auto', padding: '0', border: 'none' }} />
                </div>
                <label className="block text-xs mb-1 opacity-70">Greeting Message</label>
                <textarea rows={2} value={config.greeting || ''} onChange={e => setConfig(c => ({ ...c, greeting: e.target.value }))} placeholder="Hi! Welcome to Hotel Chandamama..." />
            </div>

            <div className="peacock-card p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold" style={{ color: '#00bbc4' }}>FAQ Responses ({config.faqs?.length || 0})</h2>
                    <button onClick={addFaq} className="btn-primary flex items-center gap-1 text-sm"><Plus size={14} /> Add FAQ</button>
                </div>
                <div className="space-y-3">
                    {(config.faqs || []).map((faq, i) => (
                        <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(0,107,113,0.3)' }}>
                            <div className="flex items-start gap-2 mb-2">
                                <input value={faq.q} onChange={e => updateFaq(i, 'q', e.target.value)} placeholder="Question..." />
                                <button onClick={() => delFaq(i)} className="text-red-400 mt-2"><Trash2 size={14} /></button>
                            </div>
                            <textarea rows={2} value={faq.a} onChange={e => updateFaq(i, 'a', e.target.value)} placeholder="Answer..." />
                        </div>
                    ))}
                    {!config.faqs?.length && <div className="text-center opacity-50 py-4">No FAQs yet. Add some!</div>}
                </div>
            </div>
        </div>
    );
}
