import { Request, Response } from "express";
import { LeadService } from "../services/leadService";
import { UltraMsgService } from "../services/ultraMsgService";
import { sendSuccess, sendError } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth";

export class LeadController {
  static getAllLeads(_req: AuthenticatedRequest, res: Response): void {
    const leads = LeadService.getAllLeads();
    sendSuccess(res, leads);
  }

  static createLead(req: Request, res: Response): void {
    const { fullName, email, phone, courseInterest, preferredSlot, preferredContactMethod, message, source } = req.body;

    if (!fullName || !phone) {
      sendError(res, "Full name and phone number are required.", 400);
      return;
    }

    const cleanPhone = String(phone).trim();
    const cleanEmail = email && String(email).trim()
      ? String(email).trim()
      : `${cleanPhone.replace(/\D/g, "") || Date.now()}@lead.ili.in`;

    const newLead = LeadService.createLead({
      fullName: String(fullName).trim(),
      email: cleanEmail,
      phone: cleanPhone,
      courseInterest: courseInterest || "German A1: Complete Foundation for Beginners",
      preferredSlot: preferredSlot || "Flexible",
      preferredContactMethod: preferredContactMethod || "WhatsApp",
      message: message || "",
      source: source || "Website Form",
    });

    // 🚀 Instant WhatsApp Automation (Lead Welcome + Admin Alert dispatched in < 1 second, deduplicated)
    setImmediate(() => {
      UltraMsgService.processLeadNotification(newLead).catch((err) =>
        console.error("[UltraMsg] Error processing lead notifications:", err)
      );
    });

    sendSuccess(res, newLead, 201);
  }

  static updateLeadStatus(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!status) {
      sendError(res, "Status is required", 400);
      return;
    }

    const updated = LeadService.updateLeadStatus(id, status);
    if (!updated) {
      sendError(res, "Lead not found", 404);
      return;
    }

    sendSuccess(res, updated);
  }

  static addLeadNote(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    const { text, author } = req.body;

    if (!text) {
      sendError(res, "Note text is required", 400);
      return;
    }

    const updated = LeadService.addLeadNote(id, text, author || req.user?.name || "Admin Desk");
    if (!updated) {
      sendError(res, "Lead not found", 404);
      return;
    }

    sendSuccess(res, updated);
  }

  static deleteLead(req: AuthenticatedRequest, res: Response): void {
    const id = req.params.id as string;
    const deleted = LeadService.deleteLead(id);
    if (!deleted) {
      sendError(res, "Lead not found", 404);
      return;
    }
    sendSuccess(res, { message: "Lead successfully deleted", id });
  }

  static clearAllLeads(_req: AuthenticatedRequest, res: Response): void {
    LeadService.clearAllLeads();
    sendSuccess(res, { message: "All leads cleared successfully" });
  }
}
