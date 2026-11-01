import type {
  BlogPost,
  BottomNavItem,
  CategoryItem,
  CategoryNavLink,
  HeroSlide,
  NavLink,
  ProductRow,
  WhyUsItem,
} from "@/types";

/**
 * Content is intentionally empty so the UI renders as a structural skeleton.
 * Fill these arrays in (or replace them with data from your own API/CMS) and
 * the existing components will render the content automatically.
 */

/** Site identity. */
export const SITE_NAME = "Mashkala";

/** Absolute site URL — shown in metadata and used for canonical/OpenGraph links.
 * Replace it with your live deployment URL when you publish. */
export const SITE_URL = "http://localhost:3000";

/** Short promotional links shown in the thin top row of the main menu. */
export const TOP_MENU_LINKS: NavLink[] = [];

/** The full primary navigation, used in both the desktop menu bar and the
 * mobile slide-in drawer. The "دسته بندی ها" trigger itself is rendered
 * separately (it opens the flyout in `CategoryDropdown`), so it isn't
 * repeated in this list. */
export const MAIN_NAV_LINKS: NavLink[] = [];

/** Categories flyout menu (supports one nested level via `children`). */
export const CATEGORY_NAV_LINKS: CategoryNavLink[] = [];

/** Slides for the homepage hero slider. */
export const HERO_SLIDES: HeroSlide[] = [];

/** Category tiles for the "دسته بندی ها" grid. */
export const CATEGORY_ITEMS: CategoryItem[] = [];

/** Highlighted promo row ("جشنواره تخفیفی") with its own product list. */
export const FESTIVAL_PRODUCT_ROW: ProductRow = {
  id: "festival",
  title: "",
  moreHref: "#",
  products: [],
};

/** Horizontally scrolling product rows, each with its own heading. */
export const SLIDER_SHOW_ROWS: ProductRow[] = [];

/** Blog posts, used by the homepage rail, the listing page and `/blog/[slug]`. */
export const BLOG_POSTS: BlogPost[] = [];

/** "Why choose us" feature items. */
export const WHY_US_ITEMS: WhyUsItem[] = [];

/** Footer link columns. Real internal routes are used where a matching page
 * exists (blog, login, register); the rest intentionally point to "#". */
export const FOOTER_LINKS: NavLink[] = [];

export const FOOTER_SERVICE_LINKS: NavLink[] = [];

/** Mobile bottom navigation bar. */
export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [];
