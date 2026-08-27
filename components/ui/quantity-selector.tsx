"use client";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantitySelector({ value, onChange, min = 1, max = 99, size = "md" }: QuantitySelectorProps) {
  const sizeClasses = { sm: "h-8 w-8 text-sm", md: "h-10 w-10 text-base" };
  const inputSize = { sm: "h-8 w-12 text-sm", md: "h-10 w-14 text-base" };
  return (
    <div className="inline-flex items-center rounded-lg border border-charcoal-200 bg-white">
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
        className={cn("flex items-center justify-center rounded-l-lg border-r border-charcoal-200 text-charcoal-500 transition-colors hover:bg-cream-100 disabled:opacity-30", sizeClasses[size])}>−</button>
      <input type="number" value={value} onChange={(e) => { const val = parseInt(e.target.value) || min; onChange(Math.min(max, Math.max(min, val))); }}
        className={cn("border-0 text-center font-medium text-charcoal-800 focus:outline-none focus:ring-0", inputSize[size])} />
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
        className={cn("flex items-center justify-center rounded-r-lg border-l border-charcoal-200 text-charcoal-500 transition-colors hover:bg-cream-100 disabled:opacity-30", sizeClasses[size])}>+</button>
    </div>
  );
}
