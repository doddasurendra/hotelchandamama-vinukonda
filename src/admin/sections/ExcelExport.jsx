import { useState } from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { getAll, TABLES } from '../../db/database';

const EXPORTS = [
    { label: 'Menu Items', emoji: '🍽️', table: TABLES.MENU, filename: 'HotelChandamama_Menu' },
    { label: 'Orders', emoji: '📦', table: TABLES.ORDERS, filename: 'HotelChandamama_Orders' },
    { label: 'Reviews', emoji: '⭐', table: TABLES.REVIEWS, filename: 'HotelChandamama_Reviews' },
    { label: 'Contact Messages', emoji: '✉️', table: TABLES.CONTACT_MESSAGES, filename: 'HotelChandamama_Contacts' },
    { label: 'Function Bookings', emoji: '🎉', table: TABLES.FUNCTION_BOOKINGS, filename: 'HotelChandamama_Bookings' },
    { label: 'Inventory', emoji: '📦', table: TABLES.INVENTORY, filename: 'HotelChandamama_Inventory' },
    { label: 'Coupons', emoji: '🎟️', table: TABLES.COUPONS, filename: 'HotelChandamama_Coupons' },
];

function exportToExcel(table, filename) {
    const data = getAll(table);
    if (data.length === 0) { alert('No data to export!'); return; }
    // Clean data - remove base64 images (too large)
    const cleaned = data.map(row => {
        const r = { ...row };
        if (r.imageUrl && r.imageUrl.startsWith('data:')) r.imageUrl = '[Image stored locally]';
        if (r.url && r.url.startsWith('data:')) r.url = '[Image stored locally]';
        return r;
    });
    const ws = XLSX.utils.json_to_sheet(cleaned);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename.slice(-31));
    XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function exportAll() {
    const wb = XLSX.utils.book_new();
    EXPORTS.forEach(({ table, filename }) => {
        const data = getAll(table);
        if (data.length === 0) return;
        const cleaned = data.map(row => {
            const r = { ...row };
            if (r.imageUrl?.startsWith('data:')) r.imageUrl = '[Image]';
            if (r.url?.startsWith('data:')) r.url = '[Image]';
            return r;
        });
        const ws = XLSX.utils.json_to_sheet(cleaned);
        XLSX.utils.book_append_sheet(wb, ws, filename.replace('HotelChandamama_', '').slice(0, 31));
    });
    XLSX.writeFile(wb, `HotelChandamama_FullExport_${new Date().toISOString().split('T')[0]}.xlsx`);
}

export default function ExcelExport() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#00bbc4' }}>Excel Export</h1>
            <p className="text-sm opacity-60 mb-6">Download any data table as an Excel (.xlsx) file</p>

            <button onClick={exportAll} className="mb-6 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
                <Download size={18} /> Export All Data (One File)
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {EXPORTS.map(ex => {
                    const count = getAll(ex.table).length;
                    return (
                        <div key={ex.label} className="peacock-card p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <div className="text-2xl mb-1">{ex.emoji}</div>
                                <div className="font-semibold text-sm">{ex.label}</div>
                                <div className="text-xs opacity-50">{count} records</div>
                            </div>
                            <button onClick={() => exportToExcel(ex.table, ex.filename)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
                                style={{ background: 'linear-gradient(135deg, #00bbc4, #006b71)' }}>
                                <Download size={14} /> .xlsx
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
