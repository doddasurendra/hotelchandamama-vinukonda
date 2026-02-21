import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from './db/database';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import FunctionsPage from './pages/FunctionsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';

function AdminGuard({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No auth required */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/functions" element={<FunctionsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes - Password protected */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
