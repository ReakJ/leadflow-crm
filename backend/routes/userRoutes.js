import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createUser, getUserById, getUsers, updateUserStatus } from "../controllers/userController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createUser);

router.get("/", protect, authorize("admin", "manager"), getUsers);
router.get("/:id", protect, authorize("admin", "manager"), getUserById);

router.patch("/:id/status", protect, authorize("admin", "manager"), updateUserStatus);

export default router;