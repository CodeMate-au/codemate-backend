import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// router.post("/register", authController.register);
router.get("/login", authController.login);
// router.get("/logout", authController.logout);

export default router;
