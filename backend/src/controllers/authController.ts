import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { sendSuccess, sendError } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { identifier, email, username, password } = req.body;
    const cred = identifier || email || username;

    if (!cred || !password) {
      sendError(res, "Email/Username and password are required.", 400);
      return;
    }

    const result = await AuthService.login(cred, password);
    if (!result) {
      sendError(res, "Invalid credentials.", 401);
      return;
    }

    sendSuccess(res, result);
  }

  static getMe(req: AuthenticatedRequest, res: Response): void {
    if (!req.user) {
      sendError(res, "Not authenticated", 401);
      return;
    }

    const user = AuthService.getMe(req.user.id);
    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }

    sendSuccess(res, user);
  }
}
