"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_controller_1 = __importDefault(require("../controllers/rooms.controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, rooms_controller_1.default.getRoomsHandler);
router.get("/:room_id", auth_1.default, rooms_controller_1.default.getRoomHandler);
router.post("/", auth_1.default, rooms_controller_1.default.createRoomHandler);
router.put("/:room_id", auth_1.default, rooms_controller_1.default.updateRoomMembersHandler);
router.delete("/:room_id", auth_1.default, rooms_controller_1.default.deleteRoomHandler);
exports.default = router;
