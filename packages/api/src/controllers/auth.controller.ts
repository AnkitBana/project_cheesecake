import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/types';
import { authService } from '@/services/auth.service';
import { sendSuccess } from '@/utils/response';

export class AuthController {
  async register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      sendSuccess(res, result, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      sendSuccess(res, { tokens }, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      sendSuccess(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.params;
      await authService.verifyEmail(token);
      sendSuccess(res, null, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }

  async requestPasswordReset(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await authService.requestPasswordReset(email);
      sendSuccess(res, null, 'Password reset email sent');
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = req.params;
      const { password } = req.body;
      await authService.resetPassword(token, password);
      sendSuccess(res, null, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      // User is already attached by auth middleware
      sendSuccess(res, { user: req.user });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

// Made with Bob
