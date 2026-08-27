"use client";

import { Search, Mail, Phone, ShoppingBag } from "lucide-react";
import { mockUser } from "@/lib/data";
import { orders } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function AdminCustomersPage() {
  const customers = [
    { ...mockUser, orderCount: orders.length, totalSpent: orders.reduce((s,o)=>s+o.total,0) },
    { id:"u-2", name:"貓奴小明", email:"ming@example.com", phone:"0911-222-333", orderCount:5, totalSpent:3450 },
    { id:"u-3", name:"三貓媽媽", email:"mom@example.com", phone:"0922-333-444", orderCount:12, totalSpent:8900 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal-800">會員管理</h1>
      <div className="bg-white rounded-xl border border-charcoal-100">
        <div className="p-4 border-b border-charcoal-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <input type="text" placeholder="搜尋會員..."
              className="w-full rounded-lg border border-charcoal-200 pl-10 pr-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-charcoal-100 bg-cream-50">
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">會員</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">聯絡方式</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">訂單數</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">累積消費</th>
            </tr></thead>
            <tbody>
              {customers.map(c=> (
                <tr key={c.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-bold">{c.name[0]}</div>
                      <span className="font-medium text-charcoal-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">
                    <div className="flex items-center gap-1"><Mail className="h-3.5 w-3.5"/>{c.email}</div>
                    <div className="flex items-center gap-1 mt-0.5"><Phone className="h-3.5 w-3.5"/>{c.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{c.orderCount}</td>
                  <td className="px-4 py-3 font-medium text-charcoal-800">{formatPrice(c.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
