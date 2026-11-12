"use client";

import { useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useCart } from "@/contexts/CartContext";
import { toastStore } from "@/lib/toast-store";
import type { Product } from "@/types";

export interface ProductPurchasePanelProps {
  product: Product;
}

/** Quantity stepper + add-to-cart on the product detail page. */
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const changeBy = (delta: number) =>
    setQuantity((current) => Math.min(20, Math.max(1, current + delta)));

  const handleAdd = () => {
    addItem(product, quantity);
    toastStore.show({
      title: "به سبد اضافه شد",
      message: `${quantity.toLocaleString("fa-IR")} × ${product.title}`,
      href: "/cart",
      actionLabel: "مشاهده سبد",
    });
  };

  return (
    <div className="purchase-panel">
      <div className="purchase-quantity" role="group" aria-label="تعداد">
        <button type="button" onClick={() => changeBy(1)} aria-label="افزودن تعداد">
          <MaterialIcon name="add" />
        </button>
        <span aria-live="polite">{quantity.toLocaleString("fa-IR")}</span>
        <button type="button" onClick={() => changeBy(-1)} aria-label="کاهش تعداد">
          <MaterialIcon name="remove" />
        </button>
      </div>

      <button type="button" className="purchase-add" onClick={handleAdd}>
        <MaterialIcon name="shopping_cart" />
        افزودن به سبد خرید
      </button>

      <Link href="/cart" className="purchase-cart-link">
        مشاهده سبد خرید
      </Link>
    </div>
  );
}
