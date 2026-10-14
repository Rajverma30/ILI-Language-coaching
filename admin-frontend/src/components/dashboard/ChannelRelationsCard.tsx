"use client";

import React, { useState } from "react";
import { Lead } from "@/types";
import { BarChart3 } from "lucide-react";

interface ChannelStat {
  channel: string;
  shortLabel: string;
  count: number;
  color: string;
  barBg: string;
  percentage: number;
  icon: string;
}

export const ChannelRelationsCard: React.FC<{ leads: Lead[] }> = ({ leads }) => {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  const total = leads.length;

  const countBySource = (term: string) =>
    leads.filter((l) => (l.source || "").toLowerCase().includes(term)).length;

  const instaCount = countBySource("insta");
  const whatsCount = countBySource("whats");
  const walkCount = countBySource("walk");
  const youtCount = countBySource("yout");
  const knownCount = instaCount + whatsCount + walkCount + youtCount;
  const webCount = Math.max(0, leads.length - knownCount);

  const channels: ChannelStat[] = [
    {
      channel: "Instagram Ads",
      shortLabel: "Instagram",
      count: instaCount,
      color: "#ec4899",
      barBg: "from-pink-500 to-rose-500",
      percentage: total > 0 ? Math.round((instaCount / total) * 100) : 0,
      icon: "📸",
    },
    {
      channel: "WhatsApp Ads / Chat",
      shortLabel: "WhatsApp",
      count: whatsCount,
      color: "#10b981",
      barBg: "from-emerald-500 to-teal-500",
      percentage: total > 0 ? Math.round((whatsCount / total) * 100) : 0,
      icon: "💬",
    },
    {
      channel: "Indore Walk-in",
      shortLabel: "Walk-in",
      count: walkCount,
      color: "#f59e0b",
      barBg: "from-amber-500 to-orange-500",
      percentage: total > 0 ? Math.round((walkCount / total) * 100) : 0,
      icon: "🏢",
    },
    {
      channel: "YouTube Ads",
      shortLabel: "YouTube",
      count: youtCount,
      color: "#ef4444",
      barBg: "from-red-500 to-rose-600",
      percentage: total > 0 ? Math.round((youtCount / total) * 100) : 0,
      icon: "▶️",
    },
    {
      channel: "Website Form",
      shortLabel: "Website",
      count: webCount,
      color: "#6366f1",
      barBg: "from-sky-500 to-indigo-600",
      percentage: total > 0 ? Math.round((webCount / total) * 100) : 0,
      icon: "🌐",
    },
  ];

  // Highest count for scaling bar heights
  const maxCount = Math.max(...channels.map((c) => c.count), 1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-50 text-sky-600">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-xs font-black tracking-wider uppercase text-slate-800">
              ACQUISITION CHANNEL RELATIONS
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Real-time lead origin attribution & conversion distribution
          </p>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 font-mono">
          Total Inquiries: {total}
        </span>
      </div>

      {/* Modern Vertical Bar Graph */}
      <div className="pt-2 pb-1">
        <div className="h-44 w-full flex items-end justify-between gap-3 px-2 border-b border-slate-100 relative">
          {/* Subtle dotted gridlines */}
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-100 pointer-events-none" />
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-100 pointer-events-none" />

          {channels.map((ch) => {
            // Height calculation based on count relative to maxCount, minimum 6px if count > 0, 3px baseline if 0
            const heightPercent =
              ch.count > 0 ? Math.max(14, Math.round((ch.count / maxCount) * 88)) : 3;
            const isHovered = hoveredChannel === ch.channel;

            return (
              <div
                key={ch.channel}
                className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                onMouseEnter={() => setHoveredChannel(ch.channel)}
                onMouseLeave={() => setHoveredChannel(null)}
              >
                {/* Floating Tooltip / Count on top of bar */}
                <div
                  className={`mb-1.5 transition-all text-center ${
                    isHovered ? "transform -translate-y-1 scale-105" : ""
                  }`}
                >
                  <span
                    className={`font-mono font-bold text-[11px] block ${
                      ch.count > 0 ? "text-slate-900" : "text-slate-300"
                    }`}
                  >
                    {ch.count}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 block">
                    {ch.percentage}%
                  </span>
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[42px] h-full flex items-end">
                  <div
                    className={`w-full rounded-t-xl bg-gradient-to-t ${ch.barBg} transition-all duration-300 ${
                      ch.count === 0 ? "opacity-25" : "opacity-90 group-hover:opacity-100 shadow-sm"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Channel Labels */}
        <div className="flex justify-between gap-3 px-2 pt-2 text-center">
          {channels.map((ch) => (
            <div key={ch.channel} className="flex-1 min-w-0">
              <span className="text-sm block">{ch.icon}</span>
              <span className="text-[10px] font-bold text-slate-700 block truncate mt-0.5">
                {ch.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stat Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Verified Tracking Source</span>
        <span className="font-semibold text-slate-700">
          {total === 0 ? "0 active leads recorded" : `${total} live admissions leads mapped`}
        </span>
      </div>
    </div>
  );
};
