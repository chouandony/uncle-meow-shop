"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/data";

export default function FavoritesPage() {
  const favorites = products.slice(0, 3);

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal-800 mb-6">收藏商品</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-500">尚無收藏商品</p>
            <Link href="/shop" className="mt-4 inline-block">
              <Button>去逛逛</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
