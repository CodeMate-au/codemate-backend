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
const prisma_1 = __importDefault(require("../prisma"));
const jwt_service_1 = require("../services/jwt.service");
const getRoomsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["session-token"]; // Assuming token is stored in a cookie named 'token'
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify the token
        const decoded = (0, jwt_service_1.verifyToken)(token); // Replace JWT_SECRET with your secret key
        // console.log("decoded here", decoded);
        if (decoded instanceof Error) {
            // console.log("here", decoded);
            return res.status(401).json({ decoded });
        }
        const userId = decoded.userId;
        const rooms = yield prisma_1.default.room.findMany({
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
    }
    catch (error) {
        console.log("rooms error handler", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const getRoomHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = Number(req.params.room_id);
        // console.log("roomId", roomId);
        const room = yield prisma_1.default.room.findUnique({
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
    }
    catch (error) {
        console.log("room error handler", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const createRoomHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("req.body", req.body);
        const room = yield prisma_1.default.room.create({
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
    }
    catch (error) {
        console.log("room error handler", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const updateRoomMembersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("updateRoomMembersHandler", req.params, req.body);
        // console.log("req.body", req.body.user_id);
        const room = yield prisma_1.default.room.update({
            where: {
                id: Number(req.params.room_id),
            },
            data: {
                members: {
                    connect: [
                        {
                            id: Number(req.body.user_id),
                        },
                    ],
                },
            },
        });
        res.status(200).json(room);
    }
    catch (error) {
        console.log("room error handler", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const deleteRoomHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.params", req.params);
    try {
        const roomId = Number(req.params.room_id);
        const disconnectRoom = yield prisma_1.default.room.update({
            where: {
                id: roomId,
            },
            data: {
                members: {
                    set: [],
                },
            },
        });
        const deletedDisconnectedRoom = yield prisma_1.default.room.delete({
            where: {
                id: disconnectRoom.id,
            },
        });
        res.status(200).json(deletedDisconnectedRoom);
    }
    catch (error) {
        console.log("room error handler", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = {
    getRoomsHandler,
    getRoomHandler,
    createRoomHandler,
    updateRoomMembersHandler,
    deleteRoomHandler,
};
