"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Search, ShoppingCart, User, Menu, X, Cat } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "/shop", label: "全部商品" },
    { href: "/shop?category=tofu-litter", label: "豆腐砂" },
    { href: "/shop?category=clay-litter", label: "礦砂" },
    { href: "/shop?category=mixed-litter", label: "混合砂" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-charcoal-100">
      {/* Top bar */}
      <div className="bg-brand-500 text-white text-xs py-1.5">
        <div className="container-shop flex items-center justify-center gap-4">
          <span>🎉 新會員註冊享首購 9 折優惠</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">滿 $999 免運費</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container-shop">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500">
              <Cat className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-charcoal-800 leading-tight">Uncle Meow</span>
              <span className="block text-xs text-brand-500 font-medium -mt-0.5">喵大叔</span>
            </div>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <form action="/shop" className="relative w-full">
              <input
                type="text"
                name="q"
                placeholder="搜尋貓砂、貓砂盆..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-charcoal-200 bg-cream-50 pl-4 pr-12 py-2.5 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/account"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 hover:bg-cream-100 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">會員</span>
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-charcoal-600 hover:bg-cream-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden lg:inline">購物車</span>
              {cart.itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                  {cart.itemCount > 99 ? "99+" : cart.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center rounded-lg p-2 text-charcoal-600 hover:bg-cream-100"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav - Desktop */}
      <nav className="hidden lg:block border-t border-charcoal-100">
        <div className="container-shop">
          <div className="flex items-center gap-1 h-11">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-charcoal-600 hover:bg-cream-100 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden border-t border-charcoal-100 bg-white overflow-hidden transition-all duration-300",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-shop py-4 space-y-3">
          {/* Mobile search */}
          <form action="/shop" className="relative">
            <input
              type="text"
              name="q"
              placeholder="搜尋商品..."
              className="w-full rounded-lg border border-charcoal-200 bg-cream-50 pl-4 pr-10 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-400" />
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-cream-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
