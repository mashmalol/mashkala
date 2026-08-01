export function CartSkeleton() {
  return (
    <div className="cart-page-grid" aria-busy="true" aria-label="در حال بارگذاری سبد خرید">
      <ul className="cart-items">
        {Array.from({ length: 3 }, (_, index) => (
          <li className="cart-item-row cart-item-row--skeleton" key={index}>
            <div className="skeleton-box cart-item-pic" />
            <div className="cart-item-main">
              <div className="skeleton-box skeleton-line" style={{ width: "70%" }} />
              <div className="skeleton-box skeleton-line" style={{ width: "40%" }} />
            </div>
            <div className="skeleton-box skeleton-line" style={{ width: "80px" }} />
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="skeleton-box skeleton-line" style={{ width: "50%", height: "22px" }} />
        <div className="skeleton-box skeleton-line" style={{ width: "100%", height: "40px" }} />
        <div className="skeleton-box skeleton-line" style={{ width: "100%", height: "40px" }} />
        <div className="skeleton-box skeleton-line" style={{ width: "100%", height: "46px" }} />
      </div>
    </div>
  );
}
