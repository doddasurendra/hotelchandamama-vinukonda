import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';

const MENU_URL = 'https://hotel-chandamama.web.app/menu';

export default function QRCodeSection({ compact = false }) {
    const canvasRef = useRef(null);
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        const canvas = document.getElementById('hc-qr-canvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'HotelChandamama-Menu-QR.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2000);
    };

    if (compact) {
        return (
            <div className="flex flex-col items-center gap-2">
                <div className="qr-container p-3 rounded-xl">
                    <QRCodeCanvas
                        id="hc-qr-canvas-compact"
                        value={MENU_URL}
                        size={120}
                        bgColor="#ffffff"
                        fgColor="#001f22"
                        level="H"
                    />
                </div>
                <div className="text-xs text-center opacity-70">Scan to View Menu</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl animate-pulse-glow" style={{ background: 'rgba(0,69,73,0.5)', border: '2px solid rgba(0,187,196,0.4)' }}>
            {/* Header */}
            <div className="flex items-center gap-2">
                <QrCode size={20} style={{ color: '#00bbc4' }} />
                <span className="font-bold text-lg" style={{ color: '#00bbc4' }}>Scan to View Menu</span>
            </div>

            {/* QR Code */}
            <div className="qr-container">
                <QRCodeCanvas
                    id="hc-qr-canvas"
                    value={MENU_URL}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#001f22"
                    level="H"
                    imageSettings={{
                        src: '',
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                    }}
                />
            </div>

            <div className="text-center">
                <div className="text-sm opacity-70 mb-1">📱 No login required</div>
                <div className="text-xs opacity-50">Scan with any camera app</div>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                <Download size={16} />
                {downloaded ? '✅ Downloaded!' : 'Download QR Code'}
            </button>
        </div>
    );
}
