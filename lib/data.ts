"use client";

import type { Product, Category, Coupon, Address, Order, Review, User, AdminDashboardStats, PaymentMethod, Shipment, ShipmentEvent } from "@/types";

export const categories: Category[] = [
  { id: "cat-1", name: "豆腐砂", slug: "tofu-litter", description: "天然可分解，凝結力強，可直接沖馬桶", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop", productCount: 12 },
  { id: "cat-2", name: "礦砂", slug: "clay-litter", description: "強力除臭，快速凝結，經濟實惠", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop", productCount: 8 },
  { id: "cat-3", name: "松木砂", slug: "pine-litter", description: "天然松木香氣，吸濕除臭效果佳", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop", productCount: 5 },
  { id: "cat-4", name: "水晶砂", slug: "crystal-litter", description: "高效吸水，長效除臭，低粉塵", image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop", productCount: 4 },
  { id: "cat-5", name: "混合砂", slug: "mixed-litter", description: "結合多種優點，全方位貓砂體驗", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=300&fit=crop", productCount: 6 },
  { id: "cat-6", name: "貓砂盆", slug: "litter-box", description: "各種尺寸與設計，讓貓咪舒適如廁", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=300&fit=crop", productCount: 3 },
];

export const products: Product[] = [
  {
    id: "p-1", sku: "UM-TOFU-001", name: "喵大叔 經典豆腐砂 原味 6L", slug: "classic-tofu-litter-original-6l",
    description: "採用天然豌豆纖維製作，無添加化學香料，凝結力強，可直接沖入馬桶。低粉塵設計，保護貓咪呼吸道健康。",
    shortDesc: "天然豌豆纖維，低粉塵，可沖馬桶", category: "豆腐砂", categorySlug: "tofu-litter",
    images: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop"],
    price: 299, salePrice: 249, inventory: 150, weight: 2.5, status: "ACTIVE", rating: 4.8, reviewCount: 328, soldCount: 2156, isFeatured: true,
    variants: [
      { id: "v-1-1", name: "原味", sku: "UM-TOFU-001-O", price: 299, salePrice: 249, inventory: 80, weight: 2.5 },
      { id: "v-1-2", name: "綠茶", sku: "UM-TOFU-001-G", price: 329, salePrice: 279, inventory: 45, weight: 2.5 },
      { id: "v-1-3", name: "蜜桃", sku: "UM-TOFU-001-P", price: 329, salePrice: 279, inventory: 25, weight: 2.5 },
    ],
    features: ["天然豌豆纖維原料","3秒快速凝結","可沖入馬桶","低粉塵配方","強效除臭"],
    specs: { 容量: "6L", 重量: "約2.5kg", 原料: "豌豆纖維、玉米澱粉", 產地: "台灣", 保存期限: "3年" },
  },
  {
    id: "p-2", sku: "UM-TOFU-002", name: "喵大叔 極細豆腐砂 2.0mm 6L", slug: "ultra-fine-tofu-litter-6l",
    description: "2.0mm 極細顆粒，貓咪腳感更舒適。升級凝結配方，結團更緊實不易散。",
    shortDesc: "2.0mm極細顆粒，貓咪腳感升級", category: "豆腐砂", categorySlug: "tofu-litter",
    images: ["https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop"],
    price: 349, salePrice: 299, inventory: 95, weight: 2.5, status: "ACTIVE", rating: 4.9, reviewCount: 156, soldCount: 987, isFeatured: true,
    variants: [
      { id: "v-2-1", name: "原味", sku: "UM-TOFU-002-O", price: 349, salePrice: 299, inventory: 50, weight: 2.5 },
      { id: "v-2-2", name: "活性碳", sku: "UM-TOFU-002-C", price: 379, salePrice: 329, inventory: 45, weight: 2.5 },
    ],
    features: ["2.0mm 極細顆粒","貓咪腳感極佳","升級凝結配方","低粉塵","可沖馬桶"],
    specs: { 容量: "6L", 重量: "約2.5kg", 顆粒大小: "2.0mm", 原料: "豌豆纖維、玉米澱粉、活性碳", 產地: "台灣" },
  },
  {
    id: "p-3", sku: "UM-CLAY-001", name: "喵大叔 強效除臭礦砂 10L", slug: "deodorizing-clay-litter-10l",
    description: "採用優質膨潤土，強效凝結除臭。大容量包裝，多貓家庭首選。",
    shortDesc: "強效除臭，大容量，多貓家庭首選", category: "礦砂", categorySlug: "clay-litter",
    images: ["https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&h=600&fit=crop"],
    price: 199, salePrice: null, inventory: 200, weight: 8.5, status: "ACTIVE", rating: 4.6, reviewCount: 512, soldCount: 3421, isFeatured: true,
    variants: [
      { id: "v-3-1", name: "原味", sku: "UM-CLAY-001-O", price: 199, salePrice: null, inventory: 120, weight: 8.5 },
      { id: "v-3-2", name: "薰衣草", sku: "UM-CLAY-001-L", price: 229, salePrice: null, inventory: 80, weight: 8.5 },
    ],
    features: ["優質膨潤土","強效凝結","長效除臭","大容量 10L","經濟實惠"],
    specs: { 容量: "10L", 重量: "約8.5kg", 原料: "天然膨潤土", 產地: "美國" },
  },
  {
    id: "p-4", sku: "UM-PINE-001", name: "喵大叔 天然松木砂 5L", slug: "natural-pine-litter-5l",
    description: "100% 天然松木製成，自然分解，環保無負擔。松木天然香氣，有效掩蓋異味。",
    shortDesc: "100%天然松木，環保可分解", category: "松木砂", categorySlug: "pine-litter",
    images: ["https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&h=600&fit=crop"],
    price: 259, salePrice: 229, inventory: 60, weight: 3.0, status: "ACTIVE", rating: 4.5, reviewCount: 89, soldCount: 456, isFeatured: false,
    features: ["100% 天然松木","自然分解環保","天然松木香氣","低粉塵","可堆肥"],
    specs: { 容量: "5L", 重量: "約3.0kg", 原料: "天然松木", 產地: "加拿大" },
  },
  {
    id: "p-5", sku: "UM-CRYSTAL-001", name: "喵大叔 高效水晶砂 3.8L", slug: "efficient-crystal-litter-38l",
    description: "矽膠水晶砂，超強吸水力，長效使用。透明顆粒，方便觀察貓咪健康狀況。",
    shortDesc: "超強吸水，長效使用，方便觀察健康", category: "水晶砂", categorySlug: "crystal-litter",
    images: ["https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=600&fit=crop"],
    price: 399, salePrice: 349, inventory: 40, weight: 1.8, status: "ACTIVE", rating: 4.4, reviewCount: 67, soldCount: 234, isFeatured: false,
    features: ["超強吸水力","長效使用","透明顆粒","低粉塵","輕量化"],
    specs: { 容量: "3.8L", 重量: "約1.8kg", 原料: "矽膠", 產地: "中國" },
  },
  {
    id: "p-6", sku: "UM-MIXED-001", name: "喵大叔 黃金比例混合砂 6L", slug: "golden-ratio-mixed-litter-6l",
    description: "豆腐砂 + 礦砂 + 活性碳黃金比例混合，結合多種優點。凝結力強、除臭佳、腳感好。",
    shortDesc: "黃金比例混合，全方位貓砂體驗", category: "混合砂", categorySlug: "mixed-litter",
    images: ["https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop"],
    price: 329, salePrice: 279, inventory: 75, weight: 2.8, status: "ACTIVE", rating: 4.7, reviewCount: 198, soldCount: 876, isFeatured: true,
    features: ["豆腐砂+礦砂+活性碳","黃金比例調配","強效凝結","長效除臭","貓咪腳感佳"],
    specs: { 容量: "6L", 重量: "約2.8kg", 原料: "豌豆纖維、膨潤土、活性碳", 產地: "台灣" },
  },
  {
    id: "p-7", sku: "UM-TOFU-003", name: "喵大叔 活性炭豆腐砂 6L", slug: "activated-carbon-tofu-litter-6l",
    description: "添加天然活性碳，強效吸附異味分子。適合對氣味敏感的家庭。",
    shortDesc: "活性碳添加，強效吸附異味", category: "豆腐砂", categorySlug: "tofu-litter",
    images: ["https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop"],
    price: 349, salePrice: 299, inventory: 110, weight: 2.5, status: "ACTIVE", rating: 4.7, reviewCount: 245, soldCount: 1567, isFeatured: false,
  },
  {
    id: "p-8", sku: "UM-BOX-001", name: "喵大叔 全封閉式貓砂盆", slug: "enclosed-litter-box",
    description: "全封閉設計，有效防止砂粒飛濺與異味外洩。大空間設計，適合各種體型貓咪。",
    shortDesc: "全封閉設計，防飛砂防異味", category: "貓砂盆", categorySlug: "litter-box",
    images: ["https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&h=600&fit=crop"],
    price: 899, salePrice: 799, inventory: 30, weight: 3.5, status: "ACTIVE", rating: 4.6, reviewCount: 78, soldCount: 312, isFeatured: false,
  },
];

export const coupons: Coupon[] = [
  { id: "c-1", code: "CAT399", name: "喵大叔滿額折", type: "FIXED", discountValue: 100, minOrderAmount: 799, maxDiscount: null, usageLimit: 1000, perUserLimit: 1, startAt: "2026-01-01", endAt: "2026-12-31", isActive: true },
  { id: "c-2", code: "MEOW10", name: "新會員九折", type: "PERCENTAGE", discountValue: 10, minOrderAmount: 0, maxDiscount: 200, usageLimit: 500, perUserLimit: 1, startAt: "2026-01-01", endAt: "2026-12-31", isActive: true },
  { id: "c-3", code: "FREESHIP", name: "免運券", type: "FREE_SHIPPING", discountValue: 0, minOrderAmount: 599, maxDiscount: null, usageLimit: 2000, perUserLimit: 3, startAt: "2026-01-01", endAt: "2026-12-31", isActive: true },
];

export const mockUser: User = {
  id: "u-1", email: "meow@example.com", name: "喵小編", phone: "0912-345-678", avatar: null, role: "USER",
};

export const addresses: Address[] = [
  { id: "addr-1", name: "喵小編", phone: "0912-345-678", city: "台北市", district: "大安區", address: "忠孝東路四段 100 號 5 樓", zipCode: "106", isDefault: true },
  { id: "addr-2", name: "喵小編", phone: "0912-345-678", city: "新北市", district: "板橋區", address: "文化路一段 200 號 3 樓", zipCode: "220", isDefault: false },
];

// 物流追蹤事件
const shippedEvents: ShipmentEvent[] = [
  { id: "se-1", status: "PICKED_UP", location: "台北市大安區", description: "包裹已由物流夥伴取件", timestamp: "2026-08-13T09:30:00Z" },
  { id: "se-2", status: "IN_TRANSIT", location: "台北轉運中心", description: "包裹已抵達轉運中心，準備發往目的地", timestamp: "2026-08-13T14:20:00Z" },
  { id: "se-3", status: "IN_TRANSIT", location: "台中轉運中心", description: "包裹運送中", timestamp: "2026-08-14T08:15:00Z" },
  { id: "se-4", status: "OUT_FOR_DELIVERY", location: "台北市大安區", description: "包裹配送中，預計今日送達", timestamp: "2026-08-14T13:00:00Z" },
  { id: "se-5", status: "DELIVERED", location: "台北市大安區", description: "包裹已送達，由管理室代收", timestamp: "2026-08-14T15:30:00Z" },
];

const deliveredShipment: Shipment = {
  id: "ship-1",
  trackingNumber: "TWN1234567890",
  carrier: "黑貓宅急便",
  status: "DELIVERED",
  shippedAt: "2026-08-13T09:00:00Z",
  estimatedDelivery: "2026-08-14",
  events: shippedEvents,
};

export const orders: Order[] = [
  {
    id: "o-1", orderNumber: "UM2608150001", status: "DELIVERED",
    items: [
      { id: "oi-1", productId: "p-1", name: "喵大叔 經典豆腐砂 原味 6L", variantName: "原味", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop", price: 249, quantity: 2, subtotal: 498 },
      { id: "oi-2", productId: "p-3", name: "喵大叔 強效除臭礦砂 10L", variantName: "原味", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=200&h=200&fit=crop", price: 199, quantity: 1, subtotal: 199 },
    ],
    subtotal: 697, discount: 100, couponCode: "CAT399", shippingFee: 0, total: 597,
    shippingName: "喵小編", shippingPhone: "0912-345-678", shippingAddress: "台北市大安區忠孝東路四段 100 號 5 樓", shippingMethod: "宅配", paymentMethod: "信用卡",
    shipment: deliveredShipment,
    createdAt: "2026-08-10T10:30:00Z", paidAt: "2026-08-10T10:35:00Z", shippedAt: "2026-08-13T09:00:00Z", deliveredAt: "2026-08-14T15:30:00Z",
  },
  {
    id: "o-2", orderNumber: "UM2608200002", status: "SHIPPED",
    items: [
      { id: "oi-3", productId: "p-6", name: "喵大叔 黃金比例混合砂 6L", variantName: "原味", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=200&h=200&fit=crop", price: 279, quantity: 3, subtotal: 837 },
    ],
    subtotal: 837, discount: 0, couponCode: null, shippingFee: 0, total: 837,
    shippingName: "喵小編", shippingPhone: "0912-345-678", shippingAddress: "台北市大安區忠孝東路四段 100 號 5 樓", shippingMethod: "宅配", paymentMethod: "LINE Pay",
    shipment: {
      id: "ship-2", trackingNumber: "TWN9876543210", carrier: "黑貓宅急便", status: "IN_TRANSIT",
      shippedAt: "2026-08-25T10:00:00Z", estimatedDelivery: "2026-08-27",
      events: shippedEvents.slice(0, 3),
    },
    createdAt: "2026-08-20T16:45:00Z", paidAt: "2026-08-20T16:47:00Z", shippedAt: "2026-08-25T10:00:00Z", deliveredAt: null,
  },
  {
    id: "o-3", orderNumber: "UM2608250003", status: "PAID",
    items: [
      { id: "oi-4", productId: "p-2", name: "喵大叔 極細豆腐砂 2.0mm 6L", variantName: "活性碳", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&h=200&fit=crop", price: 329, quantity: 1, subtotal: 329 },
    ],
    subtotal: 329, discount: 0, couponCode: null, shippingFee: 100, total: 429,
    shippingName: "喵小編", shippingPhone: "0912-345-678", shippingAddress: "新北市板橋區文化路一段 200 號 3 樓", shippingMethod: "宅配", paymentMethod: "ATM 轉帳",
    shipment: null,
    createdAt: "2026-08-25T08:15:00Z", paidAt: "2026-08-25T08:20:00Z", shippedAt: null, deliveredAt: null,
  },
];

export const reviews: Review[] = [
  { id: "r-1", productId: "p-1", userName: "貓奴阿明", rating: 5, title: "凝結力超強！", content: "用了好多品牌，這款豆腐砂凝結力真的沒話說，鏟屎完全不會散，推薦！", createdAt: "2026-08-15T12:00:00Z" },
  { id: "r-2", productId: "p-1", userName: "三貓媽媽", rating: 5, title: "多貓家庭必備", content: "家裡三隻貓，每天產量驚人，這款除臭效果真的很好，房間不會有味道。", createdAt: "2026-08-10T09:30:00Z" },
  { id: "r-3", productId: "p-1", userName: "新手貓爸", rating: 4, title: "不錯，但有一點粉塵", content: "整體來說很好用，凝結快、可沖馬桶，但開封時有一點點粉塵，建議戴口罩。", createdAt: "2026-08-05T18:20:00Z" },
  { id: "r-4", productId: "p-2", userName: "貓咪控", rating: 5, title: "極細顆粒貓咪超愛", content: "我家貓之前很挑砂，換了這款極細的之後完全適應，腳感應該真的很好！", createdAt: "2026-08-18T14:00:00Z" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "credit", name: "信用卡", description: "支援 Visa / MasterCard / JCB", icon: "credit-card" },
  { id: "atm", name: "ATM 轉帳", description: "取得虛擬帳號後至 ATM 或網路銀行轉帳", icon: "landmark" },
  { id: "cvs-code", name: "超商代碼", description: "至 7-ELEVEN / 全家 / 萊爾富 / OK 繳費", icon: "store" },
  { id: "cvs-barcode", name: "超商條碼", description: "列印條碼至超商掃描繳費", icon: "barcode" },
  { id: "linepay", name: "LINE Pay", description: "使用 LINE Pay 快速付款", icon: "smartphone" },
];

export const shippingMethods = [
  { id: "home", name: "宅配", description: "1-3 個工作天送達", fee: 100 },
  { id: "seven", name: "7-ELEVEN 取貨", description: "2-4 個工作天送達門市", fee: 60 },
  { id: "family", name: "全家取貨", description: "2-4 個工作天送達門市", fee: 60 },
];

export const adminStats: AdminDashboardStats = {
  todayOrders: 12, todayRevenue: 8750, pendingPayment: 3, pendingShipment: 8, lowStockCount: 2, totalCustomers: 456,
};

export function getProductBySlug(slug: string): Product | undefined { return products.find((p) => p.slug === slug); }
export function getProductsByCategory(slug: string): Product[] { return products.filter((p) => p.categorySlug === slug); }
export function getFeaturedProducts(): Product[] { return products.filter((p) => p.isFeatured); }
export function getReviewsByProduct(productId: string): Review[] { return reviews.filter((r) => r.productId === productId); }
export function getOrderById(id: string): Order | undefined { return orders.find((o) => o.id === id); }
export function getOrdersByUser(): Order[] { return orders; }
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
}

// 物流狀態標籤
export function getShipmentStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "待出貨", PICKED_UP: "已取件", IN_TRANSIT: "運送中",
    OUT_FOR_DELIVERY: "配送中", DELIVERED: "已送達", EXCEPTION: "異常",
  };
  return labels[status] || status;
}

export function getShipmentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-gray-100 text-gray-800", PICKED_UP: "bg-blue-100 text-blue-800",
    IN_TRANSIT: "bg-purple-100 text-purple-800", OUT_FOR_DELIVERY: "bg-amber-100 text-amber-800",
    DELIVERED: "bg-emerald-100 text-emerald-800", EXCEPTION: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}
