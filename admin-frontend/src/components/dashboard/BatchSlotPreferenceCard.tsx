"use client";

import React from "react";
import { Lead } from "@/types";
import { Clock, Sun, Moon, Calendar, Flame } from "lucide-react";

interface BatchSlotPreferenceCardProps {
  leads: Lead[];
}

export const BatchSlotPreferenceCard: React.FC<BatchSlotPreferenceCardProps> = ({ leads }) => {
  // Aggregate real batch preferences from leads
  const eveningCount = leads.filter((l) =>
    (l.preferredSlot || "").toLowerCase().includes("evening")
  ).length;
  const morningCount = leads.filter((l) =>
    (l.preferredSlot || "").toLowerCase().includes("morning")
  ).length;
  const weekendCount = leads.filter((l) =>
    (l.preferredSlot || "").toLowerCase().includes("weekend")
  ).length;
  const noonCount = leads.filter((l) =>
    (l.preferredSlot || "").toLowerCase().includes("noon")
  ).length;

  const total = leads.length;

  const slots = [
    {
      name: "Evening Batches (6:00 PM – 8:00 PM)",
      timeGroup: "Working Professionals & College Students",
      count: eveningCount,
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
      icon: Moon,
      hot: eveningCount > 0,
      tag: "Highest Demand",
    },
    {
      name: "Morning Batches (8:00 AM – 10:00 AM)",
      timeGroup: "Early Study Abroad & Job Aspirants",
      count: morningCount,
      color: "bg-amber-500",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50",
      icon: Sun,
      hot: false,
      tag: "Steady Demand",
    },
    {
      name: "Weekend Intensive (Sat & Sun 10 AM – 2 PM)",
      timeGroup: "Fast-Track Certification Batches",
      count: weekendCount,
      color: "bg-sky-600",
      textColor: "text-sky-600",
      bgLight: "bg-sky-50",
      icon: Calendar,
      hot: false,
      tag: "Weekend Batch",
    },
    {
      name: "Noon Batches (12:00 PM – 2:00 PM)",
      timeGroup: "Flexible Afternoon Sessions",
      count: noonCount,
      color: "bg-slate-500",
      textColor: "text-slate-600",
      bgLight: "bg-slate-50",
      icon: Clock,
      hot: false,
      tag: "Afternoon",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Clock className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                BATCH TIMING PREFERENCE MATRIX
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate schedule preferences across Classroom & Live Online
            </p>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-200 font-mono">
            <span>{total} Total</span>
          </span>
        </div>

        {/* Slot rows */}
        <div className="mt-5 space-y-4">
          {slots.map((s) => {
            const Icon = s.icon;
            const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;

            return (
              <div
                key={s.name}
                className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg ${s.bgLight} ${s.textColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{s.name}</span>
                        {s.hot && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-indigo-100 text-indigo-800">
                            🔥 Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{s.timeGroup}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-900 text-xs block">
                      {pct}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {s.count} requests
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>📍 Apollo Tower, Indore Campus</span>
        <span className="font-bold text-slate-700">60-Min Interactive Smart Batches</span>
      </div>
    </div>
  );
};
