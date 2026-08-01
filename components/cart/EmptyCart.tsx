import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function EmptyCart() {
  return (
    <div className="cart-empty">
      <div className="cart-empty-icon">
        <MaterialIcon name="shopping_cart" />
      </div>
      <h1>سبد خرید شما خالی است</h1>
      <p>هنوز محصولی به سبد خرید خود اضافه نکرده‌اید. می‌توانید از صفحه اصلی خرید خود را شروع کنید.</p>
      <Link href="/" className="cart-continue-btn">
        مشاهده محصولات
      </Link>
    </div>
  );
}
