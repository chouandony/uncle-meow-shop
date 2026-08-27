import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ToastProvider } from "@/components/ui/toast";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Uncle Meow 喵大叔 - 貓砂專賣",
    template: "%s | Uncle Meow 喵大叔",
  },
  description: "專業貓砂與寵物用品電商，提供豆腐砂、礦砂、松木砂、混合砂等高品質貓砂產品。",
  keywords: ["貓砂", "豆腐砂", "礦砂", "松木砂", "寵物用品", "貓咪"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.variable} font-sans`}>
        <CartProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
