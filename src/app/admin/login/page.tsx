"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  ArrowRight,
  Info,
  Building,
  Lock,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";
  const errorParam = searchParams.get("error");

  const { loginAdmin } = useDemo();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("12345");
  const [errorMessage, setErrorMessage] = useState(
    errorParam === "role_mismatch"
      ? "You were redirected because administrative privileges are required for that route."
      : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemoCreds = () => {
    setUsername("admin");
    setPassword("12345");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const res = await loginAdmin(username, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Administrative login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1325] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      {/* Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2E56] text-[#E0C17E] text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Restricted Administrative Access</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white">
          Institute Management Portal
        </h2>
        <p className="mt-1 text-xs text-stone-400">
          ILI Foreign Languages Institute &bull; Apollo Tower, Indore
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white text-[#0F1D38] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-stone-300 space-y-6">
          {/* Quick Demo Credentials Box */}
          <div className="p-3.5 rounded-xl bg-[#EEF2F8] border border-[#D2DCED] text-xs text-[#0F1D38]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold flex items-center gap-1.5 text-[#0F1D38]">
                <KeyRound className="w-3.5 h-3.5 text-[#801D30]" />
                <span>Demo Admin Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemoCreds}
                className="px-2 py-0.5 rounded bg-white font-semibold text-[11px] border border-stone-300 hover:bg-stone-50 cursor-pointer text-[#801D30]"
              >
                Auto-Fill
              </button>
            </div>
            <div className="space-y-0.5 text-[11px] font-mono">
              <div>Username: <strong>admin</strong></div>
              <div>Password: <strong>12345</strong></div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Username / Email"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />

            <Input
              label="Security Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="secondary"
                size="md"
                isLoading={isSubmitting}
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate & Enter Dashboard
              </Button>
            </div>
          </form>

          {/* Explicit Demo Security Note */}
          <div className="pt-4 border-t border-stone-100 flex items-start gap-2 text-[11px] text-stone-500">
            <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-tight">
              <strong>DEMO ONLY:</strong> Simulated fixed-credential authentication for architectural demonstration. Before production, this will be backed by server-validated credentials, password hashing, secure HttpOnly session cookies, CSRF protections and server-enforced authorization.
            </p>
          </div>

          <div className="pt-2 text-center text-xs text-stone-500 space-y-2">
            <div>
              Looking for student portal?{" "}
              <Link href="/login" className="font-bold text-[#0F1D38] hover:underline">
                Student Login &rarr;
              </Link>
            </div>
            <div>
              <Link href="/" className="hover:text-stone-700">
                &larr; Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
