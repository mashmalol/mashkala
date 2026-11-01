"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { useCart } from "@/contexts/CartContext";

function CartPageContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const paymentReason = searchParams.get("reason");
  const refId = searchParams.get("ref_id");
  const { items, isLoading, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    if (paymentStatus === "success") {
      clearCart();
    }
  }, [clearCart, paymentStatus]);

  return (
    <>
      <Header />

      <main className="cart-page">
        {paymentStatus === "success" ? (
          <div className="cart-summary cart-summary--success">
            <h2>پرداخت با موفقیت انجام شد</h2>
            <p>
              {refId ? `شماره پیگیری: ${refId}` : "تراکنش شما با موفقیت تایید شد."}
            </p>
          </div>
        ) : null}

        {paymentStatus === "failed" ? (
          <div className="cart-summary cart-summary--error">
            <h2>پرداخت ناموفق بود</h2>
            <p>{paymentReason ? decodeURIComponent(paymentReason) : "لطفاً دوباره تلاش کنید."}</p>
          </div>
        ) : null}

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

            <CartSummary subtotal={subtotal} />
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
      <BackToTopButton />
    </>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartPageContent />
    </Suspense>
  );
}
