import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '@/config/env';
import { logger } from '@/config/logger';
import { generalLimiter } from '@/middleware/rateLimiter';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import routes from '@/routes';

export const createApp = (): Application => {
  const app = express();

  // Security middleware
  app.use(helmet());
  
  // CORS configuration
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Rate limiting
  app.use(generalLimiter);

  // Request logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('HTTP Request', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
      });
    });
    next();
  });

  // API routes
  app.use('/api', routes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Cheesecake E-Commerce API',
      version: '1.0.0',
      documentation: '/api/docs',
    });
  });

  // Error handlers (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

// Made with Bob
