"use client";

import Link from "next/link";
import { Cat, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal-800 text-charcoal-300">
      <div className="container-shop py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500">
                <Cat className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white leading-tight">Uncle Meow</span>
                <span className="block text-xs text-brand-400 font-medium -mt-0.5">喵大叔</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-charcoal-400">
              專注於為貓咪與貓奴提供最高品質的貓砂與寵物用品，讓每一次鏟屎都是愉快的體驗。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">快速連結</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/shop", label: "全部商品" },
                { href: "/account/orders", label: "我的訂單" },
                { href: "/account", label: "會員中心" },
                { href: "/cart", label: "購物車" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-charcoal-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">商品分類</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/shop?category=tofu-litter", label: "豆腐砂" },
                { href: "/shop?category=clay-litter", label: "礦砂" },
                { href: "/shop?category=pine-litter", label: "松木砂" },
                { href: "/shop?category=mixed-litter", label: "混合砂" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-charcoal-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">聯絡我們</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-charcoal-400">
                <Mail className="h-4 w-4 shrink-0 mt-0.5 text-brand-400" />
                <span>hello@unclemeow.tw</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-charcoal-400">
                <Phone className="h-4 w-4 shrink-0 mt-0.5 text-brand-400" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-charcoal-400">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-400" />
                <span>台北市大安區忠孝東路四段 100 號</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-700 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-charcoal-500">
              © 2026 Uncle Meow 喵大叔. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-charcoal-500">
              <Link href="#" className="hover:text-charcoal-300">隱私政策</Link>
              <Link href="#" className="hover:text-charcoal-300">服務條款</Link>
              <Link href="#" className="hover:text-charcoal-300">退換貨政策</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
