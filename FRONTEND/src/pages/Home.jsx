import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src="/hotel-front.jpg" 
          alt="Hotel Chandamama" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <img 
            src="/logo.png" 
            alt="Hotel Chandamama" 
            className="h-32 w-32 mx-auto mb-6 animate-bounce"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hotel Chandamama
          </h1>
          <p className="text-2xl md:text-3xl mb-2">🌙 Tasty Food Basket 🌙</p>
          <p className="text-xl md:text-2xl mb-8">
            Authentic South Indian Cuisine in Vinukonda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Menu 🍽️
            </Link>
            <a
              href="tel:+919876543210"
              className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Call Now 📞
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">🍛</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Authentic Taste</h3>
              <p className="text-gray-600">
                Traditional South Indian recipes passed down through generations
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fresh Ingredients</h3>
              <p className="text-gray-600">
                Only the freshest ingredients sourced daily for quality meals
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Quick Service</h3>
              <p className="text-gray-600">
                Fast and efficient service without compromising on quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Popular Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Idli', emoji: '🥟', price: '₹30' },
              { name: 'Dosa', emoji: '🥞', price: '₹40' },
              { name: 'Vada', emoji: '🍩', price: '₹35' },
              { name: 'Biryani', emoji: '🍚', price: '₹120' },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-6xl mb-3">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-primary text-2xl font-bold">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience Authentic Taste?
          </h2>
          <p className="text-xl mb-8">
            Visit us today or call for takeaway orders!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/catering"
              className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Catering Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
