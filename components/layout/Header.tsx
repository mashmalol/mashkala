"use client";

import { useCallback, useRef, useState } from "react";
import { TopBanner } from "@/components/layout/TopBanner";
import { HeaderTop } from "@/components/layout/HeaderTop";
import { MainMenu } from "@/components/layout/MainMenu";
import { CategoryDropdown } from "@/components/layout/CategoryDropdown";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { CATEGORY_NAV_LINKS, MAIN_NAV_LINKS, TOP_MENU_LINKS } from "@/constants/data";

/** Small delay before closing a hover-triggered menu, so moving the cursor
 * from the trigger down into the menu itself doesn't cause it to flicker
 * shut in the gap between the two elements. */
const CLOSE_DELAY_MS = 250;

/** Returns open/close handlers for a hover-triggered menu that only closes
 * after a short delay (cancelled if the cursor re-enters in time). */
function useHoverMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setIsOpen(false), CLOSE_DELAY_MS);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsOpen(false);
  }, []);

  return { isOpen, open, scheduleClose, closeNow };
}

export function Header() {
  const cart = useHoverMenu();
  const category = useHoverMenu();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header>
      <div className="main-header">
        <TopBanner />
        <HeaderTop
          isCartOpen={cart.isOpen}
          onCartMouseEnter={cart.open}
          onCartMouseLeave={cart.scheduleClose}
          onMenuButtonClick={() => setIsMobileNavOpen(true)}
        />
      </div>
      <MainMenu
        promoLinks={TOP_MENU_LINKS}
        navLinks={MAIN_NAV_LINKS}
        onCategoryMouseEnter={category.open}
        onCategoryMouseLeave={category.scheduleClose}
        isCategoryOpen={category.isOpen}
      />
      <CategoryDropdown
        links={CATEGORY_NAV_LINKS}
        isVisible={category.isOpen}
        onMouseEnter={category.open}
        onMouseLeave={category.scheduleClose}
        onClose={category.closeNow}
      />
      <MobileNavDrawer isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </header>
  );
}
