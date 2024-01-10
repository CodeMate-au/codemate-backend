"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
// router.post("/register", authController.register);
router.get("/github/redirect", auth_controller_1.default.githubRedirectHandler);
router.get("/github/login", auth_controller_1.default.githubLoginHandler);
// router.get("/logout", authController.logout);
exports.default = router;
