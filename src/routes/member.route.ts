import { Router } from "express";
import membersController from "../controllers/members.controllers";
import isAuthorized from "../middleware/auth";

const router = Router();

// router.post("/register", authController.register);

router.get("/", isAuthorized, membersController.getAllMemberHandler);

// router.get("/logout", authController.logout);

export default router;
