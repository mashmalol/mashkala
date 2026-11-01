import Link from "next/link";

/**
 * Styled as a 1990s modal error dialog: the page could not be loaded, and the
 * only useful action is going back to the start page.
 */
export default function NotFound() {
  return (
    <main className="browser-error-page">
      <div className="browser-error-dialog">
        <div className="browser-error-titlebar">Document Not Found</div>
        <div className="browser-error-body">
          <p className="browser-error-code">404</p>
          <p className="browser-error-text">این صفحه وجود ندارد یا جابه‌جا شده است.</p>
          <Link href="/" className="browser-error-link">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
