"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ProductPriceBlock } from "@/components/home/ProductPriceBlock";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import type { ProductRow } from "@/types";

const SCROLL_STEP = 200;

function SliderShowRow({ row }: { row: ProductRow }) {
  const { ref, scrollBy } = useHorizontalScroll<HTMLDivElement>();

  return (
    <div className="slider-show">
      <div className="slider-show-text">
        <h3>{row.title}</h3>
        <a href={row.moreHref}>
          <MaterialIcon name="add" />
          مشاهده بیشتر
        </a>
      </div>
      <div className="slider-show-products" ref={ref}>
        {row.products.map((product) => (
          <div className="slider-show-product" key={product.id}>
            <div className="slider-show-product-pic">
              <Image
                src={product.image}
                alt="product"
                width={product.imageWidth}
                height={product.imageHeight}
              />
            </div>
            <div className="slider-show-product-content">
              <p>{product.title}</p>
              <ProductPriceBlock product={product} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="next"
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
        className="pre"
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
  );
}

export interface SliderShowSectionProps {
  rows: ProductRow[];
}

export function SliderShowSection({ rows }: SliderShowSectionProps) {
  return (
    <section className="slider-show-section">
      {rows.map((row) => (
        <SliderShowRow row={row} key={row.id} />
      ))}
    </section>
  );
}
