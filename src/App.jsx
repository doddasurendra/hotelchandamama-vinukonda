import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import FunctionsPage from './pages/FunctionsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import { firebaseService } from './db/firebaseService';

export default function App() {

  useEffect(() => {
    // Pull latest data from Firestore into localStorage on every page load
    // This ensures mobile always sees laptop's latest changes
    if (!firebaseService.isEnabled()) return;

    firebaseService.pullAllFromCloud().then(synced => {
      if (synced) {
        // Notify all hooks that data has changed
        Object.keys(localStorage)
          .filter(k => k.startsWith('hc_'))
          .forEach(k => {
            try {
              window.dispatchEvent(new CustomEvent('hc_data_changed', { detail: k }));
            } catch { }
          });
        console.log('[HC] Data synced from cloud ✓');
      }
    }).catch(e => {
      console.warn('[HC] Cloud sync skipped:', e.message);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/functions" element={<FunctionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
