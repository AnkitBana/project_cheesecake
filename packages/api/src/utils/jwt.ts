import jwt from 'jsonwebtoken';
import { config } from '@/config/env';
import { JwtPayload, TokenPair } from '@/types';

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

export const generateTokenPair = (payload: JwtPayload): TokenPair => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// Made with Bob
