import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hotel Chandamama</h3>
            <p className="text-gray-400 mb-4">
              Serving delicious South Indian cuisine with love and tradition since years.
            </p>
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-12 w-12" />
              <span className="text-secondary font-semibold">Tasty Food Basket</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/catering" className="text-gray-400 hover:text-white transition-colors">
                  Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Vinukonda, Andhra Pradesh</li>
              <li>📞 <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
              <li>✉️ info@hotelchandamama.com</li>
              <li>🕒 7:00 AM - 10:00 PM</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>7 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>7 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>7 AM - 10 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Hotel Chandamama. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ for delicious food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
