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

export const SITE_NAME = "امیر کبیر کالا";

/** Short promotional links shown in the thin top row of the main menu. */
export const TOP_MENU_LINKS: NavLink[] = [
  { id: "discounts", title: "% تخفیفیات ویژه", href: "#", icon: "sell" },
];

/** The full primary navigation, used in both the desktop menu bar and the
 * mobile slide-in drawer. The "دسته بندی ها" trigger itself is rendered
 * separately (it opens the flyout in `CategoryDropdown`), so it isn't
 * repeated in this list. */
export const MAIN_NAV_LINKS: NavLink[] = [
  { id: "home", title: "خانه", href: "/", icon: "home" },
  { id: "shop", title: "فروشگاه", href: "#", icon: "storefront" },
  { id: "new-arrivals", title: "محصولات جدید", href: "#", icon: "new_releases" },
  { id: "best-sellers", title: "پرفروش‌ترین‌ها", href: "#", icon: "trending_up" },
  { id: "brands", title: "برندها", href: "#", icon: "verified" },
  { id: "deals", title: "% تخفیفیات ویژه", href: "#", icon: "sell" },
  { id: "blog", title: "مقالات", href: "/blog", icon: "article" },
  { id: "about", title: "درباره ما", href: "#", icon: "info" },
  { id: "contact", title: "تماس با ما", href: "#", icon: "call" },
  { id: "faq", title: "سوالات متداول", href: "#", icon: "help" },
  { id: "support", title: "پشتیبانی", href: "#", icon: "support_agent" },
  { id: "wishlist", title: "علاقه‌مندی‌ها", href: "#", icon: "favorite" },
];

/** Categories flyout menu. A couple of entries include nested sub-categories
 * to demonstrate/support the two-level structure requested for the dropdown. */
export const CATEGORY_NAV_LINKS: CategoryNavLink[] = [
  {
    id: "cat-1",
    title: "ابزار برقی و شارژی",
    href: "#",
    icon: "bolt",
    children: [
      { id: "cat-1-1", title: "دریل و دریل بکس", href: "#" },
      { id: "cat-1-2", title: "فرز و مینی فرز", href: "#" },
      { id: "cat-1-3", title: "پیچ‌گوشتی شارژی", href: "#" },
    ],
  },
  {
    id: "cat-2",
    title: "تجهیزات اندازه‌گیری و کنترل",
    href: "#",
    icon: "straighten",
    children: [
      { id: "cat-2-1", title: "متر و تراز", href: "#" },
      { id: "cat-2-2", title: "کولیس دیجیتال", href: "#" },
    ],
  },
  { id: "cat-3", title: "قطعات و لوازم یدکی صنعتی", href: "#", icon: "settings" },
  { id: "cat-4", title: "ماشین آلات و تجهیزات صنعتی", href: "#", icon: "precision_manufacturing" },
  { id: "cat-5", title: "مصالح و مواد اولیه صنعتی", href: "#", icon: "inventory_2" },
  { id: "cat-6", title: "پمپ‌ها و کمپرسورها", href: "#", icon: "compress" },
  { id: "cat-7", title: "سیستم‌های برودتی و حرارتی", href: "#", icon: "thermostat" },
  { id: "cat-8", title: "تجهیزات حفاظتی و ایمنی", href: "#", icon: "shield" },
  { id: "cat-9", title: "لوله‌ها و اتصالات صنعتی", href: "#", icon: "plumbing" },
  { id: "cat-10", title: "تجهیزات نورپردازی و روشنایی صنعتی", href: "#", icon: "light_mode" },
];

export const HERO_SLIDES: HeroSlide[] = [
  { id: "slide-1", src: "/images/slide-01.jpeg", alt: "banner" },
  { id: "slide-2", src: "/images/slide-02.jpeg", alt: "banner" },
  { id: "slide-3", src: "/images/slide-01.jpeg", alt: "banner" },
];

export const CATEGORY_ITEMS: CategoryItem[] = [
  { id: "drill", title: "دریل", image: "/images/category-drill.webp", href: "#", width: 200, height: 133 },
  { id: "mill", title: "فرز", image: "/images/category-mill.webp", href: "#", width: 200, height: 200 },
  { id: "polisher", title: "دستگاه پولیش", image: "/images/category-polisher.webp", href: "#", width: 200, height: 200 },
  { id: "generator", title: "موتور برق", image: "/images/category-generator.webp", href: "#", width: 200, height: 200 },
  { id: "water-pump", title: "پمپ آب", image: "/images/category-water-pump.webp", href: "#", width: 200, height: 200 },
  { id: "car-wash", title: "کارواش", image: "/images/category-car-wash.webp", href: "#", width: 200, height: 200 },
  { id: "measuring-tool", title: "ابزار اندازه گیری", image: "/images/category-measuring-tool.webp", href: "#", width: 200, height: 133 },
  { id: "garden-tools", title: "ابزار باغبانی", image: "/images/category-garden-tools.png", href: "#", width: 200, height: 150 },
  { id: "building-tools", title: "ابزار ساختمانی", image: "/images/category-building-tools.png", href: "#", width: 200, height: 133 },
  { id: "car-tools", title: "ابزار خودرو", image: "/images/category-car-tools.png", href: "#", width: 200, height: 187 },
];

