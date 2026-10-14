import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "burgundy" | "gold" | "emerald" | "stone" | "amber" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "stone",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  }[size];

  const variantClasses = {
    navy: "bg-slate-100 text-slate-800 border border-slate-200 font-semibold",
    burgundy: "bg-sky-50 text-sky-700 border border-sky-200 font-semibold",
    gold: "bg-sky-100 text-sky-800 border border-sky-200 font-semibold",
    emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    stone: "bg-slate-100 text-slate-700 border border-slate-200 font-medium",
    amber: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
    outline: "bg-transparent text-slate-700 border border-slate-300 font-medium",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
