"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Printer, Package, Truck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCode } from "@/components/shipping/qr-code";
import { getOrderById } from "@/lib/data";
import { formatPrice } from "@/lib/format";

type CarrierType = "hct" | "seven-eleven" | "family" | "ok";

interface LabelConfig {
  carrier: CarrierType;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  note: string;
}

export default function ShippingLabelPage() {
  const params = useParams();
  const order = getOrderById(params.id as string);

  const [config, setConfig] = useState<LabelConfig>({
    carrier: "hct",
    senderName: "Uncle Meow 喵大叔",
    senderPhone: "02-1234-5678",
    senderAddress: "台北市大安區忠孝東路四段 100 號",
    note: "",
  });

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-500">訂單不存在</p>
      </div>
    );
  }

  const totalPackages = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = order.items.reduce((sum, item) => sum + (item.quantity * 2.5), 0);

  const carrierOptions: { value: CarrierType; label: string; icon: React.ReactNode }[] = [
    { value: "hct", label: "新竹物流", icon: <Truck className="h-4 w-4" /> },
    { value: "seven-eleven", label: "7-ELEVEN 店到店", icon: <Store className="h-4 w-4" /> },
    { value: "family", label: "全家店到店", icon: <Store className="h-4 w-4" /> },
    { value: "ok", label: "OK 店到店", icon: <Store className="h-4 w-4" /> },
  ];

  const qrData = JSON.stringify({
    order: order.orderNumber,
    carrier: config.carrier,
    tracking: order.shipment?.trackingNumber || "",
    to: order.shippingName,
    phone: order.shippingPhone,
  });

  return (
    <div className="min-h-screen bg-charcoal-100">
      {/* 頂部工具列 */}
      <div className="sticky top-0 z-10 bg-white border-b border-charcoal-200 px-4 py-3 flex items-center justify-between print:hidden">
        <Link href={`/admin/orders/${order.id}`} className="flex items-center gap-2 text-charcoal-600 hover:text-brand-600">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">返回訂單</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-charcoal-400 hidden sm:inline">電腦按 Ctrl+P / Mac 按 Cmd+P</span>
          <Button size="sm" className="gap-1.5" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> 列印
          </Button>
        </div>
      </div>

      {/* 設定面板（不列印） */}
      <div className="max-w-4xl mx-auto p-4 print:hidden">
        <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-4">
          <h2 className="font-semibold text-charcoal-800">寄貨單設定</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">物流商</label>
              <div className="grid grid-cols-2 gap-2">
                {carrierOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setConfig({ ...config, carrier: opt.value })}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                      config.carrier === opt.value
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-charcoal-200 text-charcoal-600 hover:border-charcoal-300"
                    }`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">寄件人資訊</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.senderName}
                  onChange={(e) => setConfig({ ...config, senderName: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm"
                  placeholder="寄件人姓名/公司"
                />
                <input
                  type="text"
                  value={config.senderPhone}
                  onChange={(e) => setConfig({ ...config, senderPhone: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm"
                  placeholder="寄件人電話"
                />
                <input
                  type="text"
                  value={config.senderAddress}
                  onChange={(e) => setConfig({ ...config, senderAddress: e.target.value })}
                  className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm"
                  placeholder="寄件人地址"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">備註（印於寄貨單上）</label>
            <input
              type="text"
              value={config.note}
              onChange={(e) => setConfig({ ...config, note: e.target.value })}
              className="w-full rounded-lg border border-charcoal-200 px-3 py-2 text-sm"
              placeholder="例如：易碎物品、請電聯..."
            />
          </div>
        </div>
      </div>

      {/* 寄貨單預覽（可列印區域） */}
      <div className="max-w-[210mm] mx-auto p-4 md:p-8">
        {/* 新竹物流格式 */}
        {config.carrier === "hct" && (
          <div className="bg-white p-6 md:p-8 shadow-sm">
            {/* 表頭 */}
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-red-600 rounded flex items-center justify-center text-white font-bold text-lg">HCT</div>
                <div>
                  <h1 className="text-xl font-bold text-black">新竹物流 寄貨單</h1>
                  <p className="text-xs text-charcoal-500">HCT Logistics Shipping Label</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-charcoal-500">訂單編號</p>
                <p className="font-mono font-bold text-lg">{order.orderNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* 收件人 */}
              <div className="border-2 border-black p-3">
                <p className="text-xs font-bold text-red-600 mb-1">收件人 TO</p>
                <p className="text-lg font-bold text-black">{order.shippingName}</p>
                <p className="text-sm text-black">{order.shippingPhone}</p>
                <p className="text-sm text-black mt-1">{order.shippingAddress}</p>
              </div>
              {/* 寄件人 */}
              <div className="border-2 border-black p-3">
                <p className="text-xs font-bold text-blue-600 mb-1">寄件人 FROM</p>
                <p className="text-lg font-bold text-black">{config.senderName}</p>
                <p className="text-sm text-black">{config.senderPhone}</p>
                <p className="text-sm text-black mt-1">{config.senderAddress}</p>
              </div>
            </div>

            {/* 商品資訊 */}
            <div className="border border-black mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-2 py-1.5 border-b border-black">品名</th>
                    <th className="text-center px-2 py-1.5 border-b border-black">數量</th>
                    <th className="text-right px-2 py-1.5 border-b border-black">重量(kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-2 py-1.5">{item.name} {item.variantName ? `(${item.variantName})` : ""}</td>
                      <td className="px-2 py-1.5 text-center">{item.quantity}</td>
                      <td className="px-2 py-1.5 text-right">{(item.quantity * 2.5).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between px-2 py-1.5 text-sm font-bold bg-gray-50">
                <span>共 {totalPackages} 件 / 總重約 {totalWeight.toFixed(1)} kg</span>
                <span>總金額 {formatPrice(order.total)}</span>
              </div>
            </div>

            {/* QR + 條碼區 */}
            <div className="flex items-center justify-between border-2 border-dashed border-gray-400 p-4">
              <div className="flex items-center gap-4">
                <QRCode value={qrData} size={100} />
                <div>
                  <p className="text-xs text-charcoal-500">追蹤編號</p>
                  <p className="font-mono text-xl font-bold">{order.shipment?.trackingNumber || "待建立"}</p>
                  <p className="text-xs text-charcoal-400 mt-1">掃描查詢配送進度</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-charcoal-500">配送方式</p>
                <p className="font-bold">{order.shippingMethod}</p>
                {config.note && (
                  <p className="text-xs text-red-600 mt-1 font-bold">※ {config.note}</p>
                )}
              </div>
            </div>

            {/* 底部聲明 */}
            <div className="mt-4 text-center text-[10px] text-charcoal-400">
              <p>此為 Uncle Meow 喵大叔 內部寄貨單，僅供物流作業使用</p>
              <p>如有問題請聯繫 {config.senderPhone}</p>
            </div>
          </div>
        )}

        {/* 7-ELEVEN 店到店格式 */}
        {(config.carrier === "seven-eleven" || config.carrier === "family" || config.carrier === "ok") && (
          <div className="bg-white p-6 md:p-8 shadow-sm">
            {/* 表頭 */}
            <div className="flex items-center justify-between border-b-2 border-green-600 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded flex items-center justify-center text-white font-bold text-sm ${
                  config.carrier === "seven-eleven" ? "bg-green-600" :
                  config.carrier === "family" ? "bg-blue-600" : "bg-red-500"
                }`}>
                  {config.carrier === "seven-eleven" ? "7-E" : config.carrier === "family" ? "全家" : "OK"}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-black">
                    {config.carrier === "seven-eleven" ? "7-ELEVEN 交貨便" :
                     config.carrier === "family" ? "全家店到店" : "OK 超商到店"}
                  </h1>
                  <p className="text-xs text-charcoal-500">超商店到店服務</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-charcoal-500">店到店編號</p>
                <p className="font-mono font-bold text-lg">{order.shipment?.trackingNumber || order.orderNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* 收件人 */}
              <div className="border-2 border-green-600 p-3 rounded-lg">
                <p className="text-xs font-bold text-green-700 mb-1">取件人</p>
                <p className="text-lg font-bold text-black">{order.shippingName}</p>
                <p className="text-sm text-black">{order.shippingPhone}</p>
                <p className="text-xs text-charcoal-500 mt-2">請攜帶身分證件取件</p>
              </div>
              {/* 寄件人 */}
              <div className="border-2 border-blue-500 p-3 rounded-lg">
                <p className="text-xs font-bold text-blue-700 mb-1">寄件人</p>
                <p className="text-lg font-bold text-black">{config.senderName}</p>
                <p className="text-sm text-black">{config.senderPhone}</p>
                <p className="text-sm text-black mt-1">{config.senderAddress}</p>
              </div>
            </div>

            {/* 商品資訊 */}
            <div className="border border-gray-300 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="text-left px-3 py-2 border-b border-gray-200">品名</th>
                    <th className="text-center px-3 py-2 border-b border-gray-200">數量</th>
                    <th className="text-right px-3 py-2 border-b border-gray-200">小計</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">{formatPrice(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between px-3 py-2 text-sm font-bold bg-gray-50 rounded-b-lg">
                <span>共 {totalPackages} 件</span>
                <span>總金額 {formatPrice(order.total)}</span>
              </div>
            </div>

            {/* QR Code 區 */}
            <div className="flex items-center justify-center gap-6 border-2 border-dashed border-green-400 p-4 rounded-lg">
              <QRCode value={qrData} size={120} />
              <div className="text-center">
                <p className="text-xs text-charcoal-500 mb-1">店到店條碼</p>
                <p className="font-mono text-2xl font-bold tracking-wider">{order.shipment?.trackingNumber || order.orderNumber}</p>
                <p className="text-xs text-charcoal-400 mt-1">請出示此條碼給店員</p>
                {config.note && (
                  <p className="text-xs text-red-600 mt-1 font-bold">※ {config.note}</p>
                )}
              </div>
            </div>

            {/* 取件須知 */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800 font-bold">取件須知</p>
              <p className="text-xs text-yellow-700 mt-1">
                1. 請於到貨後 7 日內取件，逾期退回<br/>
                2. 取件時請出示身分證件及手機簡訊<br/>
                3. 包裹尺寸限制：長+寬+高 ≦ 105cm，重量 ≦ 5kg
              </p>
            </div>

            <div className="mt-4 text-center text-[10px] text-charcoal-400">
              <p>此為 Uncle Meow 喵大叔 內部寄貨單</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
