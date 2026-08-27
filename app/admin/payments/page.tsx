"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/lib/data";
import { formatPrice, formatDateTime } from "@/lib/format";

export default function AdminPaymentsPage() {
  const payments = orders.map(o => ({
    id: o.id,
    orderNumber: o.orderNumber,
    amount: o.total,
    method: o.paymentMethod,
    status: o.status === "PAID" ? "success" : o.status === "PENDING" ? "pending" : "failed",
    paidAt: o.paidAt,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal-800">金流紀錄</h1>
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-charcoal-100 bg-cream-50">
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">訂單編號</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">付款時間</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">付款方式</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">金額</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">狀態</th>
          </tr></thead>
          <tbody>
            {payments.map(p=> (
              <tr key={p.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-charcoal-800">{p.orderNumber}</td>
                <td className="px-4 py-3 text-charcoal-600">{p.paidAt ? formatDateTime(p.paidAt) : "-"}</td>
                <td className="px-4 py-3 text-charcoal-600">{p.method}</td>
                <td className="px-4 py-3 font-medium text-charcoal-800">{formatPrice(p.amount)}</td>
                <td className="px-4 py-3">
                  {p.status==="success" && <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3"/>成功</Badge>}
                  {p.status==="pending" && <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3"/>待付款</Badge>}
                  {p.status==="failed" && <Badge variant="danger" className="gap-1"><XCircle className="h-3 w-3"/>失敗</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
