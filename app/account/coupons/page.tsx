"use client";

import { Tag, Copy, Check } from "lucide-react";
import { coupons } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CouponsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal-800 mb-6">我的優惠券</h1>
        <div className="grid gap-4">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-xl border border-charcoal-100 p-5 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Tag className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-charcoal-800">{coupon.name}</h3>
                <p className="text-sm text-charcoal-500">
                  {coupon.type === "FIXED" && `折抵 ${formatPrice(coupon.discountValue)}`}
                  {coupon.type === "PERCENTAGE" && `${coupon.discountValue}% 折扣`}
                  {coupon.type === "FREE_SHIPPING" && "免運費"}
                  {coupon.minOrderAmount > 0 && ` · 滿 ${formatPrice(coupon.minOrderAmount)} 可用`}
                </p>
                <p className="text-xs text-charcoal-400 mt-1">有效期限：{coupon.endAt}</p>
              </div>
              <button
                onClick={() => handleCopy(coupon.code)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors shrink-0",
                  copied === coupon.code
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-cream-200 text-charcoal-700 hover:bg-cream-300"
                )}
              >
                {copied === coupon.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === coupon.code ? "已複製" : coupon.code}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
