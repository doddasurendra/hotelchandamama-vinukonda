import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Tiffins', 'Meals', 'Snacks', 'Beverages', 'Desserts'];

  useEffect(() => {
    // Fetch menu items from API
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/menu');
      // const data = await response.json();
      
      // Sample data
      const sampleData = [
        { id: 1, name: 'Idli', category: 'Tiffins', price: 40, image: '', available: true },
        { id: 2, name: 'Dosa', category: 'Tiffins', price: 50, image: '', available: true },
        { id: 3, name: 'Vada', category: 'Tiffins', price: 35, image: '', available: true },
        { id: 4, name: 'Special Meals', category: 'Meals', price: 120, image: '', available: true },
        { id: 5, name: 'Samosa', category: 'Snacks', price: 25, image: '', available: true },
        { id: 6, name: 'Tea', category: 'Beverages', price: 15, image: '', available: true },
      ];
      
      setMenuItems(sampleData);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load menu');
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-center mb-8">Our Menu</h1>
        
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-peacock-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-peacock-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item">
                <div className="bg-gradient-peacock h-48 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-6xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-peacock-600">₹{item.price}</span>
                  <button className="bg-peacock-500 hover:bg-peacock-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
