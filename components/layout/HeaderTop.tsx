"use client";

import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ShoppingCartPreview } from "@/components/layout/ShoppingCartPreview";
import { useCart } from "@/contexts/CartContext";

export interface HeaderTopProps {
  isCartOpen: boolean;
  onCartMouseEnter: () => void;
  onCartMouseLeave: () => void;
  /** Opens the mobile navigation drawer. Only visible at narrow widths. */
  onMenuButtonClick: () => void;
}

export function HeaderTop({
  isCartOpen,
  onCartMouseEnter,
  onCartMouseLeave,
  onMenuButtonClick,
}: HeaderTopProps) {
  const { itemCount } = useCart();

  return (
    <div className="input-header">
      <div className="input-header-right">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onMenuButtonClick}
          aria-label="باز کردن منو"
        >
          <MaterialIcon name="menu" />
        </button>
        <div className="input-header-logo">
          <Link href="/">
            <Image src="/images/logo-mark.png" alt="مشکله" width={88} height={50} priority style={{ objectFit: "contain" }} />
          </Link>
        </div>
        <div className="input-header-search">
          <input
            type="search"
            id="site-search-input"
            placeholder="جستوجو کنید"
            aria-label="جستوجو کنید"
          />
          <div className="input-header-search-logo">
            <MaterialIcon name="search" />
          </div>
        </div>
      </div>
      <div className="input-header-left">
        <div className="input-header-btn">
          <MaterialIcon name="person" />
          <Link href="/login">ورود / ثبت نام</Link>
        </div>

        <Link
          href="/cart"
          className="input-header-btn-buy"
          aria-haspopup="true"
          aria-expanded={isCartOpen}
          aria-label={`سبد خرید، ${itemCount} کالا`}
          onMouseEnter={onCartMouseEnter}
          onMouseLeave={onCartMouseLeave}
          onFocus={onCartMouseEnter}
          onBlur={onCartMouseLeave}
        >
          <div className="input-header-btn-buy-num">{itemCount}</div>
          <MaterialIcon name="shopping_cart" />
        </Link>

        <div
          className={`shopping-cart-wrapper${isCartOpen ? " card-show" : ""}`}
          onMouseEnter={onCartMouseEnter}
          onMouseLeave={onCartMouseLeave}
        >
          <ShoppingCartPreview />
        </div>
      </div>
    </div>
  );
}
