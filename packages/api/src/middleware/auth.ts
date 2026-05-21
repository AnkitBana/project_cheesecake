import { Response, NextFunction } from 'express';
import { AuthRequest, UnauthorizedError, ForbiddenError } from '@/types';
import { verifyAccessToken } from '@/utils/jwt';
import { prisma } from '@/config/database';

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, isVerified: true },
    });

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isVerified) {
      throw new UnauthorizedError('Please verify your email');
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, role: true },
      });

      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Made with Bob
