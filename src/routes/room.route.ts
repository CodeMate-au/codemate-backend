import { Router } from "express";
import roomController from "../controllers/rooms.controller";
import isAuthorized from "../middleware/auth";

const router = Router();

router.get("/", isAuthorized, roomController.getRoomsHandler);
router.get("/:room_id", isAuthorized, roomController.getRoomHandler);
router.post("/", isAuthorized, roomController.createRoomHandler);
router.put("/:room_id", isAuthorized, roomController.updateRoomMembersHandler);
router.delete("/:room_id", isAuthorized, roomController.deleteRoomHandler);

export default router;
