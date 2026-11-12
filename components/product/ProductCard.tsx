import Image from "next/image";
import Link from "next/link";
import { ProductPriceBlock } from "@/components/home/ProductPriceBlock";
import type { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
}

/**
 * Catalogue tile used by the `/products` grid: a linked picture + title, the
 * short description, and the shared add-to-cart/price block.
 */
export function ProductCard({ product }: ProductCardProps) {
  const href = `/product/${product.id}`;

  return (
    <article className="prod-card">
      <Link href={href} className="prod-card-pic" aria-label={product.title}>
        <Image
          src={product.image}
          alt={product.title}
          width={product.imageWidth}
          height={product.imageHeight}
          sizes="(max-width: 750px) 45vw, 200px"
        />
      </Link>
      <div className="prod-card-body">
        <Link href={href} className="prod-card-title">
          {product.title}
        </Link>
        <p className="prod-card-desc">{product.description}</p>
        <ProductPriceBlock product={product} />
      </div>
    </article>
  );
}
