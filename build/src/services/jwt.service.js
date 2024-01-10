"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const verifyToken = (token) => {
    // console.log("verifyToken", token);
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (err) {
        console.log("jwt error or expired", err);
        return err;
    }
};
exports.verifyToken = verifyToken;
const createToken = (userId) => {
    // console.log("jwt_secret", JWT_SECRET);
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: "1hr",
    });
};
exports.createToken = createToken;
