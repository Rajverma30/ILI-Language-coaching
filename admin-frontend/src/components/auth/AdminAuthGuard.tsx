"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { Loader2 } from "lucide-react";

export const AdminAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isLoadingAuth } = useAdmin();

  useEffect(() => {
    if (!isLoadingAuth) {
      if (!currentUser) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (currentUser.role !== "admin") {
        router.push("/login?error=role_mismatch");
      }
    }
  }, [currentUser, isLoadingAuth, router, pathname]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans">
        <Loader2 className="w-8 h-8 text-sky-500 animate-spin mb-3" />
        <p className="text-xs text-slate-300 font-medium">Validating administrative privileges...</p>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return null;
  }

  return <>{children}</>;
};
