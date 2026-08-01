"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ProductPriceBlock } from "@/components/home/ProductPriceBlock";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import type { ProductRow } from "@/types";

const SCROLL_STEP = 200;

export interface FestivalProductSliderProps {
  row: ProductRow;
  offerImage: string;
}

/**
 * The highlighted yellow "جشنواره تخفیفی" row with a promo tile on the right
 * and a horizontally scrolling list of discounted products.
 */
export function FestivalProductSlider({ row, offerImage }: FestivalProductSliderProps) {
  const { ref, scrollBy } = useHorizontalScroll<HTMLDivElement>();

  return (
    <section className="procuct-sliders">
      <div className="procuct-slider" ref={ref}>
        <div className="procuct-slider-item">
          <h2>{row.title}</h2>
          <a href={row.moreHref}>
            <Image src={offerImage} alt="" fill sizes="150px" style={{ objectFit: "cover" }} />
          </a>
          <div className="procuct-slider-item-text">
            <p>مشاهده بیشتر</p>
            <MaterialIcon name="chevron_left" />
          </div>
        </div>
        <div className="procuct-slider-procucts">
          {row.products.map((product) => (
            <div className="procuct-slider-procuct" key={product.id}>
              <div className="procuct-slider-procuct-pic">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="190px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="procuct-slider-procuct-content">
                <p>{product.title}</p>
                <ProductPriceBlock product={product} />
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <div
            className="buttom-left"
            id="next"
            role="button"
            tabIndex={0}
            aria-label="محصولات بعدی"
            onClick={() => scrollBy(-SCROLL_STEP)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollBy(-SCROLL_STEP);
              }
            }}
          >
            <MaterialIcon name="chevron_left" />
          </div>
          <div
            className="buttom-right"
            id="pre"
            role="button"
            tabIndex={0}
            aria-label="محصولات قبلی"
            onClick={() => scrollBy(SCROLL_STEP)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollBy(SCROLL_STEP);
              }
            }}
          >
            <MaterialIcon name="chevron_right" />
          </div>
        </div>
      </div>
    </section>
  );
}
