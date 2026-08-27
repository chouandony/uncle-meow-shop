"use client";

import { Suspense } from "react";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { categories, products, searchProducts } from "@/lib/data";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

function ShopContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products];
    if (categorySlug) {
      result = result.filter((p) => p.categorySlug === categorySlug);
    }
    result = result.filter((p) => {
      const price = p.salePrice ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }
    return result;
  }, [categorySlug, searchQuery, sortBy, priceRange]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="bg-white border-b border-charcoal-100">
        <div className="container-shop py-6">
          <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-2">
            <Link href="/" className="hover:text-brand-600">首頁</Link>
            <span>/</span>
            <span className="text-charcoal-800 font-medium">{activeCategory?.name || searchQuery || "全部商品"}</span>
          </div>
          <h1 className="text-2xl font-bold text-charcoal-800">
            {searchQuery ? `「${searchQuery}」的搜尋結果` : activeCategory?.name || "全部商品"}
          </h1>
          <p className="text-sm text-charcoal-500 mt-1">共 {filteredProducts.length} 件商品</p>
        </div>
      </div>

      <div className="container-shop py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={cn("lg:w-64 shrink-0 space-y-6", showFilters ? "block" : "hidden lg:block")}>
            <div className="bg-white rounded-xl border border-charcoal-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-charcoal-800">篩選條件</h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-medium text-charcoal-700 mb-2">商品分類</h4>
                <Link href="/shop" className={cn("block rounded-lg px-3 py-2 text-sm transition-colors", !categorySlug ? "bg-brand-50 text-brand-700 font-medium" : "text-charcoal-600 hover:bg-cream-100")}>
                  全部商品
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/shop?category=${cat.slug}`}
                    className={cn("block rounded-lg px-3 py-2 text-sm transition-colors", categorySlug === cat.slug ? "bg-brand-50 text-brand-700 font-medium" : "text-charcoal-600 hover:bg-cream-100")}>
                    {cat.name}
                  </Link>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-charcoal-700 mb-3">價格區間</h4>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 rounded-lg border border-charcoal-200 px-2 py-1.5 text-sm text-center" />
                  <span className="text-charcoal-400">-</span>
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 rounded-lg border border-charcoal-200 px-2 py-1.5 text-sm text-center" />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 rounded-lg border border-charcoal-200 bg-white px-4 py-2 text-sm font-medium text-charcoal-700">
                <SlidersHorizontal className="h-4 w-4" />篩選
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-charcoal-500 hidden sm:inline">排序：</span>
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none rounded-lg border border-charcoal-200 bg-white pl-4 pr-10 py-2 text-sm text-charcoal-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                    <option value="featured">精選推薦</option>
                    <option value="price-asc">價格低到高</option>
                    <option value="price-desc">價格高到低</option>
                    <option value="rating">評分最高</option>
                    <option value="newest">最新上架</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-charcoal-700">找不到符合條件的商品</p>
                <p className="text-sm text-charcoal-500 mt-1">請嘗試調整篩選條件或搜尋關鍵字</p>
                <Link href="/shop" className="mt-4">
                  <Button variant="outline">查看全部商品</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-500">載入中...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
