import React, { useState, useEffect } from 'react';
import { getAll, getSingle, TABLES, syncAllToCloud } from '../../db/database';
import { firebaseService } from '../../db/firebaseService';
import { RefreshCw, Database, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function CloudData() {
    const [data, setData] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const [syncResult, setSyncResult] = useState(null);
    const [logs, setLogs] = useState([]);

    const loadData = () => {
        const allData = {};
        for (const [key, tableName] of Object.entries(TABLES)) {
            try {
                if (tableName === 'hc_content') {
                    allData[tableName] = getSingle(tableName);
                } else {
                    allData[tableName] = getAll(tableName);
                }
            } catch (err) {
                console.error("Error reading", tableName, err);
            }
        }
        setData(allData);
        setLogs(getAll(TABLES.ACTIVITY_LOGS) || []);
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await syncAllToCloud(firebaseService);
            setSyncResult(res);
            setTimeout(() => setSyncResult(null), 5000);
        } catch (e) {
            console.error(e);
        }
        setSyncing(false);
        loadData();
    };

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/40 p-6 rounded-2xl border border-peacock-500/20">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: '#00bbc4' }}>
                        <Database className="w-8 h-8" />
                        Cloud Data & Activity
                    </h1>
                    <p className="mt-1 opacity-70">Monitor your website's database and live activities here.</p>
                </div>
                <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                    style={{
                        backgroundColor: syncing ? 'rgba(0,187,196,0.1)' : '#00bbc4',
                        color: syncing ? '#00bbc4' : 'black',
                        border: syncing ? '1px solid #00bbc4' : 'none'
                    }}
                >
                    <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
                    {syncing ? 'Syncing Now...' : 'Force Cloud Sync'}
                </button>
            </div>

            {syncResult && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${syncResult.success !== false ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                    {syncResult.success !== false ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span>{syncResult.success !== false ? `Successfully synced ${syncResult.pushed?.length || 0} tables to cloud.` : syncResult.reason}</span>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity Section */}
                <div className="bg-black/40 rounded-2xl border border-peacock-500/10 overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-peacock-500/10 bg-peacock-900/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-peacock-300">
                            <Activity className="w-5 h-5" />
                            Recent Activity Log
                        </div>
                        <span className="text-xs opacity-50">{logs.length} entries shown</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {logs.length > 0 ? (
                            logs.map((log, i) => (
                                <div key={i} className="flex gap-3 p-3 rounded-xl bg-peacock-950/20 border border-peacock-500/5 hover:border-peacock-500/20 transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-peacock-500/10 flex items-center justify-center flex-shrink-0">
                                        <Activity className="w-4 h-4 text-peacock-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-bold text-sm text-gray-200 truncate">{log.action}</span>
                                            <span className="text-[10px] opacity-40 whitespace-nowrap">{new Date(log.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-xs opacity-60 truncate">{log.detail}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-peacock-500/10 text-peacock-400 uppercase tracking-widest">{log.table?.replace('hc_', '')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center p-8">
                                <Activity className="w-12 h-12 mb-2" />
                                <p>No activity recorded yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Raw JSON Data Section */}
                <div className="bg-black/40 rounded-2xl border border-peacock-500/10 overflow-hidden flex flex-col h-[600px]">
                    <div className="p-4 border-b border-peacock-500/10 bg-peacock-900/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-peacock-300">
                            <Database className="w-5 h-5" />
                            Raw Cloud Explorer
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-50">
                            <Clock className="w-3 h-3" />
                            Auto-refreshing
                        </div>
                    </div>
                    <div className="flex-1 p-4 bg-black/30 overflow-hidden relative">
                        <pre className="text-[10px] overflow-auto text-green-400/80 h-full scrollbar-thin scrollbar-thumb-peacock-500/20">
                            {data ? JSON.stringify(data, null, 2) : "Loading raw data..."}
                        </pre>
                        <div className="absolute top-4 right-4 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-bold animate-pulse">
                            LIVE JSON
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-peacock-600/5 p-4 rounded-xl border border-peacock-400/10 text-sm opacity-80">
                <p className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#00bbc4]" />
                    <strong>Tip:</strong> Everything you do in the admin panel is automatically synced to the cloud. You can use the button above to manually force a sync if needed.
                </p>
            </div>
        </div>
    );
}
