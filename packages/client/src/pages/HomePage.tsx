import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { sampleProducts, Product } from '../data/products';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Testimonials } from '../components/Testimonials';
import { ScrollToTop } from '../components/ScrollToTop';

const HomePage = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 6);

  const handleAddToCart = (product: Product) => {
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {notification}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Heavenly Cheesecakes
              <span className="block text-primary-600 dark:text-primary-400 mt-2">
                Delivered to Your Door
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Indulge in our handcrafted, premium cheesecakes made with the finest ingredients. 
              Each slice is a piece of heaven!
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <a href="/products" className="btn btn-primary btn-lg">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop All Cheesecakes
              </a>
              <a href="#featured" className="btn btn-outline btn-lg">
                View Featured
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card card-hover text-center animate-slide-in-left">
              <div className="text-5xl mb-4">🍰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Made with the finest ingredients for the perfect taste and texture
              </p>
            </div>
            
            <div className="card card-hover text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fresh cheesecakes delivered right to your doorstep within 24 hours
              </p>
            </div>
            
            <div className="card card-hover text-center animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% satisfaction or your money back - we stand by our quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Featured Cheesecakes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our most popular and beloved cheesecakes, handpicked just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <a href="/products" className="btn btn-primary btn-lg">
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800 text-white transition-colors duration-300">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Cheesecake Varieties</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Ready to Experience Heaven?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of satisfied customers and treat yourself to our premium cheesecakes today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/register" className="btn btn-primary btn-lg">
                Create Account
              </a>
              <a href="/products" className="btn btn-secondary btn-lg">
                Browse Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default HomePage;

// Made with Bob
