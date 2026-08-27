"use client";

import Link from "next/link";
import { useState } from "react";
import { Cat, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 mb-4">
              <Cat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-800">加入喵大叔</h1>
            <p className="text-sm text-charcoal-500 mt-1">註冊即可享新會員首購 9 折</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="姓名" placeholder="您的稱呼" required />
            <Input label="電子郵件" type="email" placeholder="meow@example.com" required />
            <Input label="手機號碼" placeholder="0912-345-678" required />
            <div className="relative">
              <Input label="密碼" type={showPassword ? "text" : "password"} placeholder="至少 8 個字元" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-charcoal-400 hover:text-charcoal-600">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <label className="flex items-start gap-2 text-sm text-charcoal-600">
              <input type="checkbox" className="mt-1 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500" required />
              <span>我已閱讀並同意 <Link href="#" className="text-brand-600 hover:underline">服務條款</Link> 與 <Link href="#" className="text-brand-600 hover:underline">隱私政策</Link></span>
            </label>
            <Button type="submit" className="w-full">註冊</Button>
          </form>
          <div className="mt-6 text-center text-sm text-charcoal-500">
            已有帳號？ <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">立即登入</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
