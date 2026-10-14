"use client";

import React, { useState } from "react";

export interface DonutSlice {
  label: string;
  count: number;
  color: string;
  percent: number;
}

export const ProductMixDonutChart: React.FC<{
  title?: string;
  subtitle?: string;
  slices: DonutSlice[];
  centerLabel?: string;
  centerSub?: string;
}> = ({
  title = "PRODUCT MIX",
  subtitle = "Catalogue by language",
  slices,
  centerLabel,
  centerSub = "Distribution",
}) => {
  const [activeSlice, setActiveSlice] = useState<DonutSlice | null>(null);

  const size = 210;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black tracking-wider uppercase text-slate-800">
            {title}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          Live Ratio
        </span>
      </div>

      {/* Donut Graphic */}
      <div className="relative flex items-center justify-center my-auto py-2">
        <svg width={size} height={size} className="transform -rotate-90">
          {slices.map((slice) => {
            const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += slice.percent;

            const isHovered = activeSlice?.label === slice.label;

            return (
              <circle
                key={slice.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setActiveSlice(slice)}
                onMouseLeave={() => setActiveSlice(null)}
              />
            );
          })}
        </svg>

        {/* Center cutout info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-black text-slate-900 leading-none">
            {activeSlice ? `${activeSlice.percent}%` : centerLabel || "100%"}
          </span>
          <span className="text-[10px] font-bold text-slate-400 mt-1 max-w-[90px] truncate">
            {activeSlice ? activeSlice.label : centerSub}
          </span>
        </div>
      </div>

      {/* Bottom Legend Matching Reference */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-100 text-xs">
        {slices.map((slice) => (
          <div
            key={slice.label}
            onMouseEnter={() => setActiveSlice(slice)}
            onMouseLeave={() => setActiveSlice(null)}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-slate-600 font-semibold text-[11px]">
              {slice.label} <span className="text-slate-400 font-normal">({slice.percent}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
