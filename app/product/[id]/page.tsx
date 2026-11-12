import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { ProductPriceBlock } from "@/components/home/ProductPriceBlock";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { SliderShowSection } from "@/components/home/SliderShowSection";
import { PRODUCTS } from "@/constants/data";
import {
  findProduct,
  findProductRow,
  getRelatedProducts,
} from "@/lib/catalog";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const row = findProductRow(product.id);
  const related = getRelatedProducts(product.id, 10);

  return (
    <>
      <Header />

      <main className="product-detail-page">
        <nav className="product-breadcrumb" aria-label="مسیر صفحه">
          <Link href="/">خانه</Link>
          <MaterialIcon name="chevron_left" />
          <Link href="/products">محصولات</Link>
          <MaterialIcon name="chevron_left" />
          {row ? (
            <>
              <Link href={`/products?cat=${row.id}`}>{row.title}</Link>
              <MaterialIcon name="chevron_left" />
            </>
          ) : null}
          <span>{product.title}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail-pic">
            <Image
              src={product.image}
              alt={product.title}
              width={product.imageWidth}
              height={product.imageHeight}
              sizes="(max-width: 750px) 90vw, 420px"
              priority
            />
          </div>

          <div className="product-detail-info">
            {row ? <span className="product-detail-tag">{row.title}</span> : null}
            <h1>{product.title}</h1>
            <p className="product-detail-desc">{product.description}</p>

            <div className="product-detail-price">
              <ProductPriceBlock product={product} />
            </div>

            <ProductPurchasePanel product={product} />

            <ul className="product-detail-perks">
              <li>
                <MaterialIcon name="local_shipping" />
                ارسال سریع تا ۲۴ ساعت
              </li>
              <li>
                <MaterialIcon name="verified" />
                ضمانت اصالت کالا
              </li>
              <li>
                <MaterialIcon name="lock" />
                پرداخت امن بانکی
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="product-related">
            <SliderShowSection
              rows={[
                {
                  id: `${product.id}-related`,
                  title: "محصولات مرتبط",
                  moreHref: "/products",
                  products: related,
                },
              ]}
            />
          </section>
        ) : null}
      </main>

      <Footer />
      <BottomNav />
      <BackToTopButton />
    </>
  );
}
