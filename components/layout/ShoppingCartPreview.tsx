"use client";

import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useCart } from "@/contexts/CartContext";
import { formatRial } from "@/lib/format";

export function ShoppingCartPreview() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="shopping-cart">
        <div className="shopping-cart-logo">
          <MaterialIcon name="shopping_cart" />
        </div>
        <div className="shopping-cart-content">
          <span className="shopping-cart-content-title">سبد خرید شما خالی است !</span>
          <div className="shopping-cart-content-text">
            میتوانید برای مشاهده محصولات بیشتر به صفحات زیر مراجعه کنید
          </div>
        </div>
        <div className="shopping-cart-links">
          <Link href="/">صفحه اصلی</Link>
          <Link href="/blog">صفحه محصولات</Link>
        </div>
      </section>
    );
  }

  const previewItems = items.slice(0, 3);
  const remainingCount = items.length - previewItems.length;

  return (
    <section className="shopping-cart shopping-cart--filled">
      <ul className="shopping-cart-preview-list">
        {previewItems.map((item) => (
          <li key={item.id} className="shopping-cart-preview-item">
            <div className="shopping-cart-preview-item-pic">
              <Image src={item.image} alt="" width={item.imageWidth} height={item.imageHeight} />
            </div>
            <div className="shopping-cart-preview-item-content">
              <p>{item.title}</p>
              <span>
                {toPersianQuantity(item.quantity)} × {item.price.current}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {remainingCount > 0 ? (
        <div className="shopping-cart-preview-more">و {remainingCount} کالای دیگر</div>
      ) : null}
      <div className="shopping-cart-preview-subtotal">
        <span>جمع سبد خرید</span>
        <strong>{formatRial(subtotal)}</strong>
      </div>
      <div className="shopping-cart-links">
        <Link href="/cart" className="shopping-cart-links-primary">
          مشاهده سبد خرید
        </Link>
        <Link href="/">ادامه خرید</Link>
      </div>
    </section>
  );
}

function toPersianQuantity(quantity: number): string {
  return quantity.toLocaleString("fa-IR");
}
