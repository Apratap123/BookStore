const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        // Get token from Cookies or Authorization Header
        let token = req.cookies.token || req.headers.authorization;

        // If token is in header, extract it (format: "Bearer <token>")
        if (token && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Store user data in request object
        req.user = {
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};

module.exports = isAuthenticated;
