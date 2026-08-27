"use client";

import { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, Share2, Truck, Shield, RotateCcw, Check, ShoppingCart, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { ProductCard } from "@/components/product/product-card";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/components/ui/toast";
import { getProductBySlug, products, getReviewsByProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types";

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}

function ProductDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  if (!product) {
    return (
      <div className="container-shop py-20 text-center px-4">
        <h1 className="text-2xl font-bold text-charcoal-800">商品不存在</h1>
        <p className="text-charcoal-500 mt-2">您要找的商品可能已下架或網址有誤</p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>返回商品列表</Button>
        </Link>
      </div>
    );
  }

  const reviews = getReviewsByProduct(product.id);
  const currentPrice = selectedVariant?.salePrice ?? selectedVariant?.price ?? product.salePrice ?? product.price;
  const originalPrice = selectedVariant?.price ?? product.price;
  const currentInventory = selectedVariant?.inventory ?? product.inventory;
  const relatedProducts = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    showToast("已加入購物車", "success");
  };

  const discountPercent = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <div className="bg-cream-50 min-h-screen pb-24 md:pb-0">
      {/* Mobile: Sticky bottom CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-charcoal-100 p-3 md:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-lg font-bold text-brand-600">{formatPrice(currentPrice)}</p>
          </div>
          <Button size="sm" className="flex-1 gap-1.5" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" /> 加入購物車
          </Button>
          <Button size="sm" className="flex-1 bg-charcoal-800 hover:bg-charcoal-900" onClick={() => { handleAddToCart(); window.location.href = "/cart"; }}>
            立即購買
          </Button>
        </div>
      </div>

      <div className="container-shop py-4 md:py-6 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-4">
          <Link href="/" className="hover:text-brand-600">首頁</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-brand-600 hidden sm:inline">{product.category}</Link>
          <span className="hidden sm:inline">/</span>
          <span className="text-charcoal-800 truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-charcoal-100">
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" priority />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={cn("relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all", selectedImage === i ? "border-brand-500" : "border-transparent")}>
                  <Image src={img} alt={`${product.name} - ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="default">{product.category}</Badge>
                {product.salePrice && <Badge variant="danger">-{discountPercent}%</Badge>}
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal-800 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={product.rating} size="sm" showValue reviewCount={product.reviewCount} />
                <span className="text-xs text-charcoal-400">|</span>
                <span className="text-xs text-charcoal-500">已售 {product.soldCount}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-2xl md:text-3xl font-bold text-brand-600">{formatPrice(currentPrice)}</span>
              {currentPrice < originalPrice && <span className="text-sm md:text-lg text-charcoal-400 line-through">{formatPrice(originalPrice)}</span>}
            </div>

            <p className="text-sm md:text-base text-charcoal-600 leading-relaxed">{product.shortDesc}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-charcoal-700 mb-2">選擇規格</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button key={v.id} onClick={() => setSelectedVariant(v)} className={cn("rounded-lg border px-3 py-2 md:px-4 md:py-2 text-sm font-medium transition-all min-h-[44px]", selectedVariant?.id === v.id ? "border-brand-500 bg-brand-50 text-brand-700" : "border-charcoal-200 text-charcoal-600")}>
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity - Desktop only (mobile has sticky bar) */}
            <div className="hidden md:block">
              <h3 className="text-sm font-medium text-charcoal-700 mb-2">數量</h3>
              <QuantitySelector value={quantity} onChange={setQuantity} max={currentInventory} />
              <p className="text-xs text-charcoal-400 mt-1">庫存：{currentInventory} 件</p>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-3 pt-2">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" /> 加入購物車
              </Button>
              <Button variant="primary" size="lg" className="flex-1 bg-charcoal-800 hover:bg-charcoal-900" onClick={() => { handleAddToCart(); window.location.href = "/cart"; }}>
                立即購買
              </Button>
              <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-charcoal-200 text-charcoal-500 hover:bg-cream-100 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t border-charcoal-100">
              {[{icon: Truck, text: "滿 $999 免運"}, {icon: Shield, text: "品質保證"}, {icon: RotateCcw, text: "7 天鑑賞期"}].map((f) => (
                <div key={f.text} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-charcoal-600 text-center sm:text-left">
                  <f.icon className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 md:mt-16">
          <div className="flex border-b border-charcoal-200 overflow-x-auto">
            {[{key: "desc" as const, label: "商品介紹"}, {key: "specs" as const, label: "規格說明"}, {key: "reviews" as const, label: `商品評價 (${reviews.length})`}].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={cn("px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors shrink-0", activeTab === tab.key ? "border-brand-500 text-brand-600" : "border-transparent text-charcoal-500")}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="py-6 md:py-8">
            {activeTab === "desc" && (
              <div className="max-w-3xl space-y-6">
                <p className="text-sm md:text-base text-charcoal-600 leading-relaxed">{product.description}</p>
                {product.features && (
                  <div>
                    <h3 className="font-semibold text-charcoal-800 mb-3">商品特色</h3>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm md:text-base text-charcoal-600">
                          <Check className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {activeTab === "specs" && product.specs && (
              <div className="max-w-xl">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-charcoal-100">
                        <td className="py-3 text-charcoal-500 w-24 md:w-32">{key}</td>
                        <td className="py-3 text-charcoal-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-6">
                {reviews.length > 0 ? reviews.map((review) => (
                  <div key={review.id} className="border-b border-charcoal-100 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-bold">{review.userName[0]}</div>
                      <div>
                        <p className="text-sm font-medium text-charcoal-800">{review.userName}</p>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                    </div>
                    <h4 className="font-medium text-charcoal-800 mt-2">{review.title}</h4>
                    <p className="text-sm text-charcoal-600 mt-1">{review.content}</p>
                  </div>
                )) : <p className="text-charcoal-500">尚無評價</p>}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-charcoal-100">
            <h2 className="text-lg md:text-xl font-bold text-charcoal-800 mb-4 md:mb-6">相關商品</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} variant="compact" />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
