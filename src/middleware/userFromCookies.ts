import { Request, Response } from "express";
import { verifyToken } from "../services/jwt.service";

export const getUserFromCookies = (req: Request, res: Response) => {
  const token = req.cookies?.["session-token"]; // Assuming token is stored in a cookie named 'token'
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  const decoded = verifyToken(token); // Replace JWT_SECRET with your secret key
  // console.log("decoded here", decoded);
  if (decoded instanceof Error) {
    console.log("token error here", decoded);
    return res.status(401).json({ decoded });
  }

  if (!decoded.userId) {
    return res.status(401).json({ message: "No token provided" });
  } // Ensure your token payload has the 'id' field
  return decoded.userId;
};
