"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Cart, CartItem, Product, ProductVariant, Coupon } from "@/types";
import { generateId } from "@/lib/utils";
import { coupons } from "@/lib/data";

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, variant: ProductVariant | undefined, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isInCart: (productId: string, variantId?: string) => boolean;
}

const FREE_SHIPPING_THRESHOLD = 999;
const BASE_SHIPPING_FEE = 100;

const emptyCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  couponCode: null,
  shippingFee: 0,
  total: 0,
  itemCount: 0,
};

function calculateCart(items: CartItem[], couponCode: string | null): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  let discount = 0;
  if (couponCode) {
    const coupon = coupons.find((c) => c.code === couponCode);
    if (coupon && subtotal >= coupon.minOrderAmount) {
      if (coupon.type === "FIXED") {
        discount = coupon.discountValue;
      } else if (coupon.type === "PERCENTAGE") {
        discount = Math.floor((subtotal * coupon.discountValue) / 100);
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      }
    }
  }

  const afterDiscount = Math.max(0, subtotal - discount);
  const shippingFee = afterDiscount >= FREE_SHIPPING_THRESHOLD || couponCode === "FREESHIP" ? 0 : BASE_SHIPPING_FEE;
  const total = afterDiscount + shippingFee;

  return {
    items,
    subtotal,
    discount,
    couponCode,
    shippingFee,
    total,
    itemCount,
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const cart = useMemo(() => calculateCart(items, couponCode), [items, couponCode]);

  const addToCart = useCallback((product: Product, variant: ProductVariant | undefined, quantity: number) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant?.id
      );

      const price = variant?.salePrice ?? variant?.price ?? product.salePrice ?? product.price;
      const originalPrice = variant?.price ?? product.price;
      const maxQty = variant?.inventory ?? product.inventory;

      if (existingIndex >= 0) {
        const newItems = [...prev];
        const newQty = Math.min(maxQty, newItems[existingIndex].quantity + quantity);
        newItems[existingIndex] = { ...newItems[existingIndex], quantity: newQty };
        return newItems;
      }

      return [
        ...prev,
        {
          id: generateId(),
          productId: product.id,
          variantId: variant?.id,
          name: product.name,
          variantName: variant?.name,
          image: product.images[0],
          price,
          originalPrice,
          quantity: Math.min(maxQty, quantity),
          maxQuantity: maxQty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.min(item.maxQuantity, quantity) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (coupon && coupon.isActive) {
      setCouponCode(coupon.code);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, []);

  const isInCart = useCallback(
    (productId: string, variantId?: string) => {
      return items.some((item) => item.productId === productId && item.variantId === variantId);
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
