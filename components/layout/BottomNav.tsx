"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { useCart } from "@/contexts/CartContext";
import { BOTTOM_NAV_ITEMS } from "@/constants/data";

const ITEM_HREFS: Record<string, string> = {
  home: "/",
  cart: "/cart",
  profile: "/login",
};

function focusSiteSearch() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const input = document.getElementById("site-search-input");
  if (input instanceof HTMLInputElement) {
    window.setTimeout(() => input.focus(), 300);
  }
}

export function BottomNav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  return (
    <>
      <div className="bottom-meno-wrapper">
        <nav className="bottom-meno" aria-label="منوی پایین صفحه">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const href = ITEM_HREFS[item.id];
            const isActive = href ? (href === "/" ? pathname === "/" : pathname?.startsWith(href)) : false;
            const content = (
              <>
                <span className="bottom-meno-item-icon-wrap">
                  <MaterialIcon name={item.icon} />
                  {item.id === "cart" && itemCount > 0 ? (
                    <span className="bottom-meno-item-badge">{itemCount}</span>
                  ) : null}
                </span>
                <div className="bottom-meno-item-text">{item.label}</div>
              </>
            );

            if (href) {
              return (
                <Link
                  href={href}
                  key={item.id}
                  className={`bottom-meno-item${isActive ? " bottom-meno-item--active" : ""}`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                type="button"
                key={item.id}
                className="bottom-meno-item"
                onClick={() => (item.id === "search" ? focusSiteSearch() : setIsDrawerOpen(true))}
              >
                {content}
              </button>
            );
          })}
        </nav>
      </div>
      <MobileNavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
