// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    // Ensure the name of this error is the same as the class name
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;

    // Capture the stack trace (optional)
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    const { statusCode, message, details } = err;
    return res.status(statusCode).json({
      status: 'error',
      message,
      ...(details && { details }),
    });
  }

  // Handle unknown errors
  console.error('Unhandled error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
  });
};
