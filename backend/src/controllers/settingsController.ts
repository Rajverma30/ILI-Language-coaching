import { Request, Response } from "express";
import { SettingsService } from "../services/settingsService";
import { sendSuccess } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth";

export class SettingsController {
  static getSettings(_req: Request, res: Response): void {
    const settings = SettingsService.getSettings();
    sendSuccess(res, settings);
  }

  static updateSettings(req: AuthenticatedRequest, res: Response): void {
    const updates = req.body;
    const updated = SettingsService.updateSettings(updates);
    sendSuccess(res, updated);
  }
}
