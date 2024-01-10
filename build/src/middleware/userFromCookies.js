"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromCookies = void 0;
const jwt_service_1 = require("../services/jwt.service");
const getUserFromCookies = (req, res) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["session-token"]; // Assuming token is stored in a cookie named 'token'
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Verify the token
    const decoded = (0, jwt_service_1.verifyToken)(token); // Replace JWT_SECRET with your secret key
    // console.log("decoded here", decoded);
    if (decoded instanceof Error) {
        // console.log("token error here", decoded);
        return res.status(401).json({ decoded });
    }
    if (!decoded.userId) {
        return res.status(401).json({ message: "No token provided" });
    } // Ensure your token payload has the 'id' field
    return decoded.userId;
};
exports.getUserFromCookies = getUserFromCookies;
