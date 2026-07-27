import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createLead);

export default router;