import { Router } from "express";
import { LeadController } from "../controllers/leadController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// Public: Contact & Demo registration submissions
router.post("/", LeadController.createLead);

// Admin protected: Leads management desk
router.get("/", requireAdmin, LeadController.getAllLeads);
router.patch("/:id/status", requireAdmin, LeadController.updateLeadStatus);
router.post("/:id/notes", requireAdmin, LeadController.addLeadNote);
router.delete("/clear-all", requireAdmin, LeadController.clearAllLeads);
router.delete("/:id", requireAdmin, LeadController.deleteLead);

export default router;
