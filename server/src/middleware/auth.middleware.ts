// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import { User } from '../types';

// Extend Express Request to include the user object
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Interface for the JWT payload
interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

// Middleware to authenticate users
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      throw new AppError(401, 'Authentication required: Token is missing');
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // Validate the decoded token structure
    if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
      throw new AppError(401, 'Invalid token: Missing required fields');
    }

    // Attach user information to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role as User['role'],
    } as User;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, 'Invalid or expired token'));
    } else {
      next(error);
    }
  }
};

// Middleware to check user roles
export const checkRole = (...roles: User['role'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError(401, 'Authentication required');
      }

      if (!roles.includes(req.user.role)) {
        throw new AppError(403, 'Insufficient permissions');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to validate incoming requests against a Joi schema
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail: any) => ({
          field: detail.path[0],
          message: detail.message,
        }));
        throw new AppError(400, 'Validation error', errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
