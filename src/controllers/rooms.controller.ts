import { Request, Response } from "express";
import prisma from "../prisma";
import { verifyToken } from "../services/jwt.service";

const getRoomsHandler = async (req: Request, res: Response) => {
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

    const rooms = await prisma.room.findMany({
      include: {
        members: {
          where: {
            id: userId,
          },
        },
      },
    });

    if (!rooms) {
      return res.status(404).json({ message: "Rooms not found" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.log("rooms error handler", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const getRoomHandler = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.room_id);
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        members: true,
      },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.log("room error handler", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const createRoomHandler = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const room = await prisma.room.create({
      data: {
        name: req.body.name,
        members: {
          connect: {
            id: Number(req.body.userId),
          },
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(room);
  } catch (error) {
    console.log("room error handler", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateRoomMembersHandler = async (req: Request, res: Response) => {
  try {
    const room = await prisma.room.update({
      where: {
        id: Number(req.body.roomId),
      },
      data: {
        members: {
          connect: {
            id: Number(req.body.userId),
          },
        },
      },
    });

    res.status(200).json(room);
  } catch (error) {
    console.log("room error handler", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRoomHandler = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.room_id);
    const disconnectRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        members: {
          set: [],
        },
      },
    });
    const deletedDisconnectedRoom = await prisma.room.delete({
      where: {
        id: disconnectRoom.id,
      },
    });

    res.status(200).json(deletedDisconnectedRoom);
  } catch (error) {
    console.log("room error handler", error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getRoomsHandler,
  getRoomHandler,
  createRoomHandler,
  updateRoomMembersHandler,
  deleteRoomHandler,
};
