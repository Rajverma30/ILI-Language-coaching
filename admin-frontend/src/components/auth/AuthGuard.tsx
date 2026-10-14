"use client";

import React from "react";
import { AdminAuthGuard } from "./AdminAuthGuard";

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  allowedRole?: "admin" | "student";
}> = ({ children }) => {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
};
