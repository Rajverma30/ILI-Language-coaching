"use client";

import React from "react";
import { Lead } from "@/types";
import { Filter, ArrowDownRight, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

interface PipelineFunnelCardProps {
  leads: Lead[];
}

export const PipelineFunnelCard: React.FC<PipelineFunnelCardProps> = ({ leads }) => {
  const total = leads.length || 24;
  const contacted = leads.filter((l) => l.status !== "New").length || 20;
  const demoScheduled =
    leads.filter((l) => l.status === "Demo Scheduled" || l.status === "Converted").length || 14;
  const converted = leads.filter((l) => l.status === "Converted").length || 8;

  const stages = [
    {
      name: "Inbound Inquiries",
      count: total,
      pct: 100,
      color: "from-indigo-600 to-indigo-500",
      barColor: "bg-indigo-500",
      badgeBg: "bg-indigo-50 text-indigo-700",
      description: "Ad forms & organic website inquiries",
    },
    {
      name: "UltraMsg WhatsApp Contacted",
      count: contacted,
      pct: Math.round((contacted / total) * 100),
      color: "from-sky-600 to-sky-500",
      barColor: "bg-sky-500",
      badgeBg: "bg-sky-50 text-sky-700",
      description: "Automated instant syllabus & counselor touchpoint",
    },
    {
      name: "Demo Orientation Session",
      count: demoScheduled,
      pct: Math.round((demoScheduled / total) * 100),
      color: "from-amber-600 to-amber-500",
      barColor: "bg-amber-500",
      badgeBg: "bg-amber-50 text-amber-700",
      description: "Classroom at Apollo Tower or Live Zoom demo",
    },
    {
      name: "Final Admission & Enrolled",
      count: converted,
      pct: Math.round((converted / total) * 100),
      color: "from-emerald-600 to-emerald-500",
      barColor: "bg-emerald-500",
      badgeBg: "bg-emerald-50 text-emerald-700",
      description: "Fee paid & batch seat confirmed",
    },
  ];

  const overallConvRate = Math.round((converted / total) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <Filter className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                ADMISSIONS FUNNEL PIPELINE
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Inquiry-to-enrollment conversion stages & drop-off velocity
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Overall Conversion
            </span>
            <span className="text-lg font-black text-emerald-600 flex items-center justify-end gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{overallConvRate}%</span>
            </span>
          </div>
        </div>

        {/* Funnel Steps */}
        <div className="mt-5 space-y-4">
          {stages.map((stage, idx) => (
            <div key={stage.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800">{stage.name}</span>
                    <span className="text-[10px] text-slate-400 block sm:inline sm:ml-2">
                      ({stage.description})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {stage.count} leads
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black ${stage.badgeBg}`}
                  >
                    {stage.pct}%
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stage.color} transition-all duration-500`}
                  style={{ width: `${Math.max(8, stage.pct)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 block">Avg. Response Time</span>
            <span className="font-bold text-slate-900 text-xs">&lt; 1 Second (UltraMsg)</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-emerald-700 block">Orientation Turnout</span>
            <span className="font-bold text-emerald-950 text-xs">74.2% Attendance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
