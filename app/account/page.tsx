"use client";

import Link from "next/link";
import { User, Package, Heart, Ticket, MapPin, ChevronRight, Settings } from "lucide-react";
import { mockUser } from "@/lib/data";

const menuItems = [
  { icon: Package, label: "我的訂單", href: "/account/orders", desc: "查看訂單狀態與追蹤" },
  { icon: Heart, label: "收藏商品", href: "/account/favorites", desc: "您感興趣的商品" },
  { icon: Ticket, label: "我的優惠券", href: "/account/coupons", desc: "查看可用優惠券" },
  { icon: MapPin, label: "地址管理", href: "/account/addresses", desc: "管理收件地址" },
  { icon: User, label: "個人資料", href: "/account/profile", desc: "修改會員資料" },
];

export default function AccountPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal-800 mb-6">會員中心</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-charcoal-100 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-2xl font-bold">
              {mockUser.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-charcoal-800">{mockUser.name}</h2>
              <p className="text-sm text-charcoal-500">{mockUser.email}</p>
              <p className="text-sm text-charcoal-500">{mockUser.phone}</p>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 bg-white rounded-xl border border-charcoal-100 p-5 hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-brand-600">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-charcoal-800">{item.label}</p>
                <p className="text-xs text-charcoal-500">{item.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-charcoal-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
