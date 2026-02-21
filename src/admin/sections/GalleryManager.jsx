import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Image } from 'lucide-react';
import { getAll, insert, remove, getSingle, setOne, TABLES } from '../../db/database';

export default function GalleryManager() {
    const [gallery, setGallery] = useState([]);
    const [siteContent, setSiteContent] = useState({});
    const fileRef = useRef();

    const load = () => {
        setGallery(getAll(TABLES.GALLERY));
        setSiteContent(getSingle(TABLES.SITE_CONTENT) || {});
    };
    useEffect(load, []);

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = ev => {
                insert(TABLES.GALLERY, { url: ev.target.result, title: file.name.replace(/\.[^/.]+$/, ''), type: 'gallery' });
                load();
            };
            reader.readAsDataURL(file);
        });
    };

    const setAsLogo = (url) => {
        const c = getSingle(TABLES.SITE_CONTENT) || {};
        setOne(TABLES.SITE_CONTENT, { ...c, logoUrl: url });
        setSiteContent(prev => ({ ...prev, logoUrl: url }));
        alert('Logo updated! Reload the page to see it.');
    };

    const setAsHero = (url) => {
        const c = getSingle(TABLES.SITE_CONTENT) || {};
        setOne(TABLES.SITE_CONTENT, { ...c, heroUrl: url });
        setSiteContent(prev => ({ ...prev, heroUrl: url }));
        alert('Hero background updated! Reload the page to see it.');
    };

    const del = (id) => {
        if (window.confirm('Delete this photo?')) {
            remove(TABLES.GALLERY, id);
            load();
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: '#00bbc4' }}>Gallery Manager</h1>
                    <p className="text-sm opacity-60">{gallery.length} photos</p>
                </div>
                <button onClick={() => fileRef.current.click()} className="btn-primary flex items-center gap-2">
                    <Upload size={16} /> Upload Photos
                </button>
                <input type="file" accept="image/*" multiple ref={fileRef} onChange={handleUpload} className="hidden" />
            </div>

            {/* Current branding preview */}
            <div className="peacock-card p-4 rounded-xl mb-6">
                <div className="text-sm font-semibold mb-3" style={{ color: '#00bbc4' }}>Current Branding</div>
                <div className="flex gap-6 flex-wrap items-end">
                    <div className="text-center">
                        <div className="text-xs opacity-60 mb-1">Hotel Logo</div>
                        {siteContent.logoUrl
                            ? <img src={siteContent.logoUrl} alt="logo" className="w-16 h-16 object-cover rounded-full border-2" style={{ borderColor: '#00bbc4' }} />
                            : <div className="w-16 h-16 rounded-full flex items-center justify-center opacity-40" style={{ background: 'rgba(0,107,113,0.4)' }}><Image size={20} /></div>}
                    </div>
                    <div className="text-center">
                        <div className="text-xs opacity-60 mb-1">Hero Background</div>
                        {siteContent.heroUrl
                            ? <img src={siteContent.heroUrl} alt="hero" className="w-32 h-16 object-cover rounded-lg border-2" style={{ borderColor: '#00bbc4' }} />
                            : <div className="w-32 h-16 rounded-lg flex items-center justify-center opacity-40" style={{ background: 'rgba(0,107,113,0.4)' }}><Image size={20} /></div>}
                    </div>
                    {siteContent.heroUrl && (
                        <button
                            onClick={() => { setOne(TABLES.SITE_CONTENT, { ...getSingle(TABLES.SITE_CONTENT), heroUrl: '' }); setSiteContent(p => ({ ...p, heroUrl: '' })); alert('Hero background cleared!'); }}
                            className="text-xs px-3 py-1.5 rounded-lg font-medium text-red-400 mb-0"
                            style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)' }}>
                            🗑️ Clear Hero
                        </button>
                    )}
                </div>
                <p className="text-xs opacity-40 mt-3">
                    Hover over any photo below → click <strong>Set as Logo</strong> or <strong>Set as Hero Background</strong>
                </p>
            </div>

            {/* ========== GALLERY GRID ========== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {gallery.map(photo => (
                    <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden"
                        style={{ background: 'rgba(0,50,54,0.5)', border: '1px solid rgba(0,187,196,0.15)' }}>

                        {/* Photo */}
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />

                        {/* ✅ ALWAYS-VISIBLE RED DELETE BUTTON — top-right corner */}
                        <button
                            onClick={() => del(photo.id)}
                            title="Delete photo"
                            className="absolute top-2 right-2 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
                            style={{
                                background: 'rgba(220, 38, 38, 0.9)',
                                border: '2px solid rgba(255,255,255,0.5)',
                            }}>
                            <Trash2 size={15} className="text-white" />
                        </button>

                        {/* Hover overlay (Set Logo / Set Hero) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end gap-1 p-2"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }}>
                            <div className="text-white text-xs font-semibold truncate mb-1">{photo.title}</div>
                            <button
                                onClick={() => setAsLogo(photo.url)}
                                className="w-full py-1.5 text-xs rounded-lg text-white font-semibold"
                                style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                🔵 Set as Logo
                            </button>
                            <button
                                onClick={() => setAsHero(photo.url)}
                                className="w-full py-1.5 text-xs rounded-lg text-white font-semibold"
                                style={{ background: 'linear-gradient(135deg, #9C27B0, #673AB7)' }}>
                                🖼️ Set as Hero BG
                            </button>
                        </div>
                    </div>
                ))}

                {gallery.length === 0 && (
                    <div className="col-span-full text-center py-16 opacity-50">
                        <div className="text-5xl mb-3">📷</div>
                        <div className="font-medium mb-1">No photos yet</div>
                        <div className="text-sm">Upload your hotel photos using the button above</div>
                    </div>
                )}
            </div>
        </div>
    );
}
