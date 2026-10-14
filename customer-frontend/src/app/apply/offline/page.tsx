"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { OfflineLeadForm } from "@/components/forms/OfflineLeadForm";
import { Laptop, Building2 } from "lucide-react";

export default function OfflineApplyPage() {
  return (
    <div className="min-h-screen bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-4 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-sky-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
      </div>

      {/* Top Format Switch Bar */}
      <div className="mb-3 flex items-center gap-2 bg-white/10 p-1 rounded-2xl border border-white/10 text-xs">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold shadow-xs">
          <Building2 className="w-3.5 h-3.5" />
          <span>Indore Apollo Tower (Classroom)</span>
        </span>

        <Link
          href="/apply/online"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium"
        >
          <Laptop className="w-3.5 h-3.5 text-indigo-400" />
          <span>Switch to Live Online Form &rarr;</span>
        </Link>
      </div>

      {/* Centered Form */}
      <div className="w-full max-w-lg my-auto py-2">
        <Suspense fallback={<div className="p-8 text-center text-white/50 text-sm">Loading Classroom Admission Form...</div>}>
          <OfflineLeadForm initialSource="Indore Classroom Admissions" />
        </Suspense>
      </div>

      <div className="py-2 text-center text-[11px] text-white/40 font-medium">
        <span>ILI Foreign Languages Institute &bull; 205-208 Apollo Tower, MG Road, Indore</span>
      </div>
    </div>
  );
}
