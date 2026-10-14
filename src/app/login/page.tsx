"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Languages,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Info,
} from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/student";
  const errorParam = searchParams.get("error");

  const { loginStudent } = useDemo();

  const [email, setEmail] = useState("vermaraj01110@gmail.com");
  const [password, setPassword] = useState("12345");
  const [errorMessage, setErrorMessage] = useState(
    errorParam === "role_mismatch"
      ? "You were redirected because that area is restricted to student accounts."
      : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemoCreds = () => {
    setEmail("vermaraj01110@gmail.com");
    setPassword("12345");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const res = await loginStudent(email, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Nav */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-[#0F1D38] text-white flex items-center justify-center shadow-md">
            <Languages className="w-5 h-5 text-[#E0C17E]" />
          </div>
          <span className="font-editorial text-2xl font-bold text-[#0F1D38]">
            ILI <span className="text-[#801D30]">Languages</span>
          </span>
        </Link>
        <h2 className="mt-4 font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
          Student Learning Portal
        </h2>
        <p className="mt-1 text-xs text-[#5C6479]">
          Access your recorded lectures, curriculum worksheets and practice quizzes
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-[#E8E2D8] space-y-6">
          {/* Quick Demo Credentials Box */}
          <div className="p-3.5 rounded-xl bg-[#FAF0F2] border border-[#F3CFD6] text-xs text-[#801D30]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Demo Student Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemoCreds}
                className="px-2 py-0.5 rounded bg-white font-semibold text-[11px] border border-[#F3CFD6] hover:bg-stone-50 cursor-pointer text-[#0F1D38]"
              >
                Auto-Fill
              </button>
            </div>
            <div className="space-y-0.5 text-[11px] font-mono">
              <div>Email: <strong>vermaraj01110@gmail.com</strong></div>
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
              label="Student Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vermaraj01110@gmail.com"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Student Portal
              </Button>
            </div>
          </form>

          {/* Explicit Demo Only Notice */}
          <div className="pt-4 border-t border-stone-100 flex items-start gap-2 text-[11px] text-stone-500">
            <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-tight">
              <strong>DEMO ONLY:</strong> Frontend simulated authentication. In production, this will be backed by server-validated credentials, bcrypt password hashing, secure HttpOnly session cookies, CSRF protection, and server-enforced API authorization.
            </p>
          </div>

          <div className="pt-2 text-center text-xs text-stone-500 space-y-2">
            <div>
              Staff or Administrator?{" "}
              <Link href="/admin/login" className="font-bold text-[#801D30] hover:underline">
                Enter Administrative Login &rarr;
              </Link>
            </div>
            <div>
              <Link href="/" className="hover:text-stone-700">
                &larr; Return to ILI Public Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
