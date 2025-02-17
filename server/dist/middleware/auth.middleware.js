"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.checkRole = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))
            ? authHeader.split(' ')[1]
            : null;
        if (!token) {
            throw new error_middleware_1.AppError(401, 'Authentication required: Token is missing');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
            throw new error_middleware_1.AppError(401, 'Invalid token: Missing required fields');
        }
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new error_middleware_1.AppError(401, 'Invalid or expired token'));
        }
        else {
            next(error);
        }
    }
});
exports.auth = auth;
const checkRole = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new error_middleware_1.AppError(401, 'Authentication required');
            }
            if (!roles.includes(req.user.role)) {
                throw new error_middleware_1.AppError(403, 'Insufficient permissions');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.checkRole = checkRole;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });
            if (error) {
                const errors = error.details.map((detail) => ({
                    field: detail.path[0],
                    message: detail.message,
                }));
                throw new error_middleware_1.AppError(400, 'Validation error', errors);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=auth.middleware.js.map