import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Award, Users, Heart, Leaf } from 'lucide-react';
import exteriorImg from '../assets/images/exterior-main.jpg';
import interiorImg from '../assets/images/interior-1.jpg';
import logo from '../assets/images/logo.jpg';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Pure Vegetarian',
      description: '100% vegetarian menu with authentic South Indian flavors',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Fresh ingredients and hygienic food preparation',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish prepared with care and dedication',
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Comfortable atmosphere for families and groups',
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={exteriorImg}
          alt="Hotel Chandamama"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                About Hotel Chandamama
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl">
                Serving delicious pure vegetarian food with a commitment to quality and tradition
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={logo}
                  alt="Hotel Chandamama Logo"
                  className="h-20 w-20 rounded-full ring-4 ring-peacock-500 mr-4"
                />
                <div>
                  <h2 className="text-3xl font-display font-bold">Our Story</h2>
                  <p className="text-peacock-600 font-medium">Tasty Food Blanket</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to <strong className="text-peacock-600">Hotel Chandamama</strong>, 
                  your premier destination for authentic pure vegetarian cuisine in Vinukonda. 
                  Located conveniently on NRT Road beside Indian Petrol Pump, we have been 
                  serving the community with dedication and passion.
                </p>
                <p>
                  Our restaurant is built on the foundation of three core principles: 
                  <strong> Quality, Hygiene, and Taste</strong>. Every dish that leaves our 
                  kitchen is prepared with the finest ingredients and utmost care.
                </p>
                <p>
                  From traditional South Indian tiffins to elaborate meals, refreshing 
                  beverages to delightful desserts, we offer a complete dining experience 
                  for families, friends, and food lovers.
                </p>
                <p>
                  Whether you're stopping by for a quick breakfast, enjoying a leisurely 
                  lunch, or celebrating a special occasion with our catering services, 
                  Hotel Chandamama is here to serve you with a smile.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={interiorImg}
                alt="Restaurant Interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-peacock-500 text-white p-6 rounded-xl shadow-xl">
                <p className="text-4xl font-bold">6 AM</p>
                <p className="text-sm">to 10 PM</p>
                <p className="text-xs mt-1">Open Daily</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What makes us special</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-peacock-100 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-peacock-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <MapPin className="h-12 w-12 text-peacock-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Location</h3>
              <p className="text-gray-600">
                NRT Road, beside Indian Petrol Pump<br />
                Mulakaluru, Vinukonda<br />
                Andhra Pradesh
              </p>
            </div>

            <div className="card p-8 text-center">
              <Phone className="h-12 w-12 text-peacock-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Contact Us</h3>
              <p className="text-gray-600 mb-2">
                Main: <a href="tel:09989324091" className="text-peacock-600 hover:underline">09989324091</a>
              </p>
              <p className="text-gray-600 text-sm">
                Catering:<br />
                9441128949<br />
                9703145416
              </p>
            </div>

            <div className="card p-8 text-center">
              <Clock className="h-12 w-12 text-peacock-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Working Hours</h3>
              <p className="text-gray-600">
                Open Daily<br />
                6:00 AM - 10:00 PM
              </p>
              <p className="text-sm text-peacock-600 mt-2">
                No Weekly Offs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-peacock">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Visit Us Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Experience the taste of authentic vegetarian cuisine in a warm, welcoming atmosphere
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:09989324091"
              className="bg-white hover:bg-gray-100 text-peacock-600 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
            >
              <Phone className="inline h-5 w-5 mr-2" />
              Call Now
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
            >
              <MapPin className="inline h-5 w-5 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
