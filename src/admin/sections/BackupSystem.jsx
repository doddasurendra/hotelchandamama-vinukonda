import { useState } from 'react';
import { Download, Upload, Database } from 'lucide-react';
import { getAll, setOne, getSingle, TABLES } from '../../db/database';

const ALL_TABLES = Object.values(TABLES);

function exportBackup() {
    const backup = {};
    ALL_TABLES.forEach(t => { backup[t] = getAll(t); });
    backup['_singletons'] = {};
    ['hc_content', 'hc_delivery', 'hc_chatbot', 'hc_notifications'].forEach(key => {
        backup['_singletons'][key] = getSingle(key);
    });
    backup['_timestamp'] = new Date().toISOString();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `HotelChandamama_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function importBackup(file) {
    const reader = new FileReader();
    reader.onload = ev => {
        try {
            const backup = JSON.parse(ev.target.result);
            // Restore all tables
            ALL_TABLES.forEach(t => { if (backup[t]) localStorage.setItem(t, JSON.stringify(backup[t])); });
            // Restore singletons
            if (backup['_singletons']) {
                Object.entries(backup['_singletons']).forEach(([k, v]) => { if (v) localStorage.setItem(k, JSON.stringify(v)); });
            }
            alert(`✅ Backup restored successfully! Backed up at: ${backup._timestamp || 'Unknown'}\n\nPlease refresh the page.`);
        } catch { alert('❌ Invalid backup file!'); }
    };
    reader.readAsText(file);
}

export default function BackupSystem() {
    const [importing, setImporting] = useState(false);
    const totalRecords = ALL_TABLES.reduce((s, t) => s + getAll(t).length, 0);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#00bbc4' }}>Backup & Restore</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Export */}
                <div className="peacock-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Database size={24} style={{ color: '#00bbc4' }} />
                        <div>
                            <h2 className="font-bold">Export Backup</h2>
                            <div className="text-xs opacity-60">{totalRecords} total records</div>
                        </div>
                    </div>
                    <p className="text-sm opacity-70 mb-4">Download a complete backup of all your data as a JSON file. Store it safely and use it to restore if needed.</p>
                    <div className="space-y-2 text-xs opacity-60 mb-4">
                        {ALL_TABLES.map(t => <div key={t} className="flex justify-between">
                            <span>{t.replace('hc_', '')}</span>
                            <span>{getAll(t).length} records</span>
                        </div>)}
                    </div>
                    <button onClick={exportBackup} className="btn-primary w-full flex items-center justify-center gap-2">
                        <Download size={16} /> Download Backup (.json)
                    </button>
                </div>

                {/* Import */}
                <div className="peacock-card p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Upload size={24} style={{ color: '#FFD700' }} />
                        <div>
                            <h2 className="font-bold">Restore Backup</h2>
                            <div className="text-xs opacity-60">Import a saved backup</div>
                        </div>
                    </div>
                    <p className="text-sm opacity-70 mb-4">Import a previously downloaded backup file to restore all your data. ⚠️ This will overwrite current data.</p>
                    <div className="p-3 rounded-lg mb-4 text-xs" style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)', color: '#ff8888' }}>
                        ⚠️ Warning: Restoring will overwrite all current data. Make sure to export a backup first!
                    </div>
                    <label className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer" style={{ background: 'linear-gradient(135deg, #FF9800, #e64a19)' }}>
                        <Upload size={16} /> Choose Backup File
                        <input type="file" accept=".json" className="hidden" onChange={e => { if (e.target.files[0]) importBackup(e.target.files[0]); }} />
                    </label>
                </div>
            </div>

            {/* Tips */}
            <div className="mt-5 peacock-card p-4 rounded-2xl">
                <h3 className="font-bold text-sm mb-3" style={{ color: '#00bbc4' }}>💡 Backup Best Practices</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs opacity-70">
                    {['Take a backup before any major changes', 'Store backup files in Google Drive or email yourself', 'Do daily backups for active businesses', 'Test restore on a different device periodically'].map(tip => (
                        <div key={tip} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: 'rgba(0,107,113,0.2)' }}>
                            <span className="text-green-400 flex-shrink-0">✓</span> {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
