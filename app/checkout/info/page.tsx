"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRight, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addresses } from "@/lib/data";
import { cn } from "@/lib/utils";

const steps = [
  { label: "購物車", href: "/cart" },
  { label: "收件資訊", href: "/checkout/info", active: true },
  { label: "配送方式", href: "/checkout/shipping" },
  { label: "付款方式", href: "/checkout/payment" },
  { label: "確認訂單", href: "/checkout/confirm" },
];

export default function CheckoutInfoPage() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", district: "", address: "", zipCode: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/checkout/shipping");
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-4 md:py-8 max-w-3xl mx-auto px-4">
        {/* Steps - mobile: horizontal scroll */}
        <div className="flex items-center gap-1 md:gap-2 mb-6 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1 md:gap-2 shrink-0">
              <Link href={step.href} className={cn("text-xs md:text-sm font-medium px-2 py-1 rounded-lg transition-colors whitespace-nowrap", step.active ? "bg-brand-500 text-white" : "text-charcoal-500 hover:text-charcoal-700")}>
                {step.label}
              </Link>
              {i < steps.length - 1 && <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-charcoal-300 shrink-0" />}
            </div>
          ))}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-charcoal-800 mb-4 md:mb-6">收件資訊</h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {addresses.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-charcoal-700">選擇已儲存地址</h2>
              <div className="grid gap-3">
                {addresses.map((addr) => (
                  <button key={addr.id} type="button" onClick={() => setSelectedAddress(addr.id)}
                    className={cn("flex items-start gap-3 rounded-xl border p-3 md:p-4 text-left transition-all", selectedAddress === addr.id ? "border-brand-500 bg-brand-50" : "border-charcoal-200 bg-white hover:border-charcoal-300")}>
                    <MapPin className={cn("h-5 w-5 shrink-0 mt-0.5", selectedAddress === addr.id ? "text-brand-500" : "text-charcoal-400")} />
                    <div className="text-sm">
                      <p className="font-medium text-charcoal-800">{addr.name} {addr.phone}</p>
                      <p className="text-charcoal-500 mt-0.5">{addr.zipCode} {addr.city}{addr.district}{addr.address}</p>
                      {addr.isDefault && <span className="inline-block mt-1 text-xs text-brand-600 font-medium">預設地址</span>}
                    </div>
                  </button>
                ))}
              </div>
              <button type="button" className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700">
                <Plus className="h-4 w-4" /> 新增地址
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl border border-charcoal-100 p-4 md:p-6 space-y-4">
            <h2 className="text-sm font-medium text-charcoal-700">或使用新地址</h2>
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              <Input label="收件人姓名" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Input label="聯絡電話" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <Input label="郵遞區號" required value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />
              <Input label="縣市" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              <Input label="鄉鎮市區" required value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
              <div className="sm:col-span-2">
                <Input label="詳細地址" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
            <Link href="/cart" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">← 返回購物車</Button>
            </Link>
            <Button type="submit" size="lg" className="w-full sm:w-auto">下一步：配送方式</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
