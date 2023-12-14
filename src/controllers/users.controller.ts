import { Request, Response } from "express";
import prisma from "../prisma";
import { verifyToken } from "../services/jwt.service";

const getUserHandler = async (req: Request, res: Response) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as a Bearer token
    // console.log("cookies here", req.cookies);
    const token = req.cookies?.["session-token"]; // Assuming token is stored in a cookie named 'token'
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = verifyToken(token); // Replace JWT_SECRET with your secret key
    // console.log("decoded here", decoded);
    if (decoded instanceof Error) {
      return res.status(401).json({ decoded });
    }

    const userId = decoded.userId; // Ensure your token payload has the 'id' field

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default { getUserHandler };
