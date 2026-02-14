import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <AdminLayout setIsAuthenticated={setIsAuthenticated}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/contacts" element={<ContactsManagement />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AdminLayout>
      )}
    </Router>
  );
}

// Admin Layout Component
function AdminLayout({ children, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/menu', label: 'Menu Management', icon: '🍽️' },
    { path: '/orders', label: 'Orders', icon: '📦' },
    { path: '/contacts', label: 'Contacts', icon: '📧' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-700 hover:text-primary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <img src="/logo.png" alt="Logo" className="h-10 w-10" />
              <h1 className="text-xl font-bold text-gray-800">Hotel Chandamama Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-lg ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <nav className="p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors mb-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

// Placeholder Components (these would be full implementations)
function MenuManagement() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Menu management interface will be implemented here.</p>
        <p className="text-sm text-gray-500 mt-4">
          This page will allow you to:
          - Add new menu items
          - Edit existing items
          - Delete items
          - Upload food images
          - Auto-generate sample menu
          - Filter by category (Morning/Afternoon/Evening)
        </p>
      </div>
    </div>
  );
}

function OrdersManagement() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Orders management interface will be implemented here.</p>
        <p className="text-sm text-gray-500 mt-4">
          This page will show:
          - All customer orders
          - Order details
          - Customer information
          - Order status (Pending, Preparing, Ready, Delivered)
          - Update order status
        </p>
      </div>
    </div>
  );
}

function ContactsManagement() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contacts Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Contacts management interface will be implemented here.</p>
        <p className="text-sm text-gray-500 mt-4">
          This page will show:
          - Customer inquiries
          - Catering requests
          - Contact information
          - Delete contacts
        </p>
      </div>
    </div>
  );
}

function GalleryManagement() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Gallery management interface will be implemented here.</p>
        <p className="text-sm text-gray-500 mt-4">
          This page will allow you to:
          - Upload restaurant images
          - View all gallery images
          - Delete images
          - Images stored in Cloudinary
        </p>
      </div>
    </div>
  );
}

export default App;
