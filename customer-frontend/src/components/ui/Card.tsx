import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "accent" | "bordered";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "bg-white border border-slate-200 shadow-xs",
    elevated: "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all",
    accent: "bg-sky-50/70 border border-sky-100",
    bordered: "bg-transparent border-2 border-slate-200",
  }[variant];

  return (
    <div className={`rounded-xl p-5 ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
