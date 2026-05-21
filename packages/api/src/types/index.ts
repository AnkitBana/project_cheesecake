import { Request } from 'express';
import { User } from '@prisma/client';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
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

// JWT Payload
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

// Auth types
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

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Product types
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface ProductCreateData {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  categoryId: string;
  images?: string[];
  weight?: number;
  dimensions?: Record<string, any>;
  metadata?: Record<string, any>;
}

// Order types
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

export interface OrderCalculation {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

// Cart types
export interface CartItemData {
  productId: string;
  quantity: number;
}

// Address types
export interface AddressData {
  type: 'SHIPPING' | 'BILLING' | 'BOTH';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

// Review types
export interface ReviewData {
  productId: string;
  rating: number;
  title?: string;
  comment: string;
}

// Stripe types
export interface CreatePaymentIntentData {
  orderId: string;
  amount: number;
}

// Error types
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors?: Record<string, string[]>) {
    super(400, message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(409, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

// Made with Bob
