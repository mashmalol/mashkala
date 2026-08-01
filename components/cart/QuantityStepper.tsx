"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
  label: string;
}

/** A small "+ / value / -" quantity control used on cart line items.
 * Decreasing past 1 is allowed on purpose: the parent's `onChange` (backed
 * by `CartContext.updateQuantity`) treats a quantity of 0 as "remove this
 * item", which doubles as a quick, discoverable way to remove a line. */
export function QuantityStepper({ quantity, onChange, max = 99, label }: QuantityStepperProps) {
  const decrease = () => onChange(quantity - 1);
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className="qty-stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="qty-stepper-btn"
        onClick={decrease}
        aria-label={`کاهش تعداد ${label}`}
      >
        <MaterialIcon name="remove" />
      </button>
      <span className="qty-stepper-value" aria-live="polite">
        {quantity.toLocaleString("fa-IR")}
      </span>
      <button
        type="button"
        className="qty-stepper-btn"
        onClick={increase}
        aria-label={`افزایش تعداد ${label}`}
      >
        <MaterialIcon name="add" />
      </button>
    </div>
  );
}
