"use client";

import Link from "next/link";
import { useState } from "react";
import { Cat, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 mb-4">
              <Cat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-800">歡迎回來</h1>
            <p className="text-sm text-charcoal-500 mt-1">登入 Uncle Meow 喵大叔會員</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="電子郵件" type="email" placeholder="meow@example.com" required />
            <div className="relative">
              <Input label="密碼" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-charcoal-400 hover:text-charcoal-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-charcoal-600">
                <input type="checkbox" className="rounded border-charcoal-300 text-brand-500 focus:ring-brand-500" />
                記住我
              </label>
              <Link href="/forgot-password" className="text-brand-600 hover:text-brand-700">忘記密碼？</Link>
            </div>

            <Button type="submit" className="w-full">登入</Button>
          </form>

          <div className="mt-6 text-center text-sm text-charcoal-500">
            還沒有帳號？{" "}
            <Link href="/register" className="font-medium text-brand-600 hover:text-brand-700">立即註冊</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
