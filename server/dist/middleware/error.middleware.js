"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        const { statusCode, message, details } = err;
        return res.status(statusCode).json(Object.assign({ status: 'error', message }, (details && { details })));
    }
    console.error('Unhandled error:', err);
    return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map