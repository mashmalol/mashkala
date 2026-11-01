/**
 * Shared domain types for the Mashkala storefront.
 * Kept intentionally simple (no `any`) since the current data set is static
 * placeholder content for the storefront.
 */

/** A single hero slide shown in the top image slider. */
export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

/** A category tile shown in the "دسته بندی ها" grid. */
export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  href: string;
  /** Real intrinsic dimensions of `image`, used for next/image sizing. */
  width: number;
  height: number;
}

/** A navigation link used in the header, mobile menu, or footer. */
export interface NavLink {
  id: string;
  title: string;
  href: string;
  /** Optional Material Symbols icon name shown next to the label. */
  icon?: string;
}

/** A single entry in the "دسته بندی ها" flyout menu, with optional nested
 * (second-level) categories shown in a submenu. */
export interface CategoryNavLink extends NavLink {
  children?: NavLink[];
}

/** Pricing information for a product. Display values are pre-formatted
 * Persian numerals, exactly as they were authored in the original markup.
 * `amount` is the underlying Rial value (current/discounted price) used for
 * cart arithmetic. */
export interface ProductPrice {
  /** The current (possibly discounted) price, e.g. "۵,۰۳۹,۰۰۰ ریال" */
  current: string;
  /** The original price before discount. Omitted when there is no discount. */
  original?: string;
  /** Numeric Rial value of `current`, used for cart totals. */
  amount: number;
}

/** A single product card as shown in the promotional product slider and the
 * horizontally scrolling "slider-show" rows. */
export interface Product {
  id: string;
  title: string;
  image: string;
  price: ProductPrice;
  /** Real intrinsic dimensions of `image`, used for next/image sizing. */
  imageWidth: number;
  imageHeight: number;
  /** Optional selected variant/option shown on the product card and cart
   * line item, e.g. "رنگ: قرمز" or "سایز: بزرگ". */
  option?: string;
}

/** A horizontally-scrolling row of products with its own heading/link. */
export interface ProductRow {
  id: string;
  title: string;
  moreHref: string;
  products: Product[];
}

/** A single item inside the shopping cart. Mirrors `Product` plus quantity. */
export interface CartItem {
  id: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  option?: string;
  price: ProductPrice;
  quantity: number;
}

/** A rich-content block used to render a blog article body. */
export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "image"; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "list"; ordered?: boolean; items: string[] };

/** Author byline info shown on a blog article. */
export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

/** A blog / article teaser card, shown in the homepage blog rail and the
 * blog listing page. */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  href: string;
  category: string;
  readingTimeMinutes: number;
  author: BlogAuthor;
  tags: string[];
  content: BlogContentBlock[];
}

/** A "why choose us" feature item. */
export interface WhyUsItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  /** Real intrinsic dimensions of `image`, used for next/image sizing. */
  imageWidth: number;
  imageHeight: number;
}

/** An item in the mobile bottom navigation bar. */
export interface BottomNavItem {
  id: string;
  icon: string;
  label: string;
}

