import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/cart', label: 'Cart', badge: cartItemCount },
    ...(isAuthenticated
      ? [
          { path: '/orders', label: 'Orders' },
          { path: '/profile', label: 'Profile' },
        ]
      : [
          { path: '/login', label: 'Login' },
          { path: '/register', label: 'Sign Up' },
        ]),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                🍰
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                CheeseCake
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                Heaven in Every Bite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="absolute -top-2 -right-4 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                    {link.badge}
                  </span>
                )}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 animate-scale-in"></span>
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="font-medium">{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Made with Bob
