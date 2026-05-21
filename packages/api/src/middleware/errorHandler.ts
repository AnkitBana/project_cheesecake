import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '@/types';
import { logger } from '@/config/logger';
import { config } from '@/config/env';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // Zod validation errors
  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });

    res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    });
    return;
  }

  // Custom application errors
  if (error instanceof AppError) {
    const response: any = {
      success: false,
      error: error.message,
    };

    if (error instanceof ValidationError && error.errors) {
      response.errors = error.errors;
    }

    res.status(error.statusCode).json(response);
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'Token expired',
    });
    return;
  }

  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    
    if (prismaError.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: 'Resource already exists',
      });
      return;
    }

    if (prismaError.code === 'P2025') {
      res.status(404).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
  }

  // Default error
  res.status(500).json({
    success: false,
    error: config.isDevelopment ? error.message : 'Internal server error',
    ...(config.isDevelopment && { stack: error.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
  });
};

// Made with Bob
