import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { getSingle, TABLES } from '../db/database';

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const config = getSingle(TABLES.CHATBOT) || {};

    useEffect(() => {
        if (open && messages.length === 0) {
            setMessages([{ from: 'bot', text: config.greeting || 'Namaste! 🙏 Welcome to Hotel Chandamama. How can I help you?' }]);
        }
    }, [open]);

    const send = () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages(m => [...m, { from: 'user', text: userMsg }]);
        setInput('');

        // FAQ matching
        const faqs = config.faqs || [];
        const matched = faqs.find(f => f.q.toLowerCase().split(' ').some(word => userMsg.toLowerCase().includes(word)));
        setTimeout(() => {
            setMessages(m => [...m, {
                from: 'bot',
                text: matched ? matched.a : "I'm not sure about that. Please call us at 09989324091 or WhatsApp us for more help! 😊"
            }]);
        }, 600);
    };

    if (!config.enabled && config.enabled !== undefined) return null;

    return (
        <>
            {/* Chat bubble */}
            <button
                onClick={() => setOpen(!open)}
                className="floating-btn"
                style={{ bottom: '148px', right: '16px', background: 'linear-gradient(135deg, #00bbc4, #006b71)', position: 'fixed', zIndex: 1001 }}
                title="Chat with us">
                {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
            </button>

            {/* Chat window */}
            {open && (
                <div className="fixed z-50 rounded-2xl overflow-hidden" style={{
                    bottom: '210px', right: '16px', width: '320px', height: '420px',
                    background: '#001f22', border: '1px solid rgba(0,187,196,0.4)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.6)'
                }}>
                    {/* Header */}
                    <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #006b71, #00bbc4)' }}>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">🏨</div>
                        <div>
                            <div className="font-bold text-sm text-white">Hotel Chandamama</div>
                            <div className="text-xs text-white/70">Virtual Assistant</div>
                        </div>
                        <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
                            <ChevronDown size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ height: '300px' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-[80%] px-3 py-2 rounded-2xl text-sm"
                                    style={{
                                        background: msg.from === 'user' ? 'linear-gradient(135deg, #00bbc4, #006b71)' : 'rgba(0,69,73,0.8)',
                                        color: 'white',
                                        borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
                                    }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 flex gap-2" style={{ borderTop: '1px solid rgba(0,187,196,0.2)' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()}
                            placeholder="Ask anything..."
                            style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                        />
                        <button onClick={send} className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
