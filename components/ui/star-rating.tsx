"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, max = 5, size = "md", showValue = false, reviewCount }: StarRatingProps) {
  const sizeClasses = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          return (
            <svg key={i} className={cn(sizeClasses[size], filled ? "text-amber-400" : "text-charcoal-200")} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          );
        })}
      </div>
      {showValue && <span className="text-sm font-medium text-charcoal-600">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && <span className="text-sm text-charcoal-400">({reviewCount})</span>}
    </div>
  );
}
