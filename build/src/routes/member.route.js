"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const members_controllers_1 = __importDefault(require("../controllers/members.controllers"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// router.post("/register", authController.register);
router.get("/", auth_1.default, members_controllers_1.default.getAllMemberHandler);
// router.get("/logout", authController.logout);
exports.default = router;
