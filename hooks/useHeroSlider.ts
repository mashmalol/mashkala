"use client";

import { useCallback, useEffect, useState } from "react";

const AUTO_ADVANCE_MS = 3000;

/**
 * Reproduces the original hero slider behaviour: the active slide advances
 * automatically every 3 seconds, and can also be moved forward/backward
 * manually. The manual controls and the automatic timer both operate on the
 * same index, exactly like the original `setInterval` + click handlers.
 */
export function useHeroSlider(slideCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const interval = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [goNext]);

  return { activeIndex, goNext, goPrevious };
}
