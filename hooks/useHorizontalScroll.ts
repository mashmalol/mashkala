"use client";

import { useCallback, useRef } from "react";

/**
 * Provides a ref to attach to a horizontally-scrollable container along with
 * a `scrollBy` helper. Mirrors the original site's behaviour of nudging
 * `scrollLeft` by a fixed amount on button click, but keeps everything
 * declarative/React-friendly instead of `document.querySelector`.
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const scrollBy = useCallback((amount: number) => {
    ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return { ref, scrollBy };
}
