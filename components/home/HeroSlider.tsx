"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useHeroSlider } from "@/hooks/useHeroSlider";
import type { HeroSlide } from "@/types";

export interface HeroSliderProps {
  slides: HeroSlide[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const { activeIndex, goNext, goPrevious } = useHeroSlider(slides.length);

  const handleNext = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goNext();
  };

  const handlePrevious = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    goPrevious();
  };

  return (
    <div className="slider-container">
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
          <a href="#" className="next" onClick={handleNext}>
            &lt;
          </a>
        </div>
        <div>
          <a href="#" className="pre" onClick={handlePrevious}>
            &gt;
          </a>
        </div>
      </div>
    </div>
  );
}
