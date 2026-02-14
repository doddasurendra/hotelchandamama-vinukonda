import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems, getOrders, getContacts } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [menuRes, ordersRes, contactsRes] = await Promise.all([
        getMenuItems(),
        getOrders(),
        getContacts(),
      ]);

      const orders = ordersRes.data.data;
      const pendingOrders = orders.filter(order => order.status === 'pending').length;

      setStats({
        totalMenuItems: menuRes.data.count,
        totalOrders: ordersRes.data.count,
        pendingOrders: pendingOrders,
        totalContacts: contactsRes.data.count,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Menu Items',
      value: stats.totalMenuItems,
      icon: '🍽️',
      color: 'bg-blue-500',
      link: '/menu',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      color: 'bg-green-500',
      link: '/orders',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'bg-yellow-500',
      link: '/orders',
    },
    {
      title: 'Contacts',
      value: stats.totalContacts,
      icon: '📧',
      color: 'bg-purple-500',
      link: '/contacts',
    },
  ];

  const quickActions = [
    { title: 'Add Menu Item', icon: '➕', link: '/menu', color: 'bg-primary' },
    { title: 'View Orders', icon: '📋', link: '/orders', color: 'bg-blue-600' },
    { title: 'Manage Gallery', icon: '🖼️', link: '/gallery', color: 'bg-green-600' },
    { title: 'Auto-Generate Menu', icon: '🤖', link: '/menu', color: 'bg-purple-600' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to Hotel Chandamama Admin Panel</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <Link
                key={stat.title}
                to={stat.link}
                className={`${stat.color} text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{stat.title}</p>
                    <p className="text-4xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="text-5xl opacity-80">{stat.icon}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className={`${action.color} text-white rounded-lg p-6 text-center hover:opacity-90 transition-opacity`}
                >
                  <div className="text-4xl mb-2">{action.icon}</div>
                  <p className="font-semibold">{action.title}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Important Links */}
          <div className="mt-8 bg-gradient-to-r from-primary to-red-600 text-white rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Important Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.hotel-chandamama-vinukonda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-4 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
              >
                🌐 Visit Customer Website
              </a>
              <a
                href="https://www.hotel-chandamama-vinukonda.com/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-4 py-3 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
              >
                📱 View QR Menu
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
