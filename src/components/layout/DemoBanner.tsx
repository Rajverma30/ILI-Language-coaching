"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Info, KeyRound, X, Check, RotateCcw } from "lucide-react";

export const DemoBanner: React.FC = () => {
  const { currentUser, resetDemoData, settings } = useDemo();
  const [showCreds, setShowCreds] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  if (!settings.bannerVisible) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <div className="bg-[#0F1D38] text-white border-b border-[#1E3156] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#801D30] text-white font-semibold text-[11px] tracking-wide uppercase">
              Interactive Demo
            </span>
            <span className="text-stone-300 hidden sm:inline">
              ILI Foreign Languages Institute — Apollo Tower, New Palasia, Indore
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreds(true)}
              className="inline-flex items-center gap-1.5 text-[#E0C17E] hover:text-white transition-colors cursor-pointer font-medium underline underline-offset-4"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Demo Login Credentials</span>
            </button>

            {currentUser && (
              <span className="hidden md:inline text-stone-300 border-l border-stone-700 pl-3">
                Active as <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
              </span>
            )}

            <button
              onClick={() => {
                if (confirm("Reset demo data (courses, leads, progress) back to initial seed?")) {
                  resetDemoData();
                }
              }}
              title="Reset Demo Data"
              className="hidden lg:inline-flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Demo Credentials */}
      {showCreds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0F1D38] rounded-xl max-w-lg w-full p-6 shadow-2xl border border-[#E8E2D8] relative">
            <button
              onClick={() => setShowCreds(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#0F1D38] transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF4E6] text-[#8C6D23] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">Demo Access Credentials</h3>
                <p className="text-xs text-[#5C6479]">Simulated evaluation accounts for testing the platform</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Student Card */}
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#801D30]">
                    Student Portal
                  </span>
                  <Link
                    href="/login"
                    onClick={() => setShowCreds(false)}
                    className="text-xs font-semibold text-[#0F1D38] hover:underline"
                  >
                    Go to /login &rarr;
                  </Link>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 bg-white px-2.5 rounded border border-stone-200">
                    <span className="text-stone-500">Email:</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-stone-900 font-semibold">vermaraj01110@gmail.com</code>
                      <button
                        onClick={() => copyToClipboard("vermaraj01110@gmail.com", "std-email")}
                        className="text-stone-400 hover:text-[#0F1D38]"
                      >
                        {copied === "std-email" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 bg-white px-2.5 rounded border border-stone-200">
                    <span className="text-stone-500">Password:</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-stone-900 font-semibold">12345</code>
                      <button
                        onClick={() => copyToClipboard("12345", "std-pass")}
                        className="text-stone-400 hover:text-[#0F1D38]"
                      >
                        {copied === "std-pass" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#5C6479] mt-2">
                  Redirects to <code className="bg-stone-200 px-1 py-0.5 rounded">/student</code>. Enrolled in German A1 & Business English.
                </p>
              </div>

              {/* Admin Card */}
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F1D38]">
                    Admin Portal
                  </span>
                  <Link
                    href="/admin/login"
                    onClick={() => setShowCreds(false)}
                    className="text-xs font-semibold text-[#801D30] hover:underline"
                  >
                    Go to /admin/login &rarr;
                  </Link>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-1 bg-white px-2.5 rounded border border-stone-200">
                    <span className="text-stone-500">Username:</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-stone-900 font-semibold">admin</code>
                      <button
                        onClick={() => copyToClipboard("admin", "adm-user")}
                        className="text-stone-400 hover:text-[#0F1D38]"
                      >
                        {copied === "adm-user" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1 bg-white px-2.5 rounded border border-stone-200">
                    <span className="text-stone-500">Password:</span>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-stone-900 font-semibold">12345</code>
                      <button
                        onClick={() => copyToClipboard("12345", "adm-pass")}
                        className="text-stone-400 hover:text-[#0F1D38]"
                      >
                        {copied === "adm-pass" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#5C6479] mt-2">
                  Redirects to <code className="bg-stone-200 px-1 py-0.5 rounded">/admin</code>. Access course manager, leads, orders & settings.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200 flex items-start gap-2 text-[11px] text-stone-500">
              <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Demo Mode Limitation:</strong> Authentications and modifications are stored locally in browser session storage. No live external database calls are initiated.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
