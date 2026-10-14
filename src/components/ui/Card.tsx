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
    default: "bg-white border border-[#E8E2D8] shadow-xs",
    elevated: "bg-white border border-[#E8E2D8] shadow-md hover:shadow-lg transition-shadow",
    accent: "bg-[#FAF4E6] border border-[#E6D7B3]",
    bordered: "bg-transparent border-2 border-[#E8E2D8]",
  }[variant];

  return (
    <div className={`rounded-xl p-5 ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
