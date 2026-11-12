"use client";

import { useCallback, useEffect, useState } from "react";

const AUTO_ADVANCE_MS = 5000;

/**
 * Drives the hero slider: a gentle 5s autoplay that pauses while the pointer
 * rests on the slider (or the user is on a dot), plus manual next/previous
 * and jump-to-slide controls.
 */
export function useHeroSlider(slideCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slideCount <= 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    setActiveIndex((current) => (slideCount > 0 ? (current + 1) % slideCount : 0));
  }, [slideCount]);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => (slideCount > 0 ? (current - 1 + slideCount) % slideCount : 0));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || isPaused) return;
    const interval = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [goNext, isPaused, slideCount]);

  return { activeIndex, goNext, goPrevious, goTo, setPaused: setIsPaused };
}
