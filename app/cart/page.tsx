"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Tag, ArrowRight, ShoppingBag, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, applyCoupon, removeCoupon } = useCart();
  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) {
      showToast("優惠券套用成功", "success");
      setCouponInput("");
    } else {
      showToast("優惠券代碼無效或已過期", "error");
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-cream-50 min-h-screen">
        <div className="container-shop py-20 text-center px-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-200 mb-6">
            <ShoppingBag className="h-10 w-10 text-charcoal-400" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal-800">購物車是空的</h1>
          <p className="text-charcoal-500 mt-2">快去挑選喜歡的商品吧！</p>
          <Link href="/shop" className="mt-6 inline-block">
            <Button size="lg">繼續購物</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen pb-32 md:pb-8">
      <div className="container-shop py-4 md:py-8 px-4">
        <h1 className="text-xl md:text-2xl font-bold text-charcoal-800 mb-4 md:mb-8">購物車 ({cart.itemCount} 件)</h1>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-charcoal-100 p-3 md:p-4">
                <div className="flex gap-3">
                  <Link href={`/shop/${item.productId}`} className="shrink-0">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-lg bg-cream-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.productId}`}>
                      <h3 className="text-sm font-semibold text-charcoal-800 line-clamp-2 hover:text-brand-600 transition-colors">{item.name}</h3>
                    </Link>
                    {item.variantName && <p className="text-xs text-charcoal-500 mt-0.5">規格：{item.variantName}</p>}

                    <div className="flex items-center justify-between mt-2">
                      {/* Mobile: simple +/- buttons */}
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-200 text-charcoal-500 hover:bg-cream-100 disabled:opacity-30">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.maxQuantity}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-charcoal-200 text-charcoal-500 hover:bg-cream-100 disabled:opacity-30">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-charcoal-800">{formatPrice(item.price * item.quantity)}</p>
                        {item.price < item.originalPrice && (
                          <p className="text-xs text-charcoal-400 line-through">{formatPrice(item.originalPrice * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { removeFromCart(item.id); showToast("已移除商品", "info"); }}
                    className="shrink-0 self-start p-2 text-charcoal-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
              ← 繼續購物
            </Link>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-4">
              <h2 className="font-semibold text-charcoal-800">訂單摘要</h2>

              {/* Coupon */}
              <div className="flex gap-2">
                <Input placeholder="輸入優惠券代碼" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()} />
                <Button variant="secondary" onClick={handleApplyCoupon} className="shrink-0">套用</Button>
              </div>

              {cart.couponCode && (
                <div className="flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-brand-600" />
                    <span className="font-medium text-brand-700">{cart.couponCode}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-brand-600 hover:text-brand-800">移除</button>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-charcoal-600">
                  <span>商品小計</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-brand-600">
                    <span>優惠折扣</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal-600">
                  <span>運費</span>
                  <span className={cn(cart.shippingFee === 0 && "text-emerald-600 font-medium")}>
                    {cart.shippingFee === 0 ? "免運" : formatPrice(cart.shippingFee)}
                  </span>
                </div>
                {cart.subtotal < 999 && cart.shippingFee > 0 && (
                  <p className="text-xs text-charcoal-400">再買 {formatPrice(999 - cart.subtotal)} 即可享免運</p>
                )}
                <div className="border-t border-charcoal-100 pt-2 flex justify-between text-base font-bold text-charcoal-800">
                  <span>總計</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <Link href="/checkout/info">
                <Button size="lg" className="w-full gap-2">
                  前往結帳 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
