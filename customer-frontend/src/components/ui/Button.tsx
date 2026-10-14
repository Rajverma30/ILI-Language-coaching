import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gold"
  | "danger"
  | "gradient";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const getButtonClasses = ({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) => {
  const baseClasses =
    "group inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap";

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base gap-2.5",
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
    gradient:
      "bg-gradient-to-r from-[#20B8F8] via-[#4368F5] to-[#792DF0] hover:from-[#17A2DF] hover:via-[#3358E8] hover:to-[#6922DC] text-white font-bold shadow-[0_4px_18px_rgba(67,104,245,0.35)] hover:shadow-[0_8px_25px_rgba(67,104,245,0.48)] hover:-translate-y-0.5 active:translate-y-0 focus:ring-[#4368F5] motion-reduce:transform-none motion-reduce:transition-none",
  }[variant];

  return `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const combinedClasses = getButtonClasses({ variant, size, className });

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={onClick as any}
        aria-label={props["aria-label"]}
        tabIndex={props.tabIndex}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};
