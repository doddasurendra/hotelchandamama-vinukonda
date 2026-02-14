import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../services/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items', emoji: '🍽️' },
    { id: 'morning', label: 'Morning Menu', emoji: '🌅' },
    { id: 'afternoon', label: 'Afternoon Menu', emoji: '☀️' },
    { id: 'evening', label: 'Evening Menu', emoji: '🌆' },
  ];

  useEffect(() => {
    fetchMenuItems();
  }, [activeCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const category = activeCategory === 'all' ? '' : activeCategory;
      const response = await getMenuItems(category);
      setMenuItems(response.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryItems = (category) => {
    if (activeCategory !== 'all') return menuItems;
    return menuItems.filter(item => item.category === category);
  };

  const renderMenuSection = (category) => {
    const items = getCategoryItems(category);
    if (items.length === 0) return null;

    const categoryInfo = categories.find(cat => cat.id === category);

    return (
      <div key={category} className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>{categoryInfo?.emoji}</span>
          <span>{categoryInfo?.label}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                !item.available ? 'opacity-60' : ''
              }`}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                  {!item.available && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Not Available
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-primary">₹{item.price}</p>
                  <span className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Menu</h1>
          <p className="text-xl text-gray-600">
            Delicious South Indian cuisine made with love
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.emoji} {category.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Menu Items */}
        {!loading && !error && (
          <>
            {activeCategory === 'all' ? (
              <>
                {renderMenuSection('morning')}
                {renderMenuSection('afternoon')}
                {renderMenuSection('evening')}
              </>
            ) : (
              renderMenuSection(activeCategory)
            )}

            {menuItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-xl">No items available in this category.</p>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-primary text-white rounded-lg p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Order?</h3>
          <p className="text-xl mb-6">Call us now for takeaway or dine-in!</p>
          <a
            href="tel:+91 9989324091"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            📞 Call Now: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
