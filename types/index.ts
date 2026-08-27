export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  category: string;
  categorySlug: string;
  images: string[];
  price: number;
  salePrice: number | null;
  inventory: number;
  weight: number;
  status: "ACTIVE" | "INACTIVE";
  rating: number;
  reviewCount: number;
  soldCount: number;
  isFeatured: boolean;
  variants?: ProductVariant[];
  features?: string[];
  specs?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  salePrice: number | null;
  inventory: number;
  weight: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  maxQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingFee: number;
  total: number;
  itemCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  type: "FIXED" | "PERCENTAGE" | "FREE_SHIPPING";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
  usageLimit: number;
  perUserLimit: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  carrier: string;
  status: ShipmentStatus;
  shippedAt: string | null;
  estimatedDelivery: string | null;
  events: ShipmentEvent[];
}

export type ShipmentStatus = 
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "EXCEPTION";

export interface ShipmentEvent {
  id: string;
  status: ShipmentStatus;
  location: string;
  description: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shippingFee: number;
  total: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  shipment: Shipment | null;
  createdAt: string;
  paidAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  variantName?: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus = 
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string | null;
  role: "USER" | "ADMIN";
}

export interface AdminDashboardStats {
  todayOrders: number;
  todayRevenue: number;
  pendingPayment: number;
  pendingShipment: number;
  lowStockCount: number;
  totalCustomers: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}
