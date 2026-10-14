"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Role } from "@/types";
import { ShieldAlert, Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRole }) => {
  const { currentUser, isLoadingAuth } = useDemo();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoadingAuth) return;

    if (!currentUser) {
      if (allowedRole === "admin") {
        router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    if (currentUser.role !== allowedRole) {
      if (allowedRole === "admin") {
        router.replace(`/admin/login?error=role_mismatch&redirect=${encodeURIComponent(pathname)}`);
      } else {
        router.replace(`/login?error=role_mismatch&redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [currentUser, isLoadingAuth, allowedRole, router, pathname]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-10 h-10 text-[#801D30] animate-spin mb-4" />
        <p className="text-sm font-medium text-[#5C6479]">Checking demo credentials & session...</p>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== allowedRole) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <div className="w-14 h-14 bg-red-50 text-[#801D30] rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold font-editorial text-[#0F1D38] mb-2">Access Restricted</h2>
        <p className="text-sm text-[#5C6479] mb-6">
          This section requires active {allowedRole === "admin" ? "administrative" : "student"} authorization. Redirecting to appropriate login portal...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
