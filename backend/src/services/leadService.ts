import { store } from "../models/store";
import { Lead, LeadStatus } from "../models/types";

export class LeadService {
  static getAllLeads(): Lead[] {
    return store.getAllLeads();
  }

  static getLeadById(id: string): Lead | undefined {
    return store.getLeadById(id);
  }

  static createLead(
    leadData: Omit<Lead, "id" | "notes" | "status" | "createdAt">
  ): Lead {
    return store.createLead(leadData);
  }

  static updateLeadStatus(id: string, status: LeadStatus): Lead | undefined {
    return store.updateLeadStatus(id, status);
  }

  static addLeadNote(id: string, text: string, author?: string): Lead | undefined {
    return store.addLeadNote(id, text, author);
  }

  static deleteLead(id: string): boolean {
    return store.deleteLead(id);
  }

  static clearAllLeads(): void {
    store.clearAllLeads();
  }
}

