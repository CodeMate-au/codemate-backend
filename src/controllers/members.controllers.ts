import { Request, Response, response } from "express";
import prisma from "../prisma";

const getAllMemberHandler = async (req: Request, res: Response) => {
  try {
    // console.log("get all member handler");
    const members = await prisma.user.findMany({});

    if (!members) {
      return res.status(404).json({ message: "No members" });
    }

    res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default { getAllMemberHandler };
