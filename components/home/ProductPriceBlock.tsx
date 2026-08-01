"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types";

export interface ProductPriceBlockProps {
  product: Product;
}

/**
 * Renders the "add to cart" button plus price(s) for a product card, and
 * wires the button up to the global cart.
 *
 * The original markup used two slightly different structures depending on
 * whether a product has a discount:
 *  - With a discount: `.product-price > .prices > (.discounted + .price)`
 *  - Without a discount: `.product-content-price > .price`
 * Both are reproduced here, selected automatically based on whether
 * `price.original` is present.
 */
export function ProductPriceBlock({ product }: ProductPriceBlockProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const { price } = product;

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  const addButton = (
    <button
      type="button"
      className={`product-price-btn${justAdded ? " product-price-btn--added" : ""}`}
      onClick={handleAdd}
      aria-label={`افزودن ${product.title} به سبد خرید`}
    >
      <MaterialIcon name={justAdded ? "check" : "add"} />
    </button>
  );

  if (price.original) {
    return (
      <div className="product-price">
        {addButton}
        <div className="prices">
          <div className="discounted">
            <span>{price.current}</span>
          </div>
          <div className="price">
            <span> {price.original}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-content-price">
      {addButton}
      <div className="price">
        <span> {price.current} </span>
      </div>
    </div>
  );
}
