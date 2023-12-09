import axios from "axios";

export const getProblems = async (): Promise<any> => {
  // Implement logic to fetch problems from LeetCode API
  const response = await axios.get("https://leetcode.com/api/problems/all");
  return response.data;
};

export const getProblemById = async (id: string): Promise<any> => {
  // Implement logic to fetch a specific problem by ID from LeetCode API
  const response = await axios.get(`https://leetcode.com/api/problems/${id}`);
  return response.data;
};

export const submitSolution = async (
  id: string,
  code: string
): Promise<any> => {
  // Implement logic to submit a solution for a specific problem to LeetCode API
  const response = await axios.post(
    `https://leetcode.com/api/problems/${id}/submit`,
    { code }
  );
  return response.data;
};

// Add more methods as needed
