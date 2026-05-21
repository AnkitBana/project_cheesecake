import { Router } from 'express';
import { authController } from '@/controllers/auth.controller';
import { validate } from '@/middleware/validate';
import { authenticate } from '@/middleware/auth';
import { authLimiter } from '@/middleware/rateLimiter';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  verifyEmailSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '@/validators/auth.validator';

const router = Router();

// Public routes
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  '/refresh',
  validate(refreshTokenSchema),
  authController.refreshToken.bind(authController)
);

router.post(
  '/logout',
  validate(refreshTokenSchema),
  authController.logout.bind(authController)
);

router.get(
  '/verify-email/:token',
  validate(verifyEmailSchema),
  authController.verifyEmail.bind(authController)
);

router.post(
  '/request-password-reset',
  authLimiter,
  validate(requestPasswordResetSchema),
  authController.requestPasswordReset.bind(authController)
);

router.post(
  '/reset-password/:token',
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController)
);

// Protected routes
router.get(
  '/profile',
  authenticate,
  authController.getProfile.bind(authController)
);

export default router;

// Made with Bob
