"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the window has been scrolled past `threshold` pixels.
 * Used to fade the "back to top" button in exactly like the original
 * `window.addEventListener("scroll", ...)` implementation.
 */
export function useScrollPastThreshold(threshold: number): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPast(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPast;
}
