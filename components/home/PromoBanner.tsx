import Link from "next/link";

export interface PromoBannerProps {
  href: string;
  src: string;
  alt: string;
  /** CSS `object-position` used to pick which band of the artwork stays
   * visible inside the fixed-height banner frame. */
  objectPosition?: string;
  /** Headline overlaid on the artwork's negative space. */
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  /** Which side of the banner the copy sits on (the art dictates it). */
  align?: "start" | "end";
}

/**
 * A full-width clickable promotional banner image. Used twice on the
 * homepage (top discount banner and the mid-page promo banner) with the
 * exact same markup/styling, so it is extracted into one component.
 *
 * The generated key art leaves a dark area free on one side; when `title` is
 * supplied a small copy block + CTA is laid over it.
 */
export function PromoBanner({
  href,
  src,
  alt,
  objectPosition,
  title,
  subtitle,
  ctaLabel,
  align = "start",
}: PromoBannerProps) {
  const hasCopy = Boolean(title);

  return (
    <div className="banner">
      <Link href={href} aria-label={hasCopy ? title : alt}>
        {/* Plain <img>: the banner's height is intentionally fluid (auto,
            driven by the image's natural aspect ratio) so next/image's
            required fixed dimensions would risk a layout mismatch. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={objectPosition ? { objectPosition } : undefined} />

        {hasCopy ? (
          <>
            <span
              className={`promo-copy-scrim promo-copy-scrim--${align}`}
              aria-hidden="true"
            />
            <span className={`promo-copy promo-copy--${align}`}>
              <span className="promo-copy-title">{title}</span>
              {subtitle ? <span className="promo-copy-subtitle">{subtitle}</span> : null}
              {ctaLabel ? (
                <span className="promo-copy-cta">
                  {ctaLabel}
                  <span aria-hidden="true">‹</span>
                </span>
              ) : null}
            </span>
          </>
        ) : null}
      </Link>
    </div>
  );
}
