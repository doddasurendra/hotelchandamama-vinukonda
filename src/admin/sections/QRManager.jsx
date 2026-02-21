import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';

const MENU_URL = 'https://hotel-chandamama.web.app/menu';

export default function QRManager() {
    const [qrUrl, setQrUrl] = useState(MENU_URL);
    const [customUrl, setCustomUrl] = useState('');
    const [downloaded, setDownloaded] = useState(false);

    const download = () => {
        const canvas = document.getElementById('admin-qr');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'HotelChandamama-QR.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>QR Code Manager</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* QR Display */}
                <div className="peacock-card p-6 rounded-2xl flex flex-col items-center gap-4">
                    <h2 className="font-bold text-lg" style={{ color: '#00bbc4' }}>Menu QR Code</h2>
                    <div className="bg-white p-4 rounded-xl">
                        <QRCodeCanvas id="admin-qr" value={qrUrl} size={220} bgColor="#ffffff" fgColor="#001f22" level="H" />
                    </div>
                    <div className="text-sm text-center opacity-70">Scans to: <span style={{ color: '#00bbc4' }}>{qrUrl}</span></div>
                    <div className="flex gap-3">
                        <button onClick={download} className="btn-primary flex items-center gap-2"><Download size={14} /> {downloaded ? 'Downloaded!' : 'Download PNG'}</button>
                    </div>
                </div>

                {/* Settings */}
                <div className="peacock-card p-6 rounded-2xl">
                    <h2 className="font-bold mb-4" style={{ color: '#00bbc4' }}>QR Settings</h2>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 opacity-70">Current QR URL</label>
                        <div className="text-sm p-3 rounded-lg" style={{ background: 'rgba(0,107,113,0.3)' }}>{qrUrl}</div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 opacity-70">Change URL (optional)</label>
                        <input value={customUrl} onChange={e => setCustomUrl(e.target.value)} placeholder="Custom URL" />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => { if (customUrl) setQrUrl(customUrl); }} className="btn-primary text-sm">Update QR</button>
                        <button onClick={() => { setQrUrl(MENU_URL); setCustomUrl(''); }} className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg" style={{ background: 'rgba(0,107,113,0.4)', border: '1px solid rgba(0,187,196,0.2)' }}>
                            <RefreshCw size={13} /> Reset to Menu
                        </button>
                    </div>
                    <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(0,107,113,0.2)' }}>
                        <div className="font-semibold text-sm mb-2" style={{ color: '#00bbc4' }}>📋 How to use:</div>
                        <ul className="text-xs opacity-70 space-y-1">
                            <li>• Print & display QR at counter or tables</li>
                            <li>• Customers scan with any phone camera</li>
                            <li>• Opens menu instantly - NO login required</li>
                            <li>• Download PNG for printing or sharing</li>
                            <li>• QR also visible on the homepage top-right</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
