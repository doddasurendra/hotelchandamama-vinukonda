import React, { useState, useEffect } from 'react';
import { getAll, getSingle, TABLES } from '../../db/database';

export default function CloudData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const allData = {};
        for (const [key, tableName] of Object.entries(TABLES)) {
            try {
                // If it's a known single object table like SITE_CONTENT
                if (tableName === 'site_content') {
                    allData[tableName] = getSingle(tableName);
                } else {
                    allData[tableName] = getAll(tableName);
                }
            } catch (err) {
                console.error("Error reading", tableName, err);
            }
        }
        setData(allData);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#00bbc4' }}>Cloud Data</h1>
            <p className="mb-4 opacity-70">View the raw JSON data of your website below.</p>
            <div className="bg-black/50 p-4 rounded-xl border" style={{ borderColor: 'rgba(0,187,196,0.2)' }}>
                <pre className="text-xs overflow-auto text-green-400 max-h-[70vh]">
                    {data ? JSON.stringify(data, null, 2) : "Loading data..."}
                </pre>
            </div>
        </div>
    );
}
