"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useState } from "react";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-charcoal-800">商品管理</h1>
        <Link href="/admin/products/new"><Button className="gap-2"><Plus className="h-4 w-4" />新增商品</Button></Link>
      </div>
      <div className="bg-white rounded-xl border border-charcoal-100">
        <div className="p-4 border-b border-charcoal-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <input type="text" placeholder="搜尋商品..." value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full rounded-lg border border-charcoal-200 pl-10 pr-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-charcoal-100 bg-cream-50">
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">商品</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">分類</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">價格</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">庫存</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">狀態</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">操作</th>
            </tr></thead>
            <tbody>
              {filtered.map(p=> (
                <tr key={p.id} className="border-b border-charcoal-50 hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-charcoal-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{p.category}</td>
                  <td className="px-4 py-3">
                    {p.salePrice ? <div><span className="font-medium text-brand-600">{formatPrice(p.salePrice)}</span><span className="text-xs text-charcoal-400 line-through ml-1">{formatPrice(p.price)}</span></div>
                    : <span className="font-medium text-charcoal-800">{formatPrice(p.price)}</span>}
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{p.inventory}</td>
                  <td className="px-4 py-3"><Badge variant={p.status==="ACTIVE"?"success":"default"}>{p.status==="ACTIVE"?"上架中":"已下架"}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${p.id}/edit`} className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-500 hover:text-brand-600"><Pencil className="h-4 w-4"/></Link>
                      <Link href={`/shop/${p.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-500 hover:text-brand-600"><Eye className="h-4 w-4"/></Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
