"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import Image from "next/image";

const steps = [
  { label: "購物車", href: "/cart" },
  { label: "收件資訊", href: "/checkout/info" },
  { label: "配送方式", href: "/checkout/shipping" },
  { label: "付款方式", href: "/checkout/payment" },
  { label: "確認訂單", href: "/checkout/confirm", active: true },
];

export default function CheckoutConfirmPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-4 md:py-8 max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-1 md:gap-2 mb-6 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 md:gap-2 shrink-0">
              <span className={cn("text-xs md:text-sm font-medium px-2 py-1 rounded-lg whitespace-nowrap", step.active ? "bg-brand-500 text-white" : "text-charcoal-500")}>
                {step.label}
              </span>
              {i < steps.length - 1 && <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-charcoal-300 shrink-0" />}
            </div>
          ))}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-charcoal-800 mb-4 md:mb-6">確認訂單</h1>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6">
            <h2 className="font-semibold text-charcoal-800 mb-3 md:mb-4">商品明細</h2>
            <div className="space-y-3 md:space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-14 w-14 md:h-16 md:w-16 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal-800 line-clamp-1">{item.name}</p>
                    {item.variantName && <p className="text-xs text-charcoal-500">規格：{item.variantName}</p>}
                    <p className="text-xs text-charcoal-500">數量：{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-charcoal-800">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-2 md:space-y-3">
            <h2 className="font-semibold text-charcoal-800 mb-2">訂單資訊</h2>
            <div className="flex justify-between text-sm text-charcoal-600">
              <span>商品小計</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between text-sm text-brand-600">
                <span>優惠折扣</span>
                <span>-{formatPrice(cart.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-charcoal-600">
              <span>運費</span>
              <span>{cart.shippingFee === 0 ? "免運" : formatPrice(cart.shippingFee)}</span>
            </div>
            <div className="border-t border-charcoal-100 pt-2 flex justify-between text-base md:text-lg font-bold text-charcoal-800">
              <span>應付總額</span>
              <span className="text-brand-600">{formatPrice(cart.total)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-3 md:space-y-4">
            <div>
              <p className="text-sm font-medium text-charcoal-700">收件地址</p>
              <p className="text-sm text-charcoal-600 mt-1">喵小編 0912-345-678</p>
              <p className="text-sm text-charcoal-600">106 台北市大安區忠孝東路四段 100 號 5 樓</p>
            </div>
            <div className="border-t border-charcoal-100 pt-3 md:pt-4">
              <p className="text-sm font-medium text-charcoal-700">付款方式</p>
              <p className="text-sm text-charcoal-600 mt-1">信用卡</p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-2 md:pt-4">
            <Link href="/checkout/payment" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">← 上一步</Button>
            </Link>
            <Button size="lg" className="w-full sm:w-auto gap-2" onClick={handlePlaceOrder}>
              <Check className="h-4 w-4" /> 確認付款
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
