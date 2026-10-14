import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Never expose raw stack traces in production
  const message = err.message || "Internal server error occurred";
  sendError(res, message, 500);
}
