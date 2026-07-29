import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { addNote, assignLead, changeLeadStatus, createLead, deleteLead, getLeadById, getLeads, restoreLead, updateLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);

router.patch("/:id/details", protect, authorize("admin", "manager"), updateLead);
router.patch("/:id/assign", protect, authorize("admin", "manager"), assignLead);
router.patch("/:id/status", protect, changeLeadStatus);
router.post("/:id/notes", protect, addNote);

router.delete("/:id", protect, authorize("admin", "manager"), deleteLead);

router.patch("/:id/restore", protect, authorize("admin", "manager"), restoreLead);

export default router;