"use client";

import { AlertTriangle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useState } from "react";

export default function AdminInventoryPage() {
  const [inv, setInv] = useState(products.map(p => ({ id: p.id, name: p.name, sku: p.sku, inventory: p.inventory, lowStock: p.inventory < 100 })));

  const adjustStock = (id: string, delta: number) => {
    setInv(prev => prev.map(item => item.id === id ? { ...item, inventory: Math.max(0, item.inventory + delta) } : item));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal-800">庫存管理</h1>
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-charcoal-100 bg-cream-50">
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">商品</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">SKU</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">目前庫存</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">狀態</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">調整</th>
          </tr></thead>
          <tbody>
            {inv.map(item=> (
              <tr key={item.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                <td className="px-4 py-3 font-medium text-charcoal-800">{item.name}</td>
                <td className="px-4 py-3 text-charcoal-500 font-mono text-xs">{item.sku}</td>
                <td className="px-4 py-3 font-medium text-charcoal-800">{item.inventory}</td>
                <td className="px-4 py-3">
                  {item.inventory < 50 ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"><AlertTriangle className="h-3 w-3"/>嚴重不足</span>
                  : item.inventory < 100 ? <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">低庫存</span>
                  : <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">充足</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={()=>adjustStock(item.id,-10)} className="p-1 rounded hover:bg-cream-200 text-charcoal-500"><Minus className="h-4 w-4"/></button>
                    <button onClick={()=>adjustStock(item.id,10)} className="p-1 rounded hover:bg-cream-200 text-charcoal-500"><Plus className="h-4 w-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
