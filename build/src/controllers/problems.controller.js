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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLeetCodeSolution = exports.getLeetCodeProblemById = exports.getLeetCodeProblems = void 0;
const leetcode_services_1 = require("../services/leetcode.services");
const getLeetCodeProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield (0, leetcode_services_1.getProblems)();
        res.json(problems);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch LeetCode problems" });
    }
});
exports.getLeetCodeProblems = getLeetCodeProblems;
const getLeetCodeProblemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const problem = yield (0, leetcode_services_1.getProblemById)(id);
        res.json(problem);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch LeetCode problem" });
    }
});
exports.getLeetCodeProblemById = getLeetCodeProblemById;
const submitLeetCodeSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code } = req.body;
        const result = yield (0, leetcode_services_1.submitSolution)(id, code);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to submit solution to LeetCode" });
    }
});
exports.submitLeetCodeSolution = submitLeetCodeSolution;
