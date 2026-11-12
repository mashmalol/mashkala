import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { ProductCard } from "@/components/product/ProductCard";
import {
  PRODUCT_ROWS,
  getCatalogue,
  getCatalogueTitle,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "همهٔ نوشیدنی‌های گازدار مشکله؛ از طعم‌های میوه‌ای و کولای تیره تا کلکسیون هنری قوطی‌ها.",
};

interface ProductsPageProps {
  searchParams: Promise<{ cat?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { cat } = await searchParams;
  const products = getCatalogue(cat);
  const title = getCatalogueTitle(cat);
  const activeCat = PRODUCT_ROWS.some((row) => row.id === cat) ? cat : undefined;

  return (
    <>
      <Header />

      <main className="products-page">
        <div className="products-header">
          <h1>{title}</h1>
          <span className="products-count">
            {products.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>

        <nav className="products-filters" aria-label="دسته‌بندی محصولات">
          <Link
            href="/products"
            className={`products-filter${activeCat ? "" : " products-filter--active"}`}
          >
            همه
          </Link>
          {PRODUCT_ROWS.map((row) => (
            <Link
              key={row.id}
              href={`/products?cat=${row.id}`}
              className={`products-filter${activeCat === row.id ? " products-filter--active" : ""}`}
            >
              {row.title}
            </Link>
          ))}
        </nav>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
      <BottomNav />
      <BackToTopButton />
    </>
  );
}
