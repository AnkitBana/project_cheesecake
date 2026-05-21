import { apiClient } from './client';
import { 
  User, 
  AuthTokens, 
  LoginCredentials, 
  RegisterData,
  ApiResponse 
} from '@/types';

export const authApi = {
  // Register new user
  register: async (data: RegisterData) => {
    const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/register',
      data
    );
    return response.data.data!;
  },

  // Login user
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/login',
      credentials
    );
    return response.data.data!;
  },

  // Refresh access token
  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post<ApiResponse<{ tokens: AuthTokens }>>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data.data!.tokens;
  },

  // Logout user
  logout: async (refreshToken: string) => {
    const response = await apiClient.post<ApiResponse>(
      '/auth/logout',
      { refreshToken }
    );
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      '/auth/profile'
    );
    return response.data.data!.user;
  },

  // Verify email
  verifyEmail: async (token: string) => {
    const response = await apiClient.get<ApiResponse>(
      `/auth/verify-email/${token}`
    );
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email: string) => {
    const response = await apiClient.post<ApiResponse>(
      '/auth/request-password-reset',
      { email }
    );
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, password: string) => {
    const response = await apiClient.post<ApiResponse>(
      `/auth/reset-password/${token}`,
      { password }
    );
    return response.data;
  },
};

// Made with Bob
