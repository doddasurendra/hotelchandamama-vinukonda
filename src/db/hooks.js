import { useState, useEffect } from 'react';
import { getSingle, getAll, subscribe } from './database';

export function useRecord(table) {
    const [data, setData] = useState(() => getSingle(table));

    useEffect(() => {
        // Listen for internal storage events
        const unsubscribe = subscribe((updatedTable, newData) => {
            if (updatedTable === table) {
                setData(Array.isArray(newData) ? newData[0] : newData);
            }
        });

        // Listen for cloud/external storage changes
        const handleCloud = (e) => {
            if (e.detail === table) {
                setData(getSingle(table));
            }
        };
        window.addEventListener('hc_data_changed', handleCloud);

        return () => {
            unsubscribe();
            window.removeEventListener('hc_data_changed', handleCloud);
        };
    }, [table]);

    return data;
}

export function useTable(table) {
    const [data, setData] = useState(() => getAll(table));

    useEffect(() => {
        const unsubscribe = subscribe((updatedTable, newData) => {
            if (updatedTable === table) {
                setData(newData);
            }
        });

        const handleCloud = (e) => {
            if (e.detail === table) {
                setData(getAll(table));
            }
        };
        window.addEventListener('hc_data_changed', handleCloud);

        return () => {
            unsubscribe();
            window.removeEventListener('hc_data_changed', handleCloud);
        };
    }, [table]);

    return data;
}