const RONIX_HAMMER_PRICE = { current: "۵,۰۳۹,۰۰۰ ریال", original: "۶,۹۹۹,۰۰۰", amount: 5_039_000 };
const RAJABI_LOCK_PRICE = { current: "۶,۹۹۹,۰۰۰", amount: 6_999_000 };
const ARVA_VEST_PRICE = { current: "۵,۰۳۹,۰۰۰ ریال", original: "۶,۹۹۹,۰۰۰", amount: 5_039_000 };

export const FESTIVAL_PRODUCT_ROW: ProductRow = {
  id: "festival",
  title: "جشنواره تخفیفی",
  moreHref: "#",
  products: Array.from({ length: 10 }, (_, index) => ({
    id: `ronix-hammer-${index}`,
    title: "چکش مهندسی فایبر رونیکس",
    image: "/images/product-hammer-ronix.jpeg",
    price: RONIX_HAMMER_PRICE,
    imageWidth: 200,
    imageHeight: 200,
  })),
};

export const SLIDER_SHOW_ROWS: ProductRow[] = [
  {
    id: "rajabi-lock",
    title: "قفل رجبی",
    moreHref: "#",
    products: Array.from({ length: 7 }, (_, index) => ({
      id: `rajabi-lock-${index}`,
      title: "قفل حیاتی رجبی کلید ساده",
      image: "/images/product-rajabi-lock.png",
      price: RAJABI_LOCK_PRICE,
      imageWidth: 200,
      imageHeight: 200,
    })),
  },
  {
    id: "arva-bestsellers",
    title: "محصولات پر فروش آروا",
    moreHref: "#",
    products: Array.from({ length: 6 }, (_, index) => ({
      id: `arva-vest-${index}`,
      title: "جلیقه ابزار آروا",
      image: "/images/product-vest-arva.jpg",
      price: ARVA_VEST_PRICE,
      imageWidth: 200,
      imageHeight: 200,
    })),
  },
];

const BLOG_AUTHOR = {
  name: "مهندس رضا احمدی",
  role: "کارشناس ابزارآلات صنعتی",
  avatar: "/images/why-us-phone-support.png",
};

const FEATURED_ARTICLE_CONTENT: BlogPost["content"] = [
  {
    type: "paragraph",
    text:
      "از ابزارآلات پرکاربرد در صنایع مختلف می‌توان به اره موتوری اشاره کرد که به دلیل کارایی بالایی که دارد، در نجاری، باغبانی و عملیات امدادی کاربرد فراوانی پیدا کرده است. در این مقاله قدم‌به‌قدم یاد می‌گیرید چطور یک اره موتوری را ایمن روشن کنید، برش بزنید و نگهداری کنید.",
  },
  { type: "heading", level: 2, text: "۱. آشنایی با اجزای اصلی اره موتوری", id: "parts" },
  {
    type: "paragraph",
    text:
      "پیش از هر چیز باید با اجزای اصلی دستگاه آشنا شوید: زنجیر برش، میله هادی، ترمز زنجیر، دسته گاز و مخزن سوخت. شناخت درست هر قطعه از بروز حوادث در حین کار جلوگیری می‌کند و عمر مفید دستگاه را افزایش می‌دهد.",
  },
  {
    type: "image",
    src: "/images/blog-thumbnail.webp",
    alt: "اجزای اره موتوری",
    width: 900,
    height: 500,
    caption: "نمایی از اجزای اصلی یک اره موتوری بنزینی",
  },
  { type: "heading", level: 2, text: "۲. نکات ایمنی پیش از روشن‌کردن دستگاه", id: "safety" },
  {
    type: "list",
    items: [
      "همیشه از عینک و دستکش ایمنی استفاده کنید.",
      "قبل از روشن‌کردن، ترمز زنجیر را بررسی کنید.",
      "در محیطی با تهویه مناسب کار کنید.",
      "از حضور افراد دیگر در شعاع کاری اطمینان حاصل کنید.",
    ],
  },
  {
    type: "quote",
    text: "بیشتر حوادث اره موتوری نه به دلیل ضعف دستگاه، بلکه به دلیل غفلت از نکات ایمنی ساده اتفاق می‌افتند.",
    cite: "راهنمای ایمنی ابزارآلات صنعتی",
  },
  { type: "heading", level: 2, text: "۳. تنظیم کشش زنجیر", id: "chain-tension" },
  {
    type: "paragraph",
    text:
      "کشش نامناسب زنجیر یکی از رایج‌ترین دلایل کاهش عمر میله هادی است. برای بررسی سریع کشش زنجیر می‌توانید از دستور زیر در چک‌لیست نگهداری روزانه استفاده کنید:",
  },
  {
    type: "code",
    language: "text",
    code: "چک‌لیست روزانه:\n[ ] بررسی کشش زنجیر\n[ ] بررسی سطح روغن زنجیر\n[ ] بررسی سطح سوخت\n[ ] تمیزکردن فیلتر هوا",
  },
  { type: "heading", level: 2, text: "۴. نگهداری پس از استفاده", id: "maintenance" },
  {
    type: "paragraph",
    text:
      "پس از پایان کار، مخزن سوخت را تخلیه کنید، زنجیر و میله هادی را تمیز کنید و دستگاه را در محیطی خشک نگهداری کنید. رعایت این نکات ساده، عمر ابزار شما را به‌طور قابل توجهی افزایش می‌دهد.",
  },
];

