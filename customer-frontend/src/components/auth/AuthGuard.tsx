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
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (currentUser.role !== allowedRole) {
      router.replace(`/login?error=role_mismatch&redirect=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, isLoadingAuth, allowedRole, router, pathname]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-10 h-10 text-sky-600 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-500">Checking credentials & session...</p>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== allowedRole) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-600 mb-6">
          This section requires active student authorization. Redirecting to student login portal...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
