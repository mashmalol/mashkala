"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { NavLink } from "@/types";

export interface MainMenuProps {
  promoLinks: NavLink[];
  navLinks: NavLink[];
  isCategoryOpen: boolean;
  onCategoryMouseEnter: () => void;
  onCategoryMouseLeave: () => void;
}

export function MainMenu({
  promoLinks,
  navLinks,
  isCategoryOpen,
  onCategoryMouseEnter,
  onCategoryMouseLeave,
}: MainMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="header-meno" aria-label="منوی اصلی">
      <ul>
        <li
          className="header-meno-nav-category"
          onMouseEnter={onCategoryMouseEnter}
          onMouseLeave={onCategoryMouseLeave}
        >
          <button
            type="button"
            className="header-meno-nav-category-btn"
            aria-haspopup="true"
            aria-expanded={isCategoryOpen}
            onFocus={onCategoryMouseEnter}
            onBlur={onCategoryMouseLeave}
          >
            <MaterialIcon name="menu" className="word-space" />
            <span>دسته بندی ها</span>
          </button>
        </li>
        {navLinks.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
          return (
            <li key={link.id} className={isActive ? "header-meno-active" : undefined}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          );
        })}
        {promoLinks.map((link) => (
          <li key={link.id} className="header-meno-promo">
            <a href={link.href}>{link.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
