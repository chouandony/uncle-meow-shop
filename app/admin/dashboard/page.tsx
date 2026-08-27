"use client";

import { Package, DollarSign, Clock, Truck, AlertTriangle, Users } from "lucide-react";
import { adminStats, products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Package, label: "今日訂單", value: adminStats.todayOrders, color: "bg-blue-500" },
  { icon: DollarSign, label: "今日營業額", value: formatPrice(adminStats.todayRevenue), color: "bg-emerald-500" },
  { icon: Clock, label: "待付款", value: adminStats.pendingPayment, color: "bg-amber-500" },
  { icon: Truck, label: "待出貨", value: adminStats.pendingShipment, color: "bg-purple-500" },
  { icon: AlertTriangle, label: "低庫存", value: adminStats.lowStockCount, color: "bg-red-500" },
  { icon: Users, label: "總會員數", value: adminStats.totalCustomers, color: "bg-cyan-500" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal-800">儀表板</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-charcoal-100 p-5">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg mb-3 text-white", s.color)}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-charcoal-800">{s.value}</p>
            <p className="text-sm text-charcoal-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-charcoal-100 p-6">
          <h2 className="font-semibold text-charcoal-800 mb-4">銷售趨勢</h2>
          <div className="h-48 flex items-end justify-around gap-2">
            {[40,65,45,80,55,90,70].map((h,i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full bg-brand-100 rounded-t-lg relative" style={{height:`${h*2}px`}}>
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-500 rounded-t-lg" style={{height:`${h*1.5}px`}} />
                </div>
                <span className="text-xs text-charcoal-400">{["週一","週二","週三","週四","週五","週六","週日"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-charcoal-100 p-6">
          <h2 className="font-semibold text-charcoal-800 mb-4">低庫存商品</h2>
          <div className="space-y-3">
            {products.filter(p=>p.inventory<100).map(p=> (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-charcoal-50 last:border-0">
                <div><p className="text-sm font-medium text-charcoal-800">{p.name}</p><p className="text-xs text-charcoal-500">庫存：{p.inventory} 件</p></div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">低庫存</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
