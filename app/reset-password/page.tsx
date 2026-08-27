"use client";

import Link from "next/link";
import { Cat, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal-800">密碼已重設</h1>
          <p className="text-charcoal-500 mt-2">您的密碼已成功更新，請使用新密碼登入。</p>
          <Link href="/login" className="mt-6 inline-block">
            <Button>前往登入</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 mb-4">
              <Cat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-800">重設密碼</h1>
            <p className="text-sm text-charcoal-500 mt-1">請設定您的新密碼</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="relative">
              <Input label="新密碼" type={showPassword ? "text" : "password"} placeholder="至少 8 個字元" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[34px] text-charcoal-400">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Input label="確認新密碼" type="password" placeholder="再次輸入新密碼" required />
            <Button type="submit" className="w-full">確認重設</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
