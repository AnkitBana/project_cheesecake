import React from 'react';
import { Product, toApiProduct } from '../data/products';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const apiProduct = toApiProduct(product);
    addItem(apiProduct, 1);
    onAddToCart?.(product);
  };

  return (
    <div className="card card-hover animate-fade-in group relative overflow-hidden">
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
      
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {product.featured && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-primary animate-bounce-in">Featured</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="badge badge-error text-base px-4 py-2">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
          <span className="badge bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shrink-0">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="btn btn-primary btn-sm"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Made with Bob
