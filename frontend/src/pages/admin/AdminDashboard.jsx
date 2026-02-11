import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, Image, LogOut } from 'lucide-react';
import MenuManagement from './MenuManagement';

const AdminDashboard = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '' },
    { icon: UtensilsCrossed, label: 'Menu Management', path: 'menu' },
    { icon: ShoppingBag, label: 'Orders', path: 'orders' },
    { icon: Users, label: 'Customers', path: 'customers' },
    { icon: Image, label: 'Gallery', path: 'gallery' },
    { icon: Settings, label: 'Settings', path: 'settings' },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname.replace('/admin/dashboard/', '').replace('/admin/dashboard', '');
    return currentPath === path;
  };

  const DashboardHome = () => (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-peacock-600">0</p>
          <p className="text-sm text-gray-500 mt-2">↑ 0% from last month</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Menu Items</h3>
          <p className="text-3xl font-bold text-peacock-600">0</p>
          <p className="text-sm text-gray-500 mt-2">Active items</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Customers</h3>
          <p className="text-3xl font-bold text-peacock-600">0</p>
          <p className="text-sm text-gray-500 mt-2">Registered users</p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Revenue (Today)</h3>
          <p className="text-3xl font-bold text-peacock-600">₹0</p>
          <p className="text-sm text-gray-500 mt-2">Total earnings</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/dashboard/menu" className="btn-primary text-center">
            Add Menu Item
          </Link>
          <Link to="/admin/dashboard/orders" className="btn-secondary text-center">
            View Orders
          </Link>
          <Link to="/kitchen" className="btn-secondary text-center">
            Kitchen Display
          </Link>
        </div>
      </div>
    </div>
  );

  const OrdersPage = () => (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Orders Management</h1>
      <div className="card p-6">
        <p className="text-gray-600">Orders management coming soon...</p>
      </div>
    </div>
  );

  const CustomersPage = () => (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Customer Management</h1>
      <div className="card p-6">
        <p className="text-gray-600">Customer management coming soon...</p>
      </div>
    </div>
  );

  const GalleryPage = () => (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Gallery Management</h1>
      <div className="card p-6">
        <p className="text-gray-600">Gallery management coming soon...</p>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div>
      <h1 className="text-3xl font-display font-bold mb-8">Settings</h1>
      <div className="card p-6">
        <p className="text-gray-600">Settings page coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen pt-8 fixed left-0 top-16 bottom-0 overflow-y-auto">
          <div className="px-4 mb-8">
            <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Hotel Chandamama</p>
          </div>
          
          <nav className="space-y-1 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={`/admin/dashboard/${item.path}`}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-peacock-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-peacock-50 hover:text-peacock-600'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="px-4 mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/admin/login"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
