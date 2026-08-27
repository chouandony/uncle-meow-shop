"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Package, Truck, MapPin, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getOrderById } from "@/lib/data";
import { getShipmentStatusLabel, getShipmentStatusColor } from "@/lib/data";
import { getOrderStatusLabel, getOrderStatusColor, formatPrice, formatDateTime, formatShortDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function OrderDetailPage() {
  const params = useParams();
  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <div className="container-shop py-20 text-center px-4">
        <h1 className="text-2xl font-bold text-charcoal-800">訂單不存在</h1>
        <Link href="/account/orders" className="mt-4 inline-block">
          <Button variant="secondary">返回訂單列表</Button>
        </Link>
      </div>
    );
  }

  const timeline = [
    { status: "PENDING", label: "訂單成立", time: order.createdAt, icon: Clock },
    { status: "PAID", label: "已付款", time: order.paidAt, icon: CheckCircle },
    { status: "SHIPPED", label: "已出貨", time: order.shippedAt, icon: Truck },
    { status: "DELIVERED", label: "已送達", time: order.deliveredAt, icon: Package },
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-4 md:py-8 max-w-3xl mx-auto px-4">
        <Link href="/account/orders" className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-brand-600 mb-4">
          <ChevronLeft className="h-4 w-4" /> 返回訂單列表
        </Link>

        <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 mb-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <p className="text-xs md:text-sm text-charcoal-500">訂單編號</p>
              <p className="text-lg md:text-xl font-bold text-charcoal-800">{order.orderNumber}</p>
            </div>
            <span className={cn("px-3 py-1 rounded-full text-xs md:text-sm font-medium", getOrderStatusColor(order.status))}>
              {getOrderStatusLabel(order.status)}
            </span>
          </div>

          {/* Order Timeline */}
          <div className="flex items-start gap-1 md:gap-2 mb-6 overflow-x-auto pb-2">
            {timeline.map((step, i) => {
              const isCompleted = !!step.time;
              return (
                <div key={step.status} className="flex items-center gap-1 md:gap-2 shrink-0">
                  <div className={cn("flex flex-col items-center min-w-[60px] md:min-w-[80px]", isCompleted ? "text-brand-600" : "text-charcoal-300")}>
                    <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                    <p className="text-[10px] md:text-xs mt-1 font-medium">{step.label}</p>
                    {step.time && <p className="text-[10px] text-charcoal-400">{formatShortDateTime(step.time).split(" ")[0]}</p>}
                  </div>
                  {i < timeline.length - 1 && <div className={cn("h-0.5 w-4 md:w-8 mt-3", isCompleted ? "bg-brand-500" : "bg-charcoal-200")} />}
                </div>
              );
            })}
          </div>

          {/* Shipment Tracking */}
          {order.shipment && (
            <div className="bg-cream-50 rounded-xl border border-charcoal-100 p-3 md:p-4 mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 md:h-5 md:w-5 text-brand-600" />
                  <h3 className="font-semibold text-charcoal-800 text-sm md:text-base">物流追蹤</h3>
                </div>
                <Badge className={cn(getShipmentStatusColor(order.shipment.status))}>
                  {getShipmentStatusLabel(order.shipment.status)}
                </Badge>
              </div>
              <div className="space-y-1 md:space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">物流商</span>
                  <span className="font-medium text-charcoal-800">{order.shipment.carrier}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500">追蹤編號</span>
                  <span className="font-mono font-medium text-brand-600">{order.shipment.trackingNumber}</span>
                </div>
                {order.shipment.estimatedDelivery && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-500">預計送達</span>
                    <span className="text-charcoal-800">{order.shipment.estimatedDelivery}</span>
                  </div>
                )}
              </div>

              {/* Tracking Events */}
              {order.shipment.events.length > 0 && (
                <div className="border-t border-charcoal-100 pt-3">
                  <h4 className="text-xs md:text-sm font-medium text-charcoal-700 mb-2">配送進度</h4>
                  <div className="space-y-3">
                    {order.shipment.events.map((event, i) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={cn("h-2.5 w-2.5 rounded-full", i === 0 ? "bg-brand-500" : "bg-charcoal-300")} />
                          {i < order.shipment!.events.length - 1 && <div className="w-0.5 h-full bg-charcoal-200 mt-1" />}
                        </div>
                        <div className="pb-3">
                          <p className="text-xs md:text-sm font-medium text-charcoal-800">{event.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <MapPin className="h-3 w-3 text-charcoal-400" />
                            <span className="text-[10px] md:text-xs text-charcoal-500">{event.location}</span>
                            <span className="text-[10px] md:text-xs text-charcoal-400">{formatShortDateTime(event.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Items */}
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            <h3 className="font-semibold text-charcoal-800 text-sm md:text-base">商品明細</h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3 md:gap-4">
                <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal-800">{item.name}</p>
                  {item.variantName && <p className="text-xs text-charcoal-500">規格：{item.variantName}</p>}
                  <p className="text-xs text-charcoal-500">數量：{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-charcoal-800">{formatPrice(item.subtotal)}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-charcoal-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-charcoal-600"><span>商品小計</span><span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-brand-600"><span>優惠折扣</span><span>-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between text-charcoal-600"><span>運費</span><span>{order.shippingFee === 0 ? "免運" : formatPrice(order.shippingFee)}</span></div>
            <div className="border-t border-charcoal-100 pt-2 flex justify-between text-base md:text-lg font-bold text-charcoal-800">
              <span>訂單總額</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-charcoal-100 pt-4 mt-4">
            <h3 className="font-semibold text-charcoal-800 mb-2 text-sm md:text-base">配送資訊</h3>
            <div className="text-sm text-charcoal-600 space-y-1">
              <p>收件人：{order.shippingName} {order.shippingPhone}</p>
              <p>地址：{order.shippingAddress}</p>
              <p>配送方式：{order.shippingMethod}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1">再買一次</Button>
          {order.status === "PENDING" && <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">取消訂單</Button>}
        </div>
      </div>
    </div>
  );
}
