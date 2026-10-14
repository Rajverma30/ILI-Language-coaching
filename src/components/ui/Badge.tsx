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
    navy: "bg-[#EEF2F8] text-[#0F1D38] border border-[#D2DCED] font-semibold",
    burgundy: "bg-[#FBF0F2] text-[#801D30] border border-[#F3CFD6] font-semibold",
    gold: "bg-[#FAF4E6] text-[#8C6D23] border border-[#E6D7B3] font-semibold",
    emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    stone: "bg-stone-100 text-stone-700 border border-stone-200 font-medium",
    amber: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
    outline: "bg-transparent text-stone-700 border border-stone-300 font-medium",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
