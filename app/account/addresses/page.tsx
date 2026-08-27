"use client";

import { MapPin, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addresses } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function AddressesPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-charcoal-800">地址管理</h1>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> 新增地址
          </Button>
        </div>
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className={cn("bg-white rounded-xl border p-5", addr.isDefault ? "border-brand-500" : "border-charcoal-100")}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className={cn("h-5 w-5 shrink-0 mt-0.5", addr.isDefault ? "text-brand-500" : "text-charcoal-400")} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-charcoal-800">{addr.name}</p>
                      {addr.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                          <Check className="h-3 w-3" /> 預設
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-charcoal-500 mt-1">{addr.phone}</p>
                    <p className="text-sm text-charcoal-600 mt-1">{addr.zipCode} {addr.city}{addr.district}{addr.address}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="text-sm text-brand-600 hover:text-brand-700">編輯</button>
                  {!addr.isDefault && <button className="text-sm text-red-500 hover:text-red-700">刪除</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
