"use client";

import { ClipboardList, User, Package, ShoppingCart, Ticket } from "lucide-react";
import { formatDateTime } from "@/lib/format";

const logs = [
  { id: "log-1", admin: "喵大叔管理員", action: "更新商品庫存", entity: "喵大叔 經典豆腐砂", time: "2026-08-27T09:30:00Z", type: "inventory" },
  { id: "log-2", admin: "喵大叔管理員", action: "建立優惠券", entity: "CAT399", time: "2026-08-26T14:20:00Z", type: "coupon" },
  { id: "log-3", admin: "喵大叔管理員", action: "更新訂單狀態", entity: "UM2608200002 → 處理中", time: "2026-08-26T11:15:00Z", type: "order" },
  { id: "log-4", admin: "喵大叔管理員", action: "新增商品", entity: "喵大叔 極細豆腐砂", time: "2026-08-25T16:00:00Z", type: "product" },
];

const icons: Record<string, React.ReactNode> = {
  inventory: <Package className="h-4 w-4" />,
  coupon: <Ticket className="h-4 w-4" />,
  order: <ShoppingCart className="h-4 w-4" />,
  product: <Package className="h-4 w-4" />,
};

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal-800">操作紀錄</h1>
      <div className="bg-white rounded-xl border border-charcoal-100">
        <div className="divide-y divide-charcoal-100">
          {logs.map(log => (
            <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-cream-50">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream-200 text-charcoal-600">
                {icons[log.type] || <ClipboardList className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-charcoal-800">{log.admin}</span>
                  <span className="text-charcoal-500">{log.action}</span>
                  <span className="font-medium text-brand-600">{log.entity}</span>
                </div>
                <p className="text-xs text-charcoal-400 mt-1">{formatDateTime(log.time)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
