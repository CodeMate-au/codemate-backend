"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_service_1 = require("../services/jwt.service");
const isAuthorized = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["session-token"]; // Assuming token is stored in a cookie named 'session-token'
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify the token
        const decoded = (0, jwt_service_1.verifyToken)(token); // Replace JWT_SECRET with your secret key
        // console.log("decoded here", decoded);
        if (decoded instanceof Error) {
            // console.log("here", decoded);
            return res.status(401).json({ decoded });
        }
        const userId = decoded.userId;
        if (!userId) {
            throw "Invalid user ID";
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log("error handler", error);
        return res.status(500).json({ message: "Authorization error" });
    }
};
exports.default = isAuthorized;
