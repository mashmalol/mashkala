"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { formatRial } from "@/lib/format";
import type { CartItem } from "@/types";

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const lineSubtotal = item.price.amount * item.quantity;

  return (
    <li className="cart-item-row">
      <div className="cart-item-pic">
        <Image src={item.image} alt={item.title} width={item.imageWidth} height={item.imageHeight} />
      </div>

      <div className="cart-item-main">
        <div className="cart-item-heading">
          <p className="cart-item-title">{item.title}</p>
          {item.option ? <span className="cart-item-option">{item.option}</span> : null}
          <span className="cart-item-unit-price">{item.price.current} / عدد</span>
        </div>

        <div className="cart-item-actions">
          <QuantityStepper quantity={item.quantity} onChange={onQuantityChange} label={item.title} />
          <button type="button" className="cart-item-remove" onClick={onRemove}>
            <MaterialIcon name="delete" />
            حذف
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span>جمع</span>
        <strong>{formatRial(lineSubtotal)}</strong>
      </div>
    </li>
  );
}
