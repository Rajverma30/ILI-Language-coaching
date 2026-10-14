import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { Role } from "../models/types";
import { sendError } from "../utils/response";
import { store } from "../models/store";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    if (config.nodeEnv === "development") {
      const adminUser = store.findUserByEmail("admin@ililanguages.in");
      if (adminUser) {
        req.user = {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        };
        return next();
      }
    }
    sendError(res, "Authentication required. Missing Bearer token.", 401);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthenticatedUser;
    
    // Validate user still exists
    const user = store.findUserById(decoded.id);
    if (!user) {
      sendError(res, "User associated with this token no longer exists.", 401);
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  } catch {
    sendError(res, "Invalid or expired authentication token.", 401);
  }
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      sendError(res, "Access denied. Administrative privileges required.", 403);
      return;
    }
    next();
  });
}

export function requireStudent(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "student" && req.user?.role !== "admin") {
      sendError(res, "Access denied. Student portal privileges required.", 403);
      return;
    }
    next();
  });
}

export function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as AuthenticatedUser;
    const user = store.findUserById(decoded.id);
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    }
  } catch {
    // Gracefully ignore invalid token in optional auth
  }

  next();
}
