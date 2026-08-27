export function formatPrice(price: number): string {
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", minimumFractionDigits: 0 }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("zh-TW").format(num);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("zh-TW", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatShortDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("zh-TW", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "待付款", PAID: "已付款", PROCESSING: "處理中", SHIPPED: "已出貨", DELIVERED: "已送達", CANCELLED: "已取消", REFUNDED: "已退款",
  };
  return labels[status] || status;
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800", PAID: "bg-emerald-100 text-emerald-800", PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800", DELIVERED: "bg-green-100 text-green-800", CANCELLED: "bg-gray-100 text-gray-800", REFUNDED: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}
