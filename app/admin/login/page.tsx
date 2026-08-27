"use client";

import Link from "next/link";
import { useState } from "react";
import { Cat, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-charcoal-800 rounded-2xl border border-charcoal-700 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 mb-4">
              <Cat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">管理員登入</h1>
            <p className="text-sm text-charcoal-400 mt-1">Uncle Meow 喵大叔 管理後台</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="管理員帳號" type="email" placeholder="admin@unclemeow.tw" required className="bg-charcoal-900 border-charcoal-600 text-white placeholder:text-charcoal-500" />
            <div className="relative">
              <Input label="密碼" type={showPassword ? "text" : "password"} placeholder="••••••••" required className="bg-charcoal-900 border-charcoal-600 text-white placeholder:text-charcoal-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-charcoal-500">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Link href="/admin/dashboard">
              <Button type="submit" className="w-full mt-2">登入</Button>
            </Link>
          </form>
          <Link href="/" className="mt-6 block text-center text-sm text-charcoal-500 hover:text-charcoal-300">← 返回前台</Link>
        </div>
      </div>
    </div>
  );
}
