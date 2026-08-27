"use client";

import Link from "next/link";
import { Search, Eye, Truck } from "lucide-react";
import { orders } from "@/lib/data";
import { getOrderStatusLabel, getOrderStatusColor, formatPrice, formatDateTime } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(o => o.orderNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-charcoal-800">訂單管理</h1>
      <div className="bg-white rounded-xl border border-charcoal-100">
        <div className="p-3 md:p-4 border-b border-charcoal-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <input type="text" placeholder="搜尋訂單編號..." value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full rounded-lg border border-charcoal-200 pl-10 pr-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-charcoal-100 bg-cream-50">
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600">訂單編號</th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600">日期</th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600">狀態</th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600 hidden md:table-cell">物流</th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600">總額</th>
              <th className="text-left px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-600">操作</th>
            </tr></thead>
            <tbody>
              {filtered.map(o=> (
                <tr key={o.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                  <td className="px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-800">
                    <div className="flex items-center gap-1.5">
                      {o.shipment && <Truck className="h-3.5 w-3.5 text-brand-500" />}
                      {o.orderNumber}
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 text-charcoal-600 text-xs md:text-sm">{formatDateTime(o.createdAt)}</td>
                  <td className="px-3 md:px-4 py-2 md:py-3">
                    <Badge variant={o.status==="PAID"?"success":o.status==="PENDING"?"warning":o.status==="SHIPPED"?"info":"default"} className="text-xs">
                      {getOrderStatusLabel(o.status)}
                    </Badge>
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 hidden md:table-cell">
                    {o.shipment ? (
                      <div className="text-xs">
                        <span className="text-charcoal-600">{o.shipment.carrier}</span>
                        <span className="text-charcoal-400 ml-1">{o.shipment.trackingNumber}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-charcoal-400">-</span>
                    )}
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 font-medium text-charcoal-800">{formatPrice(o.total)}</td>
                  <td className="px-3 md:px-4 py-2 md:py-3">
                    <Link href={`/admin/orders/${o.id}`} className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-500 hover:text-brand-600 inline-block">
                      <Eye className="h-4 w-4"/>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
