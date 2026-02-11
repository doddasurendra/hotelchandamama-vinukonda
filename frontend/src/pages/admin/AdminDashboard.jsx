import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, Image } from 'lucide-react';

const AdminDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '' },
    { icon: UtensilsCrossed, label: 'Menu Management', path: 'menu' },
    { icon: ShoppingBag, label: 'Orders', path: 'orders' },
    { icon: Users, label: 'Customers', path: 'customers' },
    { icon: Image, label: 'Gallery', path: 'gallery' },
    { icon: Settings, label: 'Settings', path: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen pt-8">
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={`/admin/dashboard/${item.path}`}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-peacock-50 hover:text-peacock-600 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-display font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-peacock-600">0</p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-2">Menu Items</h3>
              <p className="text-3xl font-bold text-peacock-600">0</p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-2">Customers</h3>
              <p className="text-3xl font-bold text-peacock-600">0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
