// server/middleware/rbacMiddleware.js

/**
 * Middleware for role-based access control (RBAC).
 * @param {string} requiredRole - Role required to access the route.
 */
const rbacMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Assuming user role is attached to the request
        if (!userRole || userRole !== requiredRole) {
            return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
        }
        next();
    };
};

module.exports = rbacMiddleware;