const GENERIC_ARTICLE_CONTENT: BlogPost["content"] = [
  {
    type: "paragraph",
    text:
      "از ابزارآلات پرکاربرد در صنایع مختلف می‌توان به فرز و مینی فرز اشاره کرد که به‌دلیل کارایی بالایی که دارند از آن‌ها در نجاری، خودروسازی و صنعت ساختمان‌سازی استفاده می‌شود. اگر قصد دارید فرز یا مینی فرز تهیه کنید، در ادامه با نکات مهم انتخاب آشنا می‌شوید.",
  },
  { type: "heading", level: 2, text: "نکات مهم پیش از خرید", id: "before-buying" },
  {
    type: "list",
    items: ["توان موتور متناسب با نوع کاربرد", "قطر صفحه مناسب", "وجود سیستم ایمنی قطع سریع"],
  },
  {
    type: "paragraph",
    text: "در نهایت توصیه می‌شود همیشه از قطعات یدکی اصلی و برندهای معتبر استفاده کنید تا ایمنی و کیفیت کار شما تضمین شود.",
  },
];

const BLOG_DATE = "یکشنبه 27 فروردین 1402 ساعت 16:00";

const BLOG_TITLES = [
  "نحوه کار با اره موتوری",
  "راهنمای خرید فرز و مینی فرز",
  "۷ نکته برای نگهداری از دریل شارژی",
  "تفاوت قفل‌های رمزی و کلیددار",
  "چگونه ابزار مناسب باغبانی را انتخاب کنیم؟",
  "راهنمای کامل خرید موتور برق خانگی",
  "اصول ایمنی کار با ابزار برقی",
];

export const BLOG_POSTS: BlogPost[] = BLOG_TITLES.map((title, index) => ({
  id: `blog-${index}`,
  slug: `article-${index + 1}`,
  title,
  image: "/images/blog-thumbnail.webp",
  date: BLOG_DATE,
  excerpt:
    "از ابزارآلات پرکاربرد در صنایع مختلف می‌توان به فرز و مینی فرز اشاره کرد که به‌دلیل کارایی بالایی که دارند از آن‌ها در نجاری، خودروسازی و صنعت ساختمان‌سازی استفاده می‌شود. اگر قصد دارید فرز یا مینی فر...",
  href: `/blog/article-${index + 1}`,
  category: "راهنمای خرید",
  readingTimeMinutes: index === 0 ? 6 : 4,
  author: BLOG_AUTHOR,
  tags: ["ابزار صنعتی", "راهنمای خرید", "نگهداری ابزار"],
  content: index === 0 ? FEATURED_ARTICLE_CONTENT : GENERIC_ARTICLE_CONTENT,
}));

export const WHY_US_ITEMS: WhyUsItem[] = [
  { id: "authenticity", image: "/images/why-us-authenticity.png", title: "اصالت کالا", imageWidth: 200, imageHeight: 200 },
  { id: "online-shopping", image: "/images/why-us-online-shopping.png", title: "خرید آنلاین", imageWidth: 200, imageHeight: 200 },
  {
    id: "phone-support",
    image: "/images/why-us-phone-support.png",
    title: "پشتیبانی تلفنی",
    description: "از ساعت 9:00 الی 16:30",
    imageWidth: 200,
    imageHeight: 200,
  },
  { id: "best-price", image: "/images/why-us-best-price.png", title: "بهترین قیمت", imageWidth: 200, imageHeight: 200 },
  { id: "shipping", image: "/images/why-us-shipping.png", title: "ارسال با پست و تیپاکس", imageWidth: 256, imageHeight: 256 },
];

/** Footer link columns. Real internal routes are used where a matching page
 * exists (blog, login, register); the rest intentionally point to "#" since
 * no matching page exists yet in this build. */
export const FOOTER_LINKS: NavLink[] = [
  { id: "shipping", title: "حمل و نقل", href: "#" },
  { id: "privacy", title: "حریم خصوصی", href: "#" },
  { id: "about", title: "درباره ما", href: "#" },
  { id: "blog", title: "وبلاگ", href: "/blog" },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { id: "faq", title: "سوالات متداول", href: "#" },
  { id: "contact", title: "تماس با ما", href: "#" },
  { id: "returns", title: "شرایط بازگشت کالا", href: "#" },
  { id: "track-order", title: "پیگیری سفارش", href: "#" },
];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: "home", icon: "home", label: "خانه" },
  { id: "category", icon: "category", label: "دسته بندی" },
  { id: "search", icon: "search", label: "جستوجو" },
  { id: "cart", icon: "shopping_cart", label: "سبد" },
  { id: "profile", icon: "person", label: "پروفایل" },
  { id: "more", icon: "more_horiz", label: "بیشتر" },
];
