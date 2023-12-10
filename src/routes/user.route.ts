import { Router } from "express";
import userController from "../controllers/users.controller";

const router = Router();

// router.post("/register", authController.register);

router.get("/", userController.getUserHandler);

// router.get("/logout", authController.logout);

export default router;
