"use client";

import React from "react";
import { Lead } from "@/types";
import { Building2, Laptop } from "lucide-react";

export const FormatRatioCard: React.FC<{ leads: Lead[] }> = ({ leads }) => {
  const offlineCount = leads.filter(
    (l) =>
      (l.courseInterest || "").toLowerCase().includes("classroom") ||
      (l.courseInterest || "").toLowerCase().includes("offline") ||
      (l.preferredSlot || "").toLowerCase().includes("apollo") ||
      (l.preferredSlot || "").toLowerCase().includes("classroom") ||
      (l.message || "").toLowerCase().includes("offline")
  ).length;

  const onlineCount = leads.filter(
    (l) =>
      (l.courseInterest || "").toLowerCase().includes("online") ||
      (l.preferredSlot || "").toLowerCase().includes("online") ||
      (l.message || "").toLowerCase().includes("online")
  ).length;

  const total = leads.length;
  const offlinePct = total > 0 ? Math.round((offlineCount / total) * 100) : 0;
  const onlinePct = total > 0 ? 100 - offlinePct : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black tracking-wider uppercase text-slate-800">
            CLASSROOM VS ONLINE DELIVERY RATIO
          </h2>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Student preference breakdown by learning format
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
          {total} Inquiries
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Offline Center */}
        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-sky-900">{offlinePct}%</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-900">Indore Apollo Tower</span>
            <span className="block text-[11px] text-slate-500 font-medium">
              {offlineCount} classroom inquiries
            </span>
          </div>
        </div>

        {/* Online Live */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Laptop className="w-4 h-4" />
            </div>
            <span className="text-lg font-black text-indigo-900">{onlinePct}%</span>
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-900">Live Online Interactive</span>
            <span className="block text-[11px] text-slate-500 font-medium">
              {onlineCount} digital inquiries
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          {total > 0 ? (
            <>
              <div
                className="h-full bg-sky-600 transition-all duration-500"
                style={{ width: `${offlinePct}%` }}
              />
              <div
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${onlinePct}%` }}
              />
            </>
          ) : (
            <div className="h-full w-full bg-slate-100" />
          )}
        </div>
        <div className="flex justify-between text-[10px] font-semibold text-slate-400">
          <span>🏛️ Classroom ({offlinePct}%)</span>
          <span>💻 Live Online ({onlinePct}%)</span>
        </div>
      </div>
    </div>
  );
};
