"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, Truck, Store, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shippingMethods } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const steps = [
  { label: "購物車", href: "/cart" },
  { label: "收件資訊", href: "/checkout/info" },
  { label: "配送方式", href: "/checkout/shipping", active: true },
  { label: "付款方式", href: "/checkout/payment" },
  { label: "確認訂單", href: "/checkout/confirm" },
];

const icons: Record<string, React.ReactNode> = {
  home: <Home className="h-5 w-5" />,
  seven: <Store className="h-5 w-5" />,
  family: <Store className="h-5 w-5" />,
};

export default function CheckoutShippingPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/checkout/payment");
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-4 md:py-8 max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-1 md:gap-2 mb-6 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 md:gap-2 shrink-0">
              <Link href={step.href} className={cn("text-xs md:text-sm font-medium px-2 py-1 rounded-lg transition-colors whitespace-nowrap", step.active ? "bg-brand-500 text-white" : "text-charcoal-500 hover:text-charcoal-700")}>
                {step.label}
              </Link>
              {i < steps.length - 1 && <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-charcoal-300 shrink-0" />}
            </div>
          ))}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-charcoal-800 mb-4 md:mb-6">配送方式</h1>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          {shippingMethods.map((method) => (
            <button key={method.id} type="button" onClick={() => setSelectedMethod(method.id)}
              className={cn("flex items-center gap-3 md:gap-4 w-full rounded-xl border p-3 md:p-5 text-left transition-all", selectedMethod === method.id ? "border-brand-500 bg-brand-50" : "border-charcoal-200 bg-white hover:border-charcoal-300")}>
              <div className={cn("flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full", selectedMethod === method.id ? "bg-brand-500 text-white" : "bg-cream-200 text-charcoal-600")}>
                {icons[method.id] || <Truck className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-charcoal-800 text-sm md:text-base">{method.name}</p>
                  <p className="font-bold text-charcoal-800">{method.fee === 0 ? "免運" : formatPrice(method.fee)}</p>
                </div>
                <p className="text-xs md:text-sm text-charcoal-500 mt-0.5">{method.description}</p>
              </div>
              <div className={cn("h-5 w-5 rounded-full border-2 shrink-0", selectedMethod === method.id ? "border-brand-500 bg-brand-500" : "border-charcoal-300")}>
                {selectedMethod === method.id && <div className="h-full w-full rounded-full border-2 border-white" />}
              </div>
            </button>
          ))}

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 md:pt-6">
            <Link href="/checkout/info" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">← 上一步</Button>
            </Link>
            <Button type="submit" size="lg" className="w-full sm:w-auto">下一步：付款方式</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
