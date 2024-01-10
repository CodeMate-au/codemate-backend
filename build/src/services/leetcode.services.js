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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSolution = exports.getProblemById = exports.getProblems = void 0;
const axios_1 = __importDefault(require("axios"));
const getProblems = () => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to fetch problems from LeetCode API
    const response = yield axios_1.default.get("https://leetcode.com/api/problems/all");
    return response.data;
});
exports.getProblems = getProblems;
const getProblemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to fetch a specific problem by ID from LeetCode API
    const response = yield axios_1.default.get(`https://leetcode.com/api/problems/${id}`);
    return response.data;
});
exports.getProblemById = getProblemById;
const submitSolution = (id, code) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to submit a solution for a specific problem to LeetCode API
    const response = yield axios_1.default.post(`https://leetcode.com/api/problems/${id}/submit`, { code });
    return response.data;
});
exports.submitSolution = submitSolution;
// Add more methods as needed
