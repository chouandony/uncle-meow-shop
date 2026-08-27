"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProductBySlug } from "@/lib/data";

export default function EditProductPage() {
  const params = useParams();
  const product = getProductBySlug(params.id as string);
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-cream-200 text-charcoal-500"><ArrowLeft className="h-5 w-5"/></Link>
        <h1 className="text-2xl font-bold text-charcoal-800">編輯商品</h1>
      </div>
      <div className="bg-white rounded-xl border border-charcoal-100 p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="商品名稱" defaultValue={product?.name} required />
          <Input label="SKU" defaultValue={product?.sku} required />
          <Input label="分類" defaultValue={product?.category} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="原價" type="number" defaultValue={product?.price} required />
            <Input label="特價" type="number" defaultValue={product?.salePrice||""} />
          </div>
          <Input label="庫存" type="number" defaultValue={product?.inventory} required />
          <Input label="重量 (kg)" type="number" defaultValue={product?.weight} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal-700">商品描述</label>
          <textarea rows={4} defaultValue={product?.description} className="w-full rounded-lg border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
        </div>
        <div className="flex gap-3">
          <Button>更新商品</Button>
          <Link href="/admin/products"><Button variant="secondary">取消</Button></Link>
        </div>
      </div>
    </div>
  );
}
