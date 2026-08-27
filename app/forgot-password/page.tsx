"use client";

import Link from "next/link";
import { Cat, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 mb-4">
              <Cat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-800">忘記密碼？</h1>
            <p className="text-sm text-charcoal-500 mt-1">輸入您的電子郵件，我們將發送重設密碼連結</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="電子郵件" type="email" placeholder="meow@example.com" required />
            <Button type="submit" className="w-full gap-2">
              <Mail className="h-4 w-4" /> 發送重設連結
            </Button>
          </form>

          <Link href="/login" className="mt-6 flex items-center justify-center gap-1 text-sm text-brand-600 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" /> 返回登入
          </Link>
        </div>
      </div>
    </div>
  );
}
