"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { formatRial } from "@/lib/format";

const VALID_DISCOUNT_CODES: Record<string, number> = {
  OFF10: 0.1,
  WELCOME20: 0.2,
};

const FREE_SHIPPING_THRESHOLD = 2_000_000;
const STANDARD_SHIPPING_COST = 150_000;

export interface CartSummaryProps {
  subtotal: number;
}

type DiscountState = { code: string; rate: number } | null;

export function CartSummary({ subtotal }: CartSummaryProps) {
  const [codeInput, setCodeInput] = useState("");
  const [discount, setDiscount] = useState<DiscountState>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const discountAmount = discount ? Math.round(subtotal * discount.rate) : 0;
  const total = Math.max(subtotal - discountAmount + shippingCost, 0);

  const handleApplyDiscount = (event: FormEvent) => {
    event.preventDefault();
    const normalized = codeInput.trim().toUpperCase();
    if (!normalized) return;

    const rate = VALID_DISCOUNT_CODES[normalized];
    if (rate) {
      setDiscount({ code: normalized, rate });
      setDiscountError(null);
    } else {
      setDiscount(null);
      setDiscountError("کد تخفیف وارد شده معتبر نیست");
    }
  };

  const handleRemoveDiscount = () => {
    setDiscount(null);
    setDiscountError(null);
    setCodeInput("");
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/payment/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          description: "سفارش از فروشگاه",
          callbackUrl: `${window.location.origin}/payment/callback`,
          orderId: `order-${Date.now()}`,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string; redirectUrl?: string };

      if (!response.ok || !result.success || !result.redirectUrl) {
        throw new Error(result.message ?? "در ایجاد تراکنش مشکلی پیش آمد.");
      }

      window.location.assign(result.redirectUrl);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "در ایجاد تراکنش مشکلی پیش آمد.");
      setIsCheckingOut(false);
    }
  };

  return (
    <aside className="cart-summary">
      <h2>خلاصه سبد خرید</h2>

      <form className="discount-form" onSubmit={handleApplyDiscount}>
        <label htmlFor="discount-code">کد تخفیف</label>
        <div className="discount-form-row">
          <input
            id="discount-code"
            type="text"
            placeholder="کد تخفیف را وارد کنید"
            value={codeInput}
            onChange={(event) => setCodeInput(event.target.value)}
            disabled={Boolean(discount)}
          />
          {discount ? (
            <button type="button" className="discount-form-btn" onClick={handleRemoveDiscount}>
              حذف
            </button>
          ) : (
            <button type="submit" className="discount-form-btn">
              اعمال
            </button>
          )}
        </div>
        {discountError ? <p className="discount-form-error">{discountError}</p> : null}
        {discount ? (
          <p className="discount-form-success">
            <MaterialIcon name="check_circle" /> کد «{discount.code}» با موفقیت اعمال شد (
            {Math.round(discount.rate * 100)}٪ تخفیف)
          </p>
        ) : null}
      </form>

      <div className="cart-summary-rows">
        <div className="cart-summary-row">
          <span>جمع کالاها</span>
          <span>{formatRial(subtotal)}</span>
        </div>
        {discount ? (
          <div className="cart-summary-row cart-summary-row--discount">
            <span>تخفیف</span>
            <span>- {formatRial(discountAmount)}</span>
          </div>
        ) : null}
        <div className="cart-summary-row">
          <span>هزینه ارسال</span>
          <span>{shippingCost === 0 ? "رایگان" : formatRial(shippingCost)}</span>
        </div>
        {shippingCost > 0 ? (
          <p className="cart-summary-shipping-hint">
            با خرید بالای {formatRial(FREE_SHIPPING_THRESHOLD)}، ارسال رایگان می‌شود.
          </p>
        ) : null}
      </div>

      <div className="cart-summary-total">
        <span>مبلغ قابل پرداخت</span>
        <strong>{formatRial(total)}</strong>
      </div>

      {checkoutError ? <p className="discount-form-error">{checkoutError}</p> : null}

      <button
        type="button"
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? (
          <>
            <span className="spinner" aria-hidden="true" />
            در حال انتقال به درگاه پرداخت...
          </>
        ) : (
          "ادامه فرآیند خرید"
        )}
      </button>

      <Link href="/" className="cart-continue-link">
        <MaterialIcon name="arrow_forward" />
        ادامه خرید
      </Link>
    </aside>
  );
}
