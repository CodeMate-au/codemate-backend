import { Request, Response } from "express";
import {
  getProblems,
  getProblemById,
  submitSolution,
} from "../services/leetcode.services";

export const getLeetCodeProblems = async (req: Request, res: Response) => {
  try {
    const problems = await getProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch LeetCode problems" });
  }
};

export const getLeetCodeProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await getProblemById(id);
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch LeetCode problem" });
  }
};

export const submitLeetCodeSolution = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const result = await submitSolution(id, code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit solution to LeetCode" });
  }
};
