import React, { useState } from 'react';
import { createContact } from '../services/api';

const Catering = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await createContact({
        ...formData,
        type: 'catering',
      });

      setSuccess('Thank you! Your catering inquiry has been submitted. We will contact you shortly with details.');
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error sending inquiry:', err);
      setError('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Catering Services</h1>
          <p className="text-xl text-gray-600">
            Make your events memorable with our delicious catering
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Events & Parties</h3>
            <p className="text-gray-600">
              Perfect catering for birthdays, anniversaries, and celebrations
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Corporate Events</h3>
            <p className="text-gray-600">
              Professional catering for meetings, conferences, and office parties
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">👰</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Weddings</h3>
            <p className="text-gray-600">
              Specialized menu and service for your special day
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Why Choose Our Catering?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Customizable Menu</h3>
                <p className="text-gray-600">Choose from our wide variety or create a custom menu</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Professional Service</h3>
                <p className="text-gray-600">Experienced staff to serve your guests</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Hygienic Preparation</h3>
                <p className="text-gray-600">All food prepared in certified hygienic kitchen</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-3xl">✅</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Affordable Pricing</h3>
                <p className="text-gray-600">Competitive rates without compromising quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Request a Catering Quote
          </h2>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Event Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Please provide details: Event type, date, number of guests, preferred menu, etc."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Request Quote'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Or call us directly:</p>
            <a
              href="tel:+919876543210"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              📞 +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catering;
