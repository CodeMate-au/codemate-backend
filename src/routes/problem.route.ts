import { Router } from "express";
import {
  getLeetCodeProblems,
  getLeetCodeProblemById,
  submitLeetCodeSolution,
} from "../controllers/problems.controller";

const router = Router();

router.get("/", getLeetCodeProblems);
router.get("/:id", getLeetCodeProblemById);
router.get("/:id/submit", submitLeetCodeSolution);
// router.post("/", problemController.createProduct);

export default router;
