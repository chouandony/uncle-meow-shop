"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Truck, Package, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getOrderById, getShipmentStatusLabel, getShipmentStatusColor } from "@/lib/data";
import { getOrderStatusLabel, getOrderStatusColor, formatPrice, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const order = getOrderById(params.id as string);

  const [trackingNumber, setTrackingNumber] = useState(order?.shipment?.trackingNumber || "");
  const [carrier, setCarrier] = useState(order?.shipment?.carrier || "黑貓宅急便");
  const [orderStatus, setOrderStatus] = useState(order?.status || "PENDING");

  if (!order) {
    return (
      <div className="p-8 text-center text-charcoal-500">
        <p>訂單不存在</p>
        <Link href="/admin/orders">
          <Button variant="secondary" className="mt-4">返回訂單列表</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-cream-200 text-charcoal-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-charcoal-800">訂單詳細</h1>
          <p className="text-sm text-charcoal-500">{order.orderNumber}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/orders/${order.id}/packing-list`} target="_blank">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <ExternalLink className="h-4 w-4" /> 出貨單
            </Button>
          </Link>
          <Link href={`/admin/orders/${order.id}/shipping-label`} target="_blank">
            <Button size="sm" className="gap-1.5">
              <FileText className="h-4 w-4" /> 寄貨單
            </Button>
          </Link>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <Badge className={cn(getOrderStatusColor(orderStatus), "text-sm px-3 py-1")}>
          {getOrderStatusLabel(orderStatus)}
        </Badge>
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value as any)}
          className="rounded-lg border border-charcoal-200 bg-white px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
        >
          <option value="PENDING">待付款</option>
          <option value="PAID">已付款</option>
          <option value="PROCESSING">處理中</option>
          <option value="SHIPPED">已出貨</option>
          <option value="DELIVERED">已送達</option>
          <option value="CANCELLED">已取消</option>
        </select>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-4">
        <h2 className="font-semibold text-charcoal-800">訂單資訊</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div><p className="text-charcoal-500">訂單編號</p><p className="font-medium text-charcoal-800">{order.orderNumber}</p></div>
          <div><p className="text-charcoal-500">下單時間</p><p className="font-medium text-charcoal-800">{formatDateTime(order.createdAt)}</p></div>
          <div><p className="text-charcoal-500">付款方式</p><p className="font-medium text-charcoal-800">{order.paymentMethod}</p></div>
          <div><p className="text-charcoal-500">配送方式</p><p className="font-medium text-charcoal-800">{order.shippingMethod}</p></div>
        </div>
      </div>

      {/* Shipment Management */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-brand-600" />
          <h2 className="font-semibold text-charcoal-800">物流管理</h2>
        </div>

        {order.shipment ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-500">物流商</p>
                <p className="font-medium text-charcoal-800">{order.shipment.carrier}</p>
              </div>
              <Badge className={cn(getShipmentStatusColor(order.shipment.status))}>
                {getShipmentStatusLabel(order.shipment.status)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-charcoal-500">追蹤編號</p>
              <p className="font-mono text-lg font-bold text-brand-600">{order.shipment.trackingNumber}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-charcoal-500">此訂單尚未建立物流資訊</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-charcoal-700 mb-1 block">物流商</label>
                <select value={carrier} onChange={(e) => setCarrier(e.target.value)}
                  className="w-full rounded-lg border border-charcoal-200 bg-white px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none">
                  <option>黑貓宅急便</option>
                  <option>新竹物流</option>
                  <option>宅配通</option>
                  <option>7-ELEVEN 交貨便</option>
                  <option>全家店到店</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700 mb-1 block">追蹤編號</label>
                <Input placeholder="輸入物流追蹤編號" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
              </div>
            </div>
            <Button className="gap-1.5">
              <Save className="h-4 w-4" /> 建立物流資訊
            </Button>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-3">
        <h2 className="font-semibold text-charcoal-800">商品明細</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-charcoal-50 last:border-0">
            <div>
              <p className="font-medium text-charcoal-800">{item.name}</p>
              <p className="text-charcoal-500">{item.variantName} x{item.quantity}</p>
            </div>
            <p className="font-semibold text-charcoal-800">{formatPrice(item.subtotal)}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-2 text-sm">
        <div className="flex justify-between text-charcoal-600"><span>小計</span><span>{formatPrice(order.subtotal)}</span></div>
        {order.discount > 0 && <div className="flex justify-between text-brand-600"><span>折扣</span><span>-{formatPrice(order.discount)}</span></div>}
        <div className="flex justify-between text-charcoal-600"><span>運費</span><span>{order.shippingFee === 0 ? "免運" : formatPrice(order.shippingFee)}</span></div>
        <div className="border-t border-charcoal-100 pt-2 flex justify-between text-lg font-bold text-charcoal-800">
          <span>總計</span><span>{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6">
        <h3 className="font-semibold text-charcoal-800 mb-2">收件資訊</h3>
        <p className="text-sm text-charcoal-600">{order.shippingName} {order.shippingPhone}</p>
        <p className="text-sm text-charcoal-600">{order.shippingAddress}</p>
      </div>
    </div>
  );
}
