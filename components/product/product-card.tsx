"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/toast";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0];
    addToCart(product, defaultVariant, 1);
    showToast(`${product.name} 已加入購物車`, "success");
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  if (variant === "compact") {
    return (
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.salePrice && (
            <Badge variant="danger" className="absolute left-2 top-2 text-[10px]">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        <div className="mt-2 md:mt-3 space-y-0.5 md:space-y-1">
          <p className="text-[10px] md:text-xs text-charcoal-400">{product.category}</p>
          <h3 className="text-xs md:text-sm font-medium text-charcoal-800 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-[10px] md:text-xs text-charcoal-400">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm md:text-base font-bold text-brand-600">{formatPrice(product.salePrice)}</span>
                <span className="text-[10px] md:text-xs text-charcoal-400 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm md:text-base font-bold text-charcoal-800">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-charcoal-100 overflow-hidden card-hover">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.salePrice && (
            <Badge variant="danger" className="absolute left-2 top-2 md:left-3 md:top-3 text-[10px] md:text-xs">
              -{discountPercent}%
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <Link href={`/shop/${product.slug}`}>
          <p className="text-[10px] md:text-xs font-medium text-brand-600 mb-0.5 md:mb-1">{product.category}</p>
          <h3 className="text-xs md:text-sm font-semibold text-charcoal-800 line-clamp-2 group-hover:text-brand-600 transition-colors mb-1.5 md:mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-[10px] md:text-xs text-charcoal-400">({product.reviewCount})</span>
          <span className="text-[10px] md:text-xs text-charcoal-300">|</span>
          <span className="text-[10px] md:text-xs text-charcoal-400">已售 {product.soldCount}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            {product.salePrice ? (
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-base md:text-lg font-bold text-brand-600">{formatPrice(product.salePrice)}</span>
                <span className="text-xs md:text-sm text-charcoal-400 line-through">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="text-base md:text-lg font-bold text-charcoal-800">{formatPrice(product.price)}</span>
            )}
          </div>
          <Button
            variant="primary"
            size="sm"
            className="rounded-full h-8 w-8 md:h-9 md:w-9 p-0"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
