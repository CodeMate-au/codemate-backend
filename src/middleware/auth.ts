import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.["session-token"]; // Assuming token is stored in a cookie named 'token'
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // Verify the token
    const decoded = verifyToken(token); // Replace JWT_SECRET with your secret key
    // console.log("decoded here", decoded);
    if (decoded instanceof Error) {
      console.log("here", decoded);
      return res.status(401).json({ decoded });
    }
    const userId = decoded.userId;

    if (!userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    console.log("error handler", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuthorized;
