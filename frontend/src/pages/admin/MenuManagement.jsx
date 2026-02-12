import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Sparkles, Search, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [generatingImage, setGeneratingImage] = useState(false);

  const categories = ['All', 'Tiffins', 'Meals', 'Snacks', 'Beverages', 'Desserts', 'Special'];
  const spiceLevels = ['None', 'Mild', 'Medium', 'Spicy', 'Extra Spicy'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Tiffins',
    price: '',
    spiceLevel: 'None',
    preparationTime: 15,
    isAvailable: true,
    isVeg: true,
    tags: '',
    image: null,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.data);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load menu items');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          formDataToSend.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim()).filter(Boolean)));
        } else if (key === 'image' && formData.image) {
          formDataToSend.append('image', formData.image);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const url = editingItem 
        ? `/api/menu/${editingItem._id}` 
        : '/api/menu';
      
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingItem ? 'Item updated successfully!' : 'Item added successfully!');
        fetchMenuItems();
        closeModal();
      } else {
        toast.error(data.message || 'Failed to save item');
      }
    } catch (error) {
      toast.error('Error saving menu item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Item deleted successfully!');
        fetchMenuItems();
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      category: item.category,
      price: item.price,
      spiceLevel: item.spiceLevel || 'None',
      preparationTime: item.preparationTime || 15,
      isAvailable: item.isAvailable,
      isVeg: item.isVeg,
      tags: item.tags?.join(', ') || '',
      image: null,
    });
    setIsModalOpen(true);
  };

  const generateAIImage = async () => {
    if (!formData.name) {
      toast.error('Please enter item name first');
      return;
    }

    setGeneratingImage(true);
    
    try {
      // Call AI image generation API
      const response = await fetch('/api/admin/generate-food-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemName: formData.name,
          category: formData.category,
          description: formData.description 
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Convert base64 to blob for preview
        const imageBlob = await fetch(data.imageUrl).then(r => r.blob());
        const imageFile = new File([imageBlob], 'ai-generated.jpg', { type: 'image/jpeg' });
        
        setFormData({ ...formData, image: imageFile });
        toast.success('AI image generated successfully!');
      } else {
        toast.error('Failed to generate image');
      }
    } catch (error) {
      toast.error('Error generating AI image');
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setFormData({ ...formData, image: file });
      toast.success('Image selected');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      category: 'Tiffins',
      price: '',
      spiceLevel: 'None',
      preparationTime: 15,
      isAvailable: true,
      isVeg: true,
      tags: '',
      image: null,
    });
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold mb-2">Menu Management</h1>
        <p className="text-gray-600">Add, edit, and manage your restaurant menu items</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-peacock-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-peacock-50 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-peacock-200 border-t-peacock-600 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No menu items found. Add your first item!
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 mr-4">
                          {item.image?.url ? (
                            <img
                              src={item.image.url}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gradient-peacock flex items-center justify-center text-white text-xl">
                              🍽️
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-peacock-100 text-peacock-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  placeholder="e.g., Masala Dosa"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  placeholder="Describe your dish..."
                />
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Spice Level and Prep Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spice Level
                  </label>
                  <select
                    value={formData.spiceLevel}
                    onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  >
                    {spiceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preparation Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-peacock-500 focus:border-transparent"
                  placeholder="South Indian, Popular, Spicy"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="w-4 h-4 text-peacock-600 border-gray-300 rounded focus:ring-peacock-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-peacock-600 border-gray-300 rounded focus:ring-peacock-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Available Now</span>
                </label>
              </div>

              {/* Image Upload Section */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Item Image
                </label>

                <div className="space-y-4">
                  {/* AI Generate Button */}
                  <button
                    type="button"
                    onClick={generateAIImage}
                    disabled={generatingImage}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
                  >
                    <Sparkles className={`h-5 w-5 ${generatingImage ? 'animate-spin' : ''}`} />
                    <span>{generatingImage ? 'Generating AI Image...' : 'Generate AI Image'}</span>
                  </button>

                  <div className="text-center text-gray-500 text-sm">OR</div>

                  {/* Manual Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-peacock-500 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">
                        Click to upload image
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </span>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600 mb-2">✓ Image selected: {formData.image.name}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>{editingItem ? 'Update Item' : 'Add Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
