import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChefHat,
  Users,
  Award,
  ShoppingCart,
  Utensils,
  Coffee,
  IceCream,
  Wine,
} from 'lucide-react';
import exteriorImg from '../assets/images/exterior.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Welcome to Hotel Chandamama',
      subtitle: 'Pure Vegetarian Delights',
      description: 'Experience authentic flavors in a premium ambiance',
      cta: 'Explore Menu',
      link: '/menu',
    },
    {
      title: 'Fresh & Hygienic Food',
      subtitle: 'Quality You Can Trust',
      description: 'Made with love, served with care',
      cta: 'Order Now',
      link: '/order',
    },
    {
      title: 'Catering Services',
      subtitle: 'For All Your Events',
      description: 'From intimate gatherings to grand celebrations',
      cta: 'Book Now',
      link: '/catering',
    },
  ];

  const features = [
    {
      icon: ChefHat,
      title: 'Expert Chefs',
      description: 'Experienced culinary masters',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Fresh ingredients daily',
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Comfortable dining space',
    },
    {
      icon: Star,
      title: 'Rated Excellence',
      description: 'Loved by customers',
    },
  ];

  const services = [
    { icon: Utensils, name: 'Tiffins', time: '6 AM - 11 AM' },
    { icon: ChefHat, name: 'Meals', time: '12 PM - 3 PM' },
    { icon: Coffee, name: 'Snacks', time: '4 PM - 7 PM' },
    { icon: IceCream, name: 'Desserts', time: 'All Day' },
    { icon: Wine, name: 'Beverages', time: 'All Day' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={exteriorImg}
            alt="Hotel Chandamama"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-peacock-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-peacock-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-peacock-400 text-lg mb-4 font-medium"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-200 mb-8"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={heroSlides[currentSlide].link}
                  className="btn-primary text-lg px-8 py-4"
                >
                  {heroSlides[currentSlide].cta}
                </Link>
                <a
                  href="tel:09989324091"
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-peacock-500'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-peacock-100 rounded-full mb-4 group-hover:bg-peacock-500 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-peacock-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 gradient-peacock">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-white/90">
              Delicious food served throughout the day
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <service.icon className="h-12 w-12 text-peacock-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">
                  Visit Us Today
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-peacock-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Working Hours</p>
                      <p className="text-gray-600">6:00 AM - 10:00 PM (Daily)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-peacock-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600">
                        NRT Road, beside Indian Petrol Pump,<br />
                        Mulakaluru, Vinukonda, Andhra Pradesh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-peacock-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-gray-600">09989324091</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Link
                  to="/menu"
                  className="btn-primary w-full text-center block"
                >
                  View Full Menu
                </Link>
                <Link
                  to="/order"
                  className="btn-secondary w-full text-center block"
                >
                  <ShoppingCart className="h-5 w-5 inline mr-2" />
                  Order Online
                </Link>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center block"
                >
                  <MapPin className="h-5 w-5 inline mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
