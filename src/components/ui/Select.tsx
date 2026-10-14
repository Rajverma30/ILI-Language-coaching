import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, className = "", id, children, options, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-[#0F1D38]">
            {label}
            {props.required && <span className="text-[#801D30] ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0F1D38] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0F1D38] focus:border-transparent disabled:bg-stone-100 disabled:cursor-not-allowed ${
            error ? "border-red-500 focus:ring-red-500" : "border-[#E8E2D8] hover:border-[#D6CDC0]"
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#5C6479]">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
