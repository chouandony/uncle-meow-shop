"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
      secondary: "bg-cream-200 text-charcoal-700 hover:bg-cream-300 focus:ring-brand-500",
      outline: "border-2 border-brand-500 text-brand-600 hover:bg-brand-50 focus:ring-brand-500",
      ghost: "text-charcoal-600 hover:bg-charcoal-100 focus:ring-charcoal-400",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };
    return (
      <button ref={ref}
        className={cn("inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none", variants[variant], sizes[size], className)}
        disabled={disabled || isLoading} {...props}>
        {isLoading && <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
