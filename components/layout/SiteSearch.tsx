"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { BLOG_POSTS, PRODUCTS } from "@/constants/data";
import type { Product } from "@/types";

/** Upper bound on entries shown in the instant-search dropdown. */
const MAX_RESULTS = 8;

interface SearchHit {
  id: string;
  kind: "product" | "post";
  title: string;
  hint: string;
  /** Extra searchable copy (product description, blog tags) folded into the
   * index but never rendered directly. */
  searchText: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

/** Folds Arabic variants into Persian ones and drops the ZWNJ, so a query
 * typed with either keyboard matches catalogue copy written the other way. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, "");
}

function productToHit(product: Product): SearchHit {
  return {
    id: product.id,
    kind: "product",
    title: product.title,
    hint: product.price.current,
    searchText: product.description,
    href: `/product/${product.id}`,
    image: product.image,
    imageWidth: product.imageWidth,
    imageHeight: product.imageHeight,
  };
}

const PRODUCT_HITS: SearchHit[] = PRODUCTS.map(productToHit);
const POST_HITS: SearchHit[] = BLOG_POSTS.map((post) => ({
  id: post.id,
  kind: "post",
  title: post.title,
  hint: post.category,
  searchText: `${post.excerpt} ${post.tags.join(" ")}`,
  href: post.href,
  image: post.image,
  imageWidth: 1200,
  imageHeight: 800,
}));

function searchAll(rawQuery: string): SearchHit[] {
  const query = normalize(rawQuery.trim());
  if (query.length < 2) return [];
  const match = (hit: SearchHit) =>
    normalize(`${hit.title} ${hit.hint} ${hit.searchText}`).includes(query);

  const products = PRODUCT_HITS.filter(match);
  const posts = POST_HITS.filter(match);
  return [...products, ...posts].slice(0, MAX_RESULTS);
}

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

export function SiteSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchAll(query), [query]);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(0);
  }, []);

  // "/" anywhere on the page jumps into the search box, like desktop apps.
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside closes the dropdown.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, close]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      close();
      inputRef.current?.blur();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
      return;
    }
    if (event.key === "Enter") {
      const hit = results[activeIndex];
      if (hit) {
        event.preventDefault();
        close();
        setQuery("");
        router.push(hit.href);
      }
    }
  };

  const openPanel = isOpen && query.trim().length >= 2;

  return (
    <div className="input-header-search site-search" ref={rootRef}>
      <input
        ref={inputRef}
        type="search"
        id="site-search-input"
        placeholder="جستوجو کنید"
        aria-label="جستوجو کنید"
        aria-expanded={openPanel}
        aria-controls="site-search-panel"
        role="combobox"
        autoComplete="off"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      <div className="input-header-search-logo">
        <MaterialIcon name="search" />
      </div>

      {openPanel ? (
        <div className="site-search-panel" id="site-search-panel" role="listbox">
          {results.length === 0 ? (
            <div className="site-search-empty">نتیجه‌ای یافت نشد</div>
          ) : (
            results.map((hit, index) => (
              <a
                key={`${hit.kind}-${hit.id}`}
                href={hit.href}
                role="option"
                aria-selected={index === activeIndex}
                className={`site-search-item${index === activeIndex ? " site-search-item--active" : ""}`}
                // Navigate on mousedown so the blur that follows doesn't close
                // the panel before the link is followed.
                onMouseDown={(event) => {
                  event.preventDefault();
                  close();
                  setQuery("");
                  router.push(hit.href);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="site-search-item-pic">
                  <Image
                    src={hit.image}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                  />
                </span>
                <span className="site-search-item-text">
                  <span className="site-search-item-title">{hit.title}</span>
                  <span className="site-search-item-hint">{hit.hint}</span>
                </span>
                <MaterialIcon
                  className="site-search-item-kind"
                  name={hit.kind === "product" ? "local_drink" : "article"}
                />
              </a>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
