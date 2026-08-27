"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getOrdersByUser } from "@/lib/data";
import { getOrderStatusLabel, getOrderStatusColor, formatPrice, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const orders = getOrdersByUser();

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-4">
          <Link href="/account" className="hover:text-brand-600">會員中心</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-charcoal-800">我的訂單</span>
        </div>
        <h1 className="text-2xl font-bold text-charcoal-800 mb-6">我的訂單</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}>
              <div className="bg-white rounded-xl border border-charcoal-100 p-5 hover:border-brand-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{order.orderNumber}</p>
                    <p className="text-xs text-charcoal-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getOrderStatusColor(order.status))}>
                    {getOrderStatusLabel(order.status)}
                  </span>
                </div>
                <div className="flex gap-3 mb-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="relative h-16 w-16 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-cream-200 text-xs text-charcoal-500">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-charcoal-500">{order.items.length} 件商品</p>
                  <p className="text-lg font-bold text-charcoal-800">{formatPrice(order.total)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
