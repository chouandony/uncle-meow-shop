"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="mb-1.5 block text-sm font-medium text-charcoal-700">{label}</label>}
        <input ref={ref} className={cn("w-full rounded-lg border bg-white px-4 py-3 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20", error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-charcoal-200", className)} {...props} />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
