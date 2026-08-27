"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { getOrderById } from "@/lib/data";
import { formatPrice, formatDateTime } from "@/lib/format";

export default function PackingListPage() {
  const params = useParams();
  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-500">訂單不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 頂部工具列 */}
      <div className="sticky top-0 z-10 bg-white border-b border-charcoal-100 px-4 py-3 flex items-center justify-between print:hidden">
        <Link href={`/admin/orders/${order.id}`} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">返回訂單</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-charcoal-400 hidden sm:inline">電腦請按 Ctrl+P / Mac 請按 Cmd+P</span>
          <span className="text-xs text-charcoal-400 sm:hidden">點 Safari 分享按鈕 → 列印</span>
        </div>
      </div>

      {/* 出貨單內容 */}
      <div className="max-w-2xl mx-auto p-6 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-1">出貨單</h1>
          <p className="text-charcoal-500">Uncle Meow 喵大叔</p>
          <p className="text-xs text-charcoal-400 mt-1">hello@unclemeow.tw | 02-1234-5678</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 text-sm">
          <div className="space-y-1.5">
            <p><span className="text-charcoal-500">訂單編號：</span><span className="font-mono font-medium">{order.orderNumber}</span></p>
            <p><span className="text-charcoal-500">下單時間：</span>{formatDateTime(order.createdAt)}</p>
            <p><span className="text-charcoal-500">付款方式：</span>{order.paymentMethod}</p>
          </div>
          <div className="space-y-1.5">
            <p><span className="text-charcoal-500">收件人：</span><span className="font-medium">{order.shippingName}</span></p>
            <p><span className="text-charcoal-500">電話：</span>{order.shippingPhone}</p>
            <p><span className="text-charcoal-500">地址：</span>{order.shippingAddress}</p>
          </div>
        </div>

        <table className="w-full text-sm border border-charcoal-200 rounded-lg overflow-hidden mb-8">
          <thead className="bg-cream-50">
            <tr>
              <th className="text-left px-3 py-2.5 border-b border-charcoal-200 font-medium">商品名稱</th>
              <th className="text-center px-3 py-2.5 border-b border-charcoal-200 font-medium">規格</th>
              <th className="text-center px-3 py-2.5 border-b border-charcoal-200 font-medium">數量</th>
              <th className="text-right px-3 py-2.5 border-b border-charcoal-200 font-medium">單價</th>
              <th className="text-right px-3 py-2.5 border-b border-charcoal-200 font-medium">小計</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-charcoal-100 last:border-0">
                <td className="px-3 py-2.5 font-medium">{item.name}</td>
                <td className="px-3 py-2.5 text-center text-charcoal-500">{item.variantName || "-"}</td>
                <td className="px-3 py-2.5 text-center">{item.quantity}</td>
                <td className="px-3 py-2.5 text-right">{formatPrice(item.price)}</td>
                <td className="px-3 py-2.5 text-right font-medium">{formatPrice(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-1.5 text-sm mb-8">
          <div className="flex justify-between"><span className="text-charcoal-500">商品小計</span><span>{formatPrice(order.subtotal)}</span></div>
          {order.discount > 0 && <div className="flex justify-between"><span className="text-charcoal-500">優惠折扣</span><span>-{formatPrice(order.discount)}</span></div>}
          <div className="flex justify-between"><span className="text-charcoal-500">運費</span><span>{order.shippingFee === 0 ? "免運" : formatPrice(order.shippingFee)}</span></div>
          <div className="flex justify-between text-xl md:text-2xl font-bold pt-2 border-t border-charcoal-200">
            <span>總計</span><span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="border-2 border-dashed border-charcoal-300 rounded-lg p-5 md:p-6 text-center mb-8">
          <p className="text-xs text-charcoal-400 mb-2">物流條碼（請貼於包裹外）</p>
          <p className="font-mono text-xl md:text-2xl tracking-[0.25em] font-bold text-charcoal-800">
            {order.shipment?.trackingNumber || order.orderNumber}
          </p>
        </div>

        <div className="text-center text-xs text-charcoal-400 pt-4 border-t border-charcoal-200">
          <p>感謝您的購買！如有問題請聯繫客服</p>
          <p>此出貨單僅供內部作業使用</p>
        </div>
      </div>
    </div>
  );
}
