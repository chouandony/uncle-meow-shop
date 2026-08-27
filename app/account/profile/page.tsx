"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUser } from "@/lib/data";

export default function ProfilePage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-shop py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-charcoal-800 mb-6">個人資料</h1>
        <div className="bg-white rounded-xl border border-charcoal-100 p-6 space-y-6 max-w-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-2xl font-bold">
              {mockUser.name[0]}
            </div>
            <div>
              <p className="font-semibold text-charcoal-800">{mockUser.name}</p>
              <p className="text-sm text-charcoal-500">{mockUser.email}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="姓名" defaultValue={mockUser.name} />
            <Input label="電子郵件" type="email" defaultValue={mockUser.email} />
            <Input label="手機號碼" defaultValue={mockUser.phone} />
          </div>
          <Button>儲存變更</Button>
        </div>
      </div>
    </div>
  );
}
