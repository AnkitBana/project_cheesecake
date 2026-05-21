// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'CUSTOMER' | 'ADMIN';
  isVerified: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: string;
  category?: Category;
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  dimensions?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 
  | 'PENDING'
  | 'PAID'
  | 'FAILED'
  | 'REFUNDED';

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddressId: string;
  billingAddressId: string;
  paymentMethod: string;
  notes?: string;
}

// Address types
export interface Address {
  id: string;
  userId: string;
  type: 'SHIPPING' | 'BILLING' | 'BOTH';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  user?: User;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Stripe types
export interface PaymentIntent {
  clientSecret: string;
  amount: number;
}

// Made with Bob
