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
const prisma_1 = __importDefault(require("../prisma"));
const jwt_service_1 = require("../services/jwt.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const getUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as a Bearer token
        // console.log("cookies here", req.cookies);
        // const userId = getUserFromCookies(req, res);
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["session-token"]; // Assuming token is stored in a cookie named 'token'
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
        // if (userId instanceof response) {
        //   return userId;
        // }
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        // console.log("user error handler", error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = { getUserHandler };
