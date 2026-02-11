import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import logo from '../../assets/images/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-peacock-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="Hotel Chandamama"
                className="h-12 w-12 rounded-full ring-2 ring-peacock-400"
              />
              <div>
                <h3 className="text-xl font-display font-bold">
                  Hotel Chandamama
                </h3>
                <p className="text-xs text-gray-300">Pure Veg Restaurant</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Serving authentic vegetarian cuisine with love since establishment. 
              Experience the taste of tradition with modern hospitality.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-peacock-500 p-2 rounded-full transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-peacock-500 p-2 rounded-full transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-peacock-500 p-2 rounded-full transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-peacock-500 p-2 rounded-full transition-all duration-300"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Gallery', 'Catering', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                      className="text-gray-300 hover:text-peacock-400 transition-colors duration-300 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Morning Tiffins</li>
              <li>• Afternoon Meals</li>
              <li>• Evening Snacks</li>
              <li>• Tea & Coffee</li>
              <li>• Mocktails & Juices</li>
              <li>• Ice Creams</li>
              <li>• Catering Services</li>
              <li>• Bulk Orders</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-peacock-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  NRT Road, beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-peacock-400" />
                <a
                  href="tel:09989324091"
                  className="text-gray-300 hover:text-peacock-400 transition-colors"
                >
                  09989324091
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-peacock-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Catering & Functions:</p>
                  <p>9441128949</p>
                  <p>9703145416</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-peacock-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Open Daily<br />6:00 AM - 10:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Hotel Chandamama. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-peacock-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-peacock-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-peacock-400 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
