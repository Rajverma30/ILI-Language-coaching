import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 shadow-xs hover:shadow-md",
    secondary:
      "bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 focus:ring-sky-400 shadow-2xs",
    gold:
      "bg-sky-100 text-sky-800 border border-sky-200 hover:bg-sky-200 focus:ring-sky-500 font-bold",
    outline:
      "border border-slate-200 bg-white text-slate-800 hover:bg-sky-50/50 hover:border-sky-200 hover:text-sky-700 focus:ring-sky-500",
    ghost:
      "bg-transparent text-slate-700 hover:bg-sky-50 hover:text-sky-700 focus:ring-sky-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-xs",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
