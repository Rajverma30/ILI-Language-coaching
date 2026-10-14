"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";
  const errorParam = searchParams.get("error");

  const { loginAdmin } = useDemo();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    errorParam === "role_mismatch"
      ? "Administrative privileges required to access that section."
      : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const res = await loginAdmin(username, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Administrative authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      {/* Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/70 text-sky-300 border border-sky-500/30 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Restricted Management Desk</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          ILI Administrative Console
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          ILI Foreign Languages Institute &bull; Apollo Tower, Indore
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white text-slate-900 py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Staff Authentication</h2>
              <p className="text-[11px] text-slate-500">Sign in to manage courses, students & admissions</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Administrative Username or Email"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />

            <Input
              label="Security Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate & Access Console
              </Button>
            </div>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
            <span>Secure internal workstation access &bull; Session encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
