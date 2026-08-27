"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { categories, getFeaturedProducts } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-5 h-48 w-48 md:h-64 md:w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-5 h-64 w-64 md:h-96 md:w-96 rounded-full bg-brand-300 blur-3xl" />
        </div>
        <div className="container-shop relative py-10 md:py-16 lg:py-24 px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs md:text-sm font-medium backdrop-blur-sm">
                本週優惠
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                給貓咪最舒適的<br />
                <span className="text-brand-200">如廁體驗</span>
              </h1>
              <p className="text-sm md:text-lg text-brand-100 max-w-lg mx-auto lg:mx-0">
                Uncle Meow 喵大叔嚴選天然貓砂，豆腐砂、礦砂、混合砂一站購足。滿 $999 免運，新會員首購享 9 折。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    立即選購 <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/shop?category=tofu-litter">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    查看豆腐砂
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[300px] lg:h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=500&fit=crop"
                alt="貓咪與貓砂"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b border-charcoal-100">
        <div className="container-shop py-4 md:py-8 px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Truck, title: "滿 $999 免運", desc: "全台宅配到府" },
              { icon: Shield, title: "品質保證", desc: "嚴選天然原料" },
              { icon: RotateCcw, title: "7 天鑑賞期", desc: "不滿意可退換" },
              { icon: Headphones, title: "專業客服", desc: "週一至週五 9:00-18:00" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-cream-200 text-brand-600">
                  <f.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-charcoal-800">{f.title}</p>
                  <p className="text-[10px] md:text-xs text-charcoal-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-shop py-8 md:py-16 px-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal-800">商品分類</h2>
          <Link href="/shop" className="text-xs md:text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
            查看全部 <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                  <p className="text-xs md:text-sm font-bold text-white">{cat.name}</p>
                  <p className="text-[10px] md:text-xs text-white/80">{cat.productCount} 件商品</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-cream-50 py-8 md:py-16">
        <div className="container-shop px-4">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal-800">熱門推薦</h2>
              <p className="text-xs md:text-sm text-charcoal-500 mt-1">貓奴們最愛的精選商品</p>
            </div>
            <Link href="/shop" className="text-xs md:text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              查看全部 <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="container-shop py-8 md:py-16 px-4">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-3 md:space-y-4">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs md:text-sm font-medium">
                本週優惠
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">經典豆腐砂 6L</h2>
              <p className="text-xs md:text-base text-brand-100">天然豌豆纖維，3秒凝結，可沖馬桶。限時特價中！</p>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl font-bold">$249</span>
                <span className="text-sm md:text-lg text-brand-200 line-through">$299</span>
              </div>
              <Link href="/shop/classic-tofu-litter-original-6l">
                <Button variant="secondary" size="lg" className="mt-1 md:mt-2 w-full sm:w-auto">
                  立即搶購
                </Button>
              </Link>
            </div>
            <div className="relative h-48 md:h-64 lg:h-80">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=400&fit=crop"
                alt="本週優惠"
                fill
                className="object-cover rounded-xl md:rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-white py-8 md:py-16 border-t border-charcoal-100">
        <div className="container-shop px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-56 md:h-80 lg:h-96 rounded-2xl md:rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=500&fit=crop"
                alt="品牌故事"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
              <span className="text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase">品牌故事</span>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-800">為什麼選擇喵大叔？</h2>
              <p className="text-sm md:text-base text-charcoal-500 leading-relaxed">
                Uncle Meow 喵大叔誕生於一個簡單的信念：貓咪值得最好的。我們親自走訪原料產地，嚴選天然、無害的貓砂產品，只為了讓每一位貓奴都能安心，讓每一隻貓咪都能享受舒適的如廁時光。
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-2 md:pt-4">
                {[
                  { num: "10,000+", label: "滿意貓奴" },
                  { num: "50,000+", label: "包貓砂售出" },
                  { num: "4.8", label: "平均評分" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl md:text-2xl font-bold text-brand-600">{stat.num}</p>
                    <p className="text-[10px] md:text-sm text-charcoal-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
