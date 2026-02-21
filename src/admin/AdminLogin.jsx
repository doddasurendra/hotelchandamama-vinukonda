import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { adminLogin, isAdminLoggedIn } from '../db/database';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (isAdminLoggedIn()) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handle = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise(r => setTimeout(r, 600)); // fake delay
        if (adminLogin(password)) {
            navigate('/admin/dashboard', { replace: true });
        } else {
            setError('Incorrect password. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #000e10 0%, #001f22 50%, #004549 100%)' }}>
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                        <Lock size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black mb-1" style={{ color: '#00bbc4' }}>Admin Access</h1>
                    <p className="text-sm opacity-60">Hotel Chandamama Management Portal</p>
                </div>

                {/* Login form */}
                <div className="peacock-card rounded-2xl p-8">
                    <form onSubmit={handle} className="space-y-5">
                        <div>
                            <label className="block text-sm mb-2 font-medium opacity-80">Admin Password</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                    style={{ paddingRight: '44px' }}
                                />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm px-3 py-2 rounded-lg" style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)' }}>
                                ❌ {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                            {loading ? '⏳ Verifying...' : <><LogIn size={16} /> Login to Dashboard</>}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 text-center text-xs opacity-40 border-t" style={{ borderColor: 'rgba(0,187,196,0.2)' }}>
                        🔒 Authorized personnel only. All actions are logged.
                    </div>
                </div>

                <div className="text-center mt-4">
                    <a href="/" className="text-sm opacity-50 hover:opacity-100 hover:text-peacock-300 transition-opacity">
                        ← Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
}
