import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createUser);
router.get("/", protect, authorize("admin", "manager"), getUsers);

export default router;