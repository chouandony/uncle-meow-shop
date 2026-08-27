"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutFailurePage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-20 max-w-lg mx-auto text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-800">付款失敗</h1>
        <p className="text-charcoal-500 mt-2">很抱歉，付款過程中發生問題，請重新嘗試。</p>
        <div className="mt-8 space-y-3">
          <Link href="/checkout/payment"><Button className="w-full gap-2"><RefreshCw className="h-4 w-4" /> 重新付款</Button></Link>
          <Link href="/cart"><Button variant="secondary" className="w-full gap-2"><ArrowLeft className="h-4 w-4" /> 返回購物車</Button></Link>
        </div>
      </div>
    </div>
  );
}
