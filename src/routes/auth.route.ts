import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// router.post("/register", authController.register);
router.get("/github/redirect", authController.githubRedirectHandler);

router.get("/github/login", authController.githubLoginHandler);

// router.get("/logout", authController.logout);

export default router;
