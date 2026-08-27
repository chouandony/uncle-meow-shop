"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cat, LayoutDashboard, Package, ShoppingCart, Users, Ticket, Warehouse, CreditCard, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "儀表板", href: "/admin/dashboard" },
  { icon: Package, label: "商品管理", href: "/admin/products" },
  { icon: ShoppingCart, label: "訂單管理", href: "/admin/orders" },
  { icon: Users, label: "會員管理", href: "/admin/customers" },
  { icon: Ticket, label: "優惠券管理", href: "/admin/coupons" },
  { icon: Warehouse, label: "庫存管理", href: "/admin/inventory" },
  { icon: CreditCard, label: "金流紀錄", href: "/admin/payments" },
  { icon: ClipboardList, label: "操作紀錄", href: "/admin/logs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 路由變更時自動關閉側邊欄
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // 防止背景捲動
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-charcoal-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal-900 text-white shrink-0">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-charcoal-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
            <Cat className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold">Uncle Meow</span>
            <span className="block text-[10px] text-brand-400 -mt-0.5">管理後台</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-brand-500 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white")}>
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-charcoal-800">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-charcoal-400 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" />返回前台
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* Mobile Sidebar Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-charcoal-900 text-white flex flex-col shadow-2xl lg:hidden animate-in slide-in-from-left duration-300">
            <div className="flex h-16 items-center gap-2 px-5 border-b border-charcoal-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500">
                <Cat className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold">Uncle Meow</span>
                <span className="block text-[10px] text-brand-400 -mt-0.5">管理後台</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="ml-auto p-2 rounded-lg hover:bg-charcoal-800 text-charcoal-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-brand-500 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white")}>
                  <item.icon className="h-4 w-4" />{item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-charcoal-800">
              <Link href="/" onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-charcoal-400 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />返回前台
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 md:h-16 bg-white border-b border-charcoal-200 flex items-center px-4 lg:px-8">
          {/* Mobile: hamburger + brand */}
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} 
              className="p-2 rounded-lg hover:bg-cream-100 text-charcoal-600 transition-colors"
              aria-label="開啟選單">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500">
                <Cat className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-charcoal-800">Uncle Meow</span>
                <span className="block text-[10px] text-brand-500 -mt-0.5">管理後台</span>
              </div>
            </div>
          </div>

          {/* Desktop: page title */}
          <h1 className="hidden lg:block text-lg font-semibold text-charcoal-800">
            {navItems.find(n => pathname === n.href || pathname.startsWith(n.href + "/"))?.label || "管理後台"}
          </h1>

          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-bold">
              管
            </div>
            <span className="text-sm text-charcoal-600 hidden sm:inline">管理員</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
