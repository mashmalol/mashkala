"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { CATEGORY_NAV_LINKS, MAIN_NAV_LINKS } from "@/constants/data";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/** The slide-in panel used for navigation on narrow screens, where the
 * desktop `.header-meno` bar is hidden. Reachable from the header's
 * hamburger button and from the bottom navigation bar's "دسته بندی" /
 * "بیشتر" items. */
export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`mobile-nav-overlay${isOpen ? " mobile-nav-overlay--open" : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="mobile-nav-backdrop"
        aria-label="بستن منو"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <nav
        className={`mobile-nav-drawer${isOpen ? " mobile-nav-drawer--open" : ""}`}
        aria-label="منوی موبایل"
      >
        <div className="mobile-nav-header">
          <span>منو</span>
          <button type="button" onClick={onClose} aria-label="بستن منو" className="mobile-nav-close">
            <MaterialIcon name="close" />
          </button>
        </div>

        <ul className="mobile-nav-list">
          {MAIN_NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link href={link.href} onClick={onClose}>
                {link.icon ? <MaterialIcon name={link.icon} /> : null}
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-section-title">دسته بندی ها</div>
        <ul className="mobile-nav-list">
          {CATEGORY_NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={link.href} onClick={onClose}>
                {link.icon ? <MaterialIcon name={link.icon} /> : null}
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
