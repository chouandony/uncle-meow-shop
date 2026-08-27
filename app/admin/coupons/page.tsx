"use client";

import Link from "next/link";
import { Plus, Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { coupons } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminCouponsPage() {
  const [couponList, setCouponList] = useState(coupons);

  const toggleActive = (id: string) => {
    setCouponList(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal-800">優惠券管理</h1>
        <Button className="gap-2"><Plus className="h-4 w-4" />新增優惠券</Button>
      </div>
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-charcoal-100 bg-cream-50">
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">代碼</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">名稱</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">類型</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">條件</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">期限</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">狀態</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">操作</th>
          </tr></thead>
          <tbody>
            {couponList.map(c=> (
              <tr key={c.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                <td className="px-4 py-3 font-mono font-medium text-charcoal-800">{c.code}</td>
                <td className="px-4 py-3 text-charcoal-800">{c.name}</td>
                <td className="px-4 py-3">
                  {c.type==="FIXED" && <span className="text-brand-600">折抵 {formatPrice(c.discountValue)}</span>}
                  {c.type==="PERCENTAGE" && <span className="text-brand-600">{c.discountValue}% 折扣</span>}
                  {c.type==="FREE_SHIPPING" && <span className="text-emerald-600">免運</span>}
                </td>
                <td className="px-4 py-3 text-charcoal-600">
                  {c.minOrderAmount>0 && `滿 ${formatPrice(c.minOrderAmount)}`}
                  {c.perUserLimit>0 && ` · 每人限 ${c.perUserLimit} 次`}
                </td>
                <td className="px-4 py-3 text-charcoal-600">{c.startAt} ~ {c.endAt}</td>
                <td className="px-4 py-3"><Badge variant={c.isActive?"success":"default"}>{c.isActive?"啟用":"停用"}</Badge></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-500"><Pencil className="h-4 w-4"/></button>
                    <button onClick={()=>toggleActive(c.id)} className={cn("p-1.5 rounded-lg", c.isActive?"text-emerald-500":"text-charcoal-400")}>
                      {c.isActive ? <ToggleRight className="h-5 w-5"/> : <ToggleLeft className="h-5 w-5"/>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
