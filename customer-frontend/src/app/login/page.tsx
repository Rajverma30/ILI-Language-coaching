"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDemo } from "@/context/DemoContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Languages,
  ShieldAlert,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/student";
  const errorParam = searchParams.get("error");

  const { loginStudent } = useDemo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    errorParam === "role_mismatch"
      ? "You were redirected because that area is restricted to student accounts."
      : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const res = await loginStudent(email, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setErrorMessage(res.error || "Authentication failed. Please verify your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Identity Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md group-hover:bg-sky-700 transition-colors">
            <Languages className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">
            ILI <span className="text-sky-600">Languages</span>
          </span>
        </Link>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider border border-sky-100">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student Portal</span>
        </div>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
          Sign in to your learning account
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Access your enrolled language lectures, grammar notes, and practice quizzes
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg rounded-2xl border border-slate-200 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Student Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
            />

            <Input
              label="Password"
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
                Sign In to Student Portal
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <div>
              <Link href="/" className="hover:text-sky-600 transition-colors">
                &larr; Return to ILI Public Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
