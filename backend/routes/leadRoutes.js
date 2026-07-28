import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createLead, getLeadById, getLeads, updateLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.patch("/:id", protect, authorize("admin", "manager"), updateLead);

export default router;