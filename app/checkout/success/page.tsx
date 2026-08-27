"use client";

import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-20 max-w-lg mx-auto text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-800">訂單成立！</h1>
        <p className="text-charcoal-500 mt-2">感謝您的購買，我們已收到您的訂單。</p>
        <p className="text-sm text-charcoal-400 mt-1">訂單編號：UM2608270001</p>
        <div className="mt-8 space-y-3">
          <Link href="/account/orders"><Button variant="secondary" className="w-full gap-2"><Package className="h-4 w-4" /> 查看我的訂單</Button></Link>
          <Link href="/shop"><Button className="w-full gap-2">繼續購物 <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
