import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    image: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Absolutely divine! The New York cheesecake is the best I\'ve ever tasted. Creamy, rich, and perfectly balanced. I order from here every week!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Restaurant Owner',
    image: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    text: 'We serve these cheesecakes at our restaurant and our customers can\'t get enough. The quality is consistently excellent and delivery is always on time.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Planner',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Perfect for events! I\'ve ordered multiple times for corporate events and weddings. Everyone always asks where the cheesecakes are from. Highly recommend!',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Home Baker',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'As someone who bakes, I can appreciate the craftsmanship. These cheesecakes are made with love and expertise. The chocolate truffle is my absolute favorite!',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Dessert Enthusiast',
    image: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'I\'ve tried cheesecakes from all over the country, and these are hands down the best. The strawberry swirl is like heaven in every bite!',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Coffee Shop Owner',
    image: 'https://i.pravatar.cc/150?img=14',
    rating: 5,
    text: 'We pair these cheesecakes with our specialty coffees and the combination is unbeatable. Our customers love them and so do we!',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers!
          </p>
        </div>

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="card card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <div className="text-primary-500 dark:text-primary-400 mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500 dark:ring-primary-400"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-700 dark:text-gray-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-primary-500 dark:bg-primary-400'
                      : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-700 dark:text-gray-300"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-2">💬</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">2,500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-2">😊</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-2">🔄</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Repeat Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Made with Bob
