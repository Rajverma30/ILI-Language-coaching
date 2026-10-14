import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, unknown>;
}

export function sendSuccess<T>(res: Response, data: T, status: number = 200, meta?: Record<string, unknown>): Response {
  return res.status(status).json({
    success: true,
    data,
    meta,
  });
}

export function sendError(res: Response, error: string, status: number = 400): Response {
  return res.status(status).json({
    success: false,
    error,
  });
}
