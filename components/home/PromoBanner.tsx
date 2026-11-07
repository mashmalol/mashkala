export interface PromoBannerProps {
  href: string;
  src: string;
  alt: string;
  /** CSS `object-position` used to pick which band of the artwork stays
   * visible inside the fixed-height banner frame. */
  objectPosition?: string;
}

/**
 * A full-width clickable promotional banner image. Used twice on the
 * homepage (top discount banner and the mid-page promo banner) with the
 * exact same markup/styling, so it is extracted into one component.
 */
export function PromoBanner({ href, src, alt, objectPosition }: PromoBannerProps) {
  return (
    <div className="banner">
      <a href={href}>
        {/* Plain <img>: the banner's height is intentionally fluid (auto,
            driven by the image's natural aspect ratio) so next/image's
            required fixed dimensions would risk a layout mismatch. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={objectPosition ? { objectPosition } : undefined} />
      </a>
    </div>
  );
}
