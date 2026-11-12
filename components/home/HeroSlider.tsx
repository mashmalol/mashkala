"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useHeroSlider } from "@/hooks/useHeroSlider";
import type { HeroSlide } from "@/types";

export interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const { activeIndex, goNext, goPrevious, goTo, setPaused } = useHeroSlider(slides.length);

  const handleNext = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goNext();
  };

  const handlePrevious = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goPrevious();
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          className={`slide${index === activeIndex ? " active" : ""}`}
          key={slide.id}
          style={{ display: index === activeIndex ? "block" : "none", position: "relative" }}
        >
          <Image src={slide.src} alt={slide.alt} fill sizes="100vw" priority={index === 0} />
        </div>
      ))}
      <div className="slider-button">
        <div>
          <a href="#" className="next" onClick={handleNext} aria-label="اسلاید بعدی">
            &lt;
          </a>
        </div>
        <div>
          <a href="#" className="pre" onClick={handlePrevious} aria-label="اسلاید قبلی">
            &gt;
          </a>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="slider-dots" role="tablist" aria-label="انتخاب اسلاید">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`اسلاید ${index + 1}`}
              className={`slider-dot${index === activeIndex ? " slider-dot--active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
