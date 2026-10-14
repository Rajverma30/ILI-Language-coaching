"use client";

import React, { Suspense } from "react";
import { AdLeadForm } from "@/components/forms/AdLeadForm";

export default function WhatsAppAdApplyPage() {
  return (
    <div className="min-h-screen bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-4 relative">
      {/* Ambient WhatsApp Green Glow in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-teal-600/20 blur-3xl animate-pulse" />
      </div>

      {/* Centered Popup Card Container */}
      <div className="w-full max-w-lg my-auto py-2">
        <Suspense fallback={<div className="p-8 text-center text-white/50 text-sm">Loading WhatsApp Popup...</div>}>
          <AdLeadForm initialSource="WhatsApp Ads" />
        </Suspense>
      </div>

      {/* Discreet Trust Footer */}
      <div className="py-2 text-center text-[11px] text-white/40 font-medium">
        <span>ILI Foreign Languages Institute &bull; Apollo Tower, Indore</span>
      </div>
    </div>
  );
}
