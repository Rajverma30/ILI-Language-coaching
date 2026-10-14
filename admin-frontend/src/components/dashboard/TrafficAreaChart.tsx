"use client";

import React, { useState } from "react";

interface DataPoint {
  date: string;
  visitors: number;
  leads: number;
}

const DEFAULT_DATA: DataPoint[] = [
  { date: "14 Sept", visitors: 1200, leads: 620 },
  { date: "16 Sept", visitors: 1540, leads: 880 },
  { date: "18 Sept", visitors: 1380, leads: 740 },
  { date: "20 Sept", visitors: 2000, leads: 1150 },
  { date: "22 Sept", visitors: 1850, leads: 980 },
  { date: "24 Sept", visitors: 1400, leads: 700 },
  { date: "26 Sept", visitors: 1650, leads: 910 },
  { date: "28 Sept", visitors: 1580, leads: 650 },
  { date: "30 Sept", visitors: 2200, leads: 1100 },
  { date: "02 Oct", visitors: 2950, leads: 1680 },
  { date: "04 Oct", visitors: 1980, leads: 950 },
  { date: "06 Oct", visitors: 2250, leads: 1120 },
  { date: "08 Oct", visitors: 280, leads: 120 },
  { date: "10 Oct", visitors: 1750, leads: 720 },
  { date: "13 Oct", visitors: 1680, leads: 890 },
];

export const TrafficAreaChart: React.FC<{ data?: DataPoint[] }> = ({
  data = DEFAULT_DATA,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 680;
  const height = 230;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 3000;

  // Convert data points to SVG coordinates
  const points1 = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.visitors / maxVal) * chartHeight;
    return { x, y, data: d };
  });

  const points2 = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.leads / maxVal) * chartHeight;
    return { x, y, data: d };
  });

  // Generate smooth cubic bezier SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath1 = createSmoothPath(points1);
  const linePath2 = createSmoothPath(points2);

  const baseY = paddingTop + chartHeight;
  const areaPath1 = `${linePath1} L ${points1[points1.length - 1].x} ${baseY} L ${points1[0].x} ${baseY} Z`;
  const areaPath2 = `${linePath2} L ${points2[points2.length - 1].x} ${baseY} L ${points2[0].x} ${baseY} Z`;

  const yTicks = [0, 750, 1500, 2250, 3000];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-3 relative overflow-hidden">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xs font-black tracking-wider uppercase text-slate-800">
            STORE TRAFFIC
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Visitors and page views &bull; last 30 days
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
            <span className="text-slate-600 text-[11px]">Ad Impressions / Visitors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
            <span className="text-slate-600 text-[11px]">Lead Inquiries</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[580px] select-none"
        >
          <defs>
            {/* Top Purple Gradient Fill */}
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
              <stop offset="85%" stopColor="#6366f1" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>

            {/* Cyan Gradient Fill */}
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Dotted Horizontal Grid Lines */}
          {yTicks.map((val) => {
            const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontFamily="sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Filled Areas */}
          <path d={areaPath1} fill="url(#purpleGradient)" />
          <path d={areaPath2} fill="url(#cyanGradient)" />

          {/* Curves */}
          <path
            d={linePath1}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={linePath2}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* X-Axis Date Labels */}
          {data.map((d, i) => {
            const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
            return (
              <text
                key={d.date}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="9.5"
                fill="#64748b"
                fontWeight="500"
                fontFamily="sans-serif"
              >
                {d.date}
              </text>
            );
          })}

          {/* Interactive Hover Indicators */}
          {points1.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - chartWidth / (data.length * 2)}
              y={paddingTop}
              width={chartWidth / data.length}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}

          {hoverIndex !== null && (
            <g pointerEvents="none">
              <line
                x1={points1[hoverIndex].x}
                y1={paddingTop}
                x2={points1[hoverIndex].x}
                y2={baseY}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={points1[hoverIndex].x}
                cy={points1[hoverIndex].y}
                r="4.5"
                fill="#6366f1"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <circle
                cx={points2[hoverIndex].x}
                cy={points2[hoverIndex].y}
                r="4.5"
                fill="#06b6d4"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Hover Floating Tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute top-12 bg-slate-900 text-white rounded-xl shadow-xl px-3 py-2 text-xs pointer-events-none z-20 space-y-1 transform -translate-x-1/2 transition-all duration-75"
            style={{
              left: `${
                ((points1[hoverIndex].x) / width) * 100
              }%`,
            }}
          >
            <p className="font-bold text-slate-300 border-b border-slate-700 pb-0.5 text-[10px]">
              {data[hoverIndex].date}
            </p>
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                Visitors:
              </span>
              <strong className="font-mono">{data[hoverIndex].visitors}</strong>
            </div>
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                Leads:
              </span>
              <strong className="font-mono">{data[hoverIndex].leads}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
