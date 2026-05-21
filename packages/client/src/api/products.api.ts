import { apiClient } from './client';
import { Product, ProductFilters, ApiResponse, PaginatedResponse } from '@/types';

export const productsApi = {
  // Get all products with filters
  getProducts: async (filters?: ProductFilters) => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
      params: filters,
    });
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data!;
  },

  // Get product by slug
  getProductBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
    return response.data.data!;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/featured');
    return response.data.data!;
  },

  // Search products
  searchProducts: async (query: string) => {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products/search', {
      params: { q: query },
    });
    return response.data;
  },
};

// Made with Bob
