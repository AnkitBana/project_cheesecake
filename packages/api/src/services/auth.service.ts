import { prisma } from '@/config/database';
import { cacheService, cacheKeys } from '@/config/redis';
import { hashPassword, comparePassword, validatePasswordStrength } from '@/utils/password';
import { generateTokenPair, verifyRefreshToken } from '@/utils/jwt';
import {
  RegisterData,
  LoginCredentials,
  TokenPair,
  UnauthorizedError,
  ConflictError,
  ValidationError,
  NotFoundError,
} from '@/types';
import crypto from 'crypto';

export class AuthService {
  async register(data: RegisterData): Promise<{ user: any; tokens: TokenPair }> {
    // Validate password strength
    const passwordValidation = validatePasswordStrength(data.password);
    if (!passwordValidation.isValid) {
      throw new ValidationError('Password does not meet requirements', {
        password: passwordValidation.errors,
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        verificationToken,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // TODO: Send verification email
    // await emailService.sendVerificationEmail(user.email, verificationToken);

    return { user, tokens };
  }

  async login(credentials: LoginCredentials): Promise<{ user: any; tokens: TokenPair }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: credentials.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, tokens };
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Check if token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new UnauthorizedError('Refresh token expired');
    }

    // Generate new token pair
    const tokens = generateTokenPair({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    // Delete old refresh token and create new one (token rotation)
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: storedToken.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new NotFoundError('Invalid verification token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    // Clear user cache
    await cacheService.del(cacheKeys.user(user.id));
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    // TODO: Send password reset email
    // await emailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new NotFoundError('Invalid or expired reset token');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError('Password does not meet requirements', {
        password: passwordValidation.errors,
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    // Invalidate all refresh tokens
    await prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    // Clear user cache
    await cacheService.del(cacheKeys.user(user.id));
  }
}

export const authService = new AuthService();

// Made with Bob
