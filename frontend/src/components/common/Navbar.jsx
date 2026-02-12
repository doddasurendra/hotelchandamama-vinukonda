import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart, User } from 'lucide-react';
import logo from '../../assets/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/catering', label: 'Catering' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Hotel Chandamama Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-peacock-500 group-hover:ring-4 transition-all duration-300 shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-gradient">
                Hotel Chandamama
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Pure Veg Restaurant</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-peacock-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-peacock-50 hover:text-peacock-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:09989324091"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            <Link
              to="/order"
              className="flex items-center space-x-2 btn-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Order Now</span>
            </Link>
            <Link
              to="/auth"
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <User className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-peacock-500 text-white'
                      : 'text-gray-700 hover:bg-peacock-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-2">
                <a
                  href="tel:09989324091"
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 btn-primary w-full"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Order Now</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
