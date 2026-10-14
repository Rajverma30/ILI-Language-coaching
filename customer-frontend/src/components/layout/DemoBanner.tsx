"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { Sparkles, MapPin } from "lucide-react";

export const DemoBanner: React.FC = () => {
  const { currentUser, settings } = useDemo();

  if (!settings.bannerVisible) return null;

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-semibold text-[11px] tracking-wide uppercase">
            <Sparkles className="w-3 h-3 text-sky-200" />
            Indore Campus
          </span>
          <span className="text-slate-300 hidden sm:inline">
            ILI Foreign Languages Institute &bull; Apollo Tower, New Palasia, Indore
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-sky-400" />
            MG Road Center Open Today
          </span>

          {currentUser && currentUser.role === "student" && (
            <span className="hidden md:inline text-slate-300 border-l border-slate-700 pl-3">
              Signed in: <strong className="text-white">{currentUser.name}</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
