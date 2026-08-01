"use client";

import { useState, type KeyboardEvent } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { CategoryNavLink } from "@/types";

export interface CategoryDropdownProps {
  links: CategoryNavLink[];
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export function CategoryDropdown({
  links,
  isVisible,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: CategoryDropdownProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const wrapperClassName = `nav-category-wrapper${
    isVisible ? " nav-category-wrapper--visible" : ""
  }`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setExpandedId(null);
      onClose();
    }
  };

  return (
    <div
      className={wrapperClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div className="nav-category">
        <ul>
          {links.map((link) => {
            const hasChildren = Boolean(link.children && link.children.length > 0);
            const isExpanded = expandedId === link.id;

            return (
              <li
                key={link.id}
                className={`nav-category-item${hasChildren ? " nav-category-item--has-children" : ""}`}
                onMouseEnter={() => hasChildren && setExpandedId(link.id)}
              >
                <div className="nav-category-item-row">
                  {link.icon ? <MaterialIcon name={link.icon} className="nav-category-icon" /> : null}
                  <a href={link.href} className="nav-category-title">
                    {link.title}
                  </a>
                  {hasChildren ? (
                    <button
                      type="button"
                      className="nav-category-toggle"
                      aria-expanded={isExpanded}
                      aria-label={`زیردسته‌های ${link.title}`}
                      onClick={() => setExpandedId(isExpanded ? null : link.id)}
                    >
                      <MaterialIcon name="chevron_left" />
                    </button>
                  ) : null}
                </div>

                {hasChildren ? (
                  <ul
                    className={`nav-category-submenu${isExpanded ? " nav-category-submenu--open" : ""}`}
                  >
                    {link.children?.map((child) => (
                      <li key={child.id}>
                        <a href={child.href}>{child.title}</a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
