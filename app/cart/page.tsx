"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { items, isLoading, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <>
      <Header />

      <main className="cart-page">
        <div className="cart-page-header">
          <h1>سبد خرید</h1>
          <nav aria-label="مسیر صفحه" className="breadcrumb">
            <Link href="/">صفحه اصلی</Link>
            <span>/</span>
            <span>سبد خرید</span>
          </nav>
        </div>

        {isLoading ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-page-grid">
            <ul className="cart-items">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </ul>

            <CartSummary subtotal={subtotal} onCheckoutComplete={clearCart} />
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
      <BackToTopButton />
    </>
  );
}
