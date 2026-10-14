import React from "react";
import { FolderSearch } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="py-12 px-4 text-center rounded-2xl border-2 border-dashed border-[#E8E2D8] bg-white max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#801D30] flex items-center justify-center mx-auto mb-3">
        {icon || <FolderSearch className="w-6 h-6" />}
      </div>
      <h3 className="font-editorial text-lg font-bold text-[#0F1D38] mb-1">{title}</h3>
      <p className="text-xs text-[#5C6479] max-w-sm mx-auto mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
