import { toPersianDigits } from "@/lib/format";
import type {
  BlogPost,
  BottomNavItem,
  CategoryItem,
  CategoryNavLink,
  HeroSlide,
  NavLink,
  Product,
  ProductRow,
  WhyUsItem,
} from "@/types";

/**
 * Content for the storefront. Sections that are still empty render as a
 * structural skeleton — fill their arrays in (or replace them with data from
 * your own API/CMS) and the existing components will render automatically.
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
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-blue",
    src: "/images/banners/banner-blue.jpg",
    alt: "طعم‌های منحصر‌به‌فرد با طراحی اختصاصی؛ قوطی‌های مشکله در شب شرقی",
  },
  {
    id: "hero-black",
    src: "/images/banners/banner-black.jpg",
    alt: "نوشابه‌های طراحی‌شدهٔ اختصاصی مشکله روی زمینهٔ مشکی و طلایی",
  },
  {
    id: "hero-light",
    src: "/images/banners/banner-light.jpg",
    alt: "فروش انحصاری نوشابه‌های خاص مشکله با طرح‌های هنری",
  },
];

/** Category tiles for the "دسته بندی ها" grid. */
export const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: "classic",
    title: "کلاسیک",
    image: "/images/categories/classic.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
  {
    id: "fruit",
    title: "میوه‌ای",
    image: "/images/categories/fruit.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
  {
    id: "cola",
    title: "کولا تیره",
    image: "/images/categories/cola.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
  {
    id: "citrus",
    title: "لیمو و مرکبات",
    image: "/images/categories/citrus.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
  {
    id: "art",
    title: "طرح‌های هنری",
    image: "/images/categories/art.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
  {
    id: "gift",
    title: "پکیج هدیه",
    image: "/images/categories/gift.jpg",
    href: "#",
    width: 600,
    height: 600,
  },
];

/** Formats a Toman price for display, e.g. `125` -> `"۱۲۵ تومان"`. */
function toman(value: number): string {
  return `${toPersianDigits(value.toLocaleString("en-US"))} تومان`;
}

/** Builds a product entry from its id, copy and price; the image is derived from the id.
 * `priceToman` is the shelf price in Toman (stored as Rial in `price.amount`). */
function can(id: string, title: string, description: string, priceToman = 91): Product {
  return {
    id,
    title,
    description,
    image: `/images/products/${id}.jpg`,
    imageWidth: 780,
    imageHeight: 1170,
    price: { current: toman(priceToman), amount: priceToman * 10 },
  };
}

/** Full canned-drinks catalogue shown across the homepage product rows. */
export const PRODUCTS: Product[] = [
  can(
    "limoo",
    "نوشابه گازدار لیمو",
    "طعم تازه و ترش لیموی طبیعی با حباب‌های ریز و پایدار؛ خنکی‌ای که تشنگی گرمای ظهر را یک‌ضربه از بین می‌برد.",
  ),
  can(
    "nove",
    "نوشابه گازدار نوه",
    "انبهٔ رسیده با رایحهٔ گرمسیری و شیرینی ملایم، در قوطی سرمه‌ای و طلایی؛ طعمی نو که از اولین جرعه جا باز می‌کند.",
  ),
  can(
    "atash",
    "نوشابه گازدار آتش",
    "انار سرخ با گازِ پرقدرت و پایانی کمی ترش؛ شعله‌ای خنک برای لحظه‌هایی که به کمی هیجان نیاز دارید.",
  ),
  can(
    "shole",
    "نوشابه گازدار شعله",
    "انار غلیظ و پردانه با انرژی سرخ و حباب‌های درشت؛ طعمی پرشور که تا آخرین قطره گرم و پرقدرت می‌ماند.",
  ),
  can(
    "alale",
    "نوشابه گازدار آلاله",
    "طراوت سرخ انار با شیرینی کم و عطری گل‌گون؛ نوشیدنی لطیفی که رنگ و طعمش حال‌وهوای بهار را به کام می‌آورد.",
  ),
  can(
    "firooze",
    "نوشابه گازدار فیروزه",
    "سیب سبزِ ترش و خنک با ته‌مایه‌ای از طراوت فیروزه‌ای؛ سبک، گوارا و بی‌نهایت تشنه‌نواز برای بعدازظهرهای گرم.",
  ),
  can(
    "shaghayegh",
    "نوشابه گازدار شقایق",
    "هلوی آبدار با رایحهٔ گل و شیرینی آرام؛ ترکیبی نرم و خوش‌عطر که هر جرعه‌اش یادآور یک تابستان بی‌عجله است.",
  ),
  can(
    "arghavan",
    "نوشابه گازدار ارغوان",
    "انگور سیاه با عمق و شیرینی طبیعی، بی‌آنکه زیاد شیرین باشد؛ طعمی پر و مخملی برای نوشیدن آرام و آهسته.",
  ),
  can(
    "tala",
    "نوشابه گازدار طلا",
    "انبهٔ متمرکز و پررنگ با پایانی تازه؛ در قوطی مشکی و طلایی، انتخاب کسانی که طعمی سخت و پرقدرت می‌خواهند.",
  ),
  can(
    "sabz",
    "نوشابه گازدار سبز",
    "نعنا خنک و تند با احساس خنکای فوری در گلو؛ نوشیدنی سبک برای نفس‌های عمیق و لحظه‌های داغ تابستان.",
  ),
  can(
    "sorkh",
    "نوشابه گازدار سرخ",
    "انار پررنگ با گازِ تیز و طعم سرخِ ماندگار؛ ساده، مستقیم و بی‌حاشیه، ساخته‌شده برای عاشقان واقعی انار.",
  ),
  can(
    "abi",
    "نوشابه گازدار آبی",
    "لیموی آبدار با اسیدیتهٔ متعادل و حباب‌های ریز؛ خنکی آبی‌رنگ که کام را تازه، تمیز و آمادهٔ ادامهٔ روز می‌کند.",
  ),
  can(
    "siah",
    "نوشابه گازدار سیاه",
    "لیمو در قالبی مینیمال و مشکی؛ همان خنکی آشنا با حسی مدرن و پایانی کوتاه، تلخ‌شیرین و به‌یادماندنی.",
  ),
  can(
    "khande",
    "نوشابه گازدار خنده",
    "انبهٔ شیرین و شاد با طعمی بی‌تکلف و بچگانه؛ قوطی رنگارنگش را باز کنید و هر لحظهٔ ساده را جشن بگیرید.",
  ),
  can(
    "golshan",
    "نوشابه گازدار گلشن",
    "توت‌فرنگی رسیده با عطر گل و شیرینی رنگارنگ؛ طعمی شاد و دخترانه که کام را تا مدت‌ها خوش‌بو نگه می‌دارد.",
  ),
  can(
    "sepid",
    "نوشابه گازدار سپید",
    "انبه با شیرینی متعادل و پایانی نرم، در قوطی نقره‌ای با نقش‌های سنتی؛ شادی هر لحظه، بسته‌بندی‌شده در یک قوطی.",
  ),
  can(
    "azar",
    "نوشابه گازدار آذر",
    "پرتقال طبیعی با شیرینی گرم و ته‌مایه‌ای از پوست‌نارنج؛ نوشیدنی مخصوص روزهای سرد و عصرهای دورهمی خانوادگی.",
  ),
  can(
    "aftab",
    "نوشابه گازدار آفتاب",
    "لیمو با حباب‌های آرام و شیرینی نوستالژیک؛ طعمی که بوی خاطره‌های قدیم و نوشابه‌های یخ‌زدهٔ کوپنی را می‌دهد.",
  ),
  can(
    "nasim-classic",
    "نوشابه گازدار نسیم (کلاسیک)",
    "پرتقال کلاسیک با رایحهٔ آشنای دیروز و شیرینی ملایم؛ نسیمی که تابستان‌های دور و بطری‌های شیشه‌ای را زنده می‌کند.",
  ),
  can(
    "yaghut",
    "نوشابه گازدار یاقوت",
    "آلبالوی ترش و سرخ با طعمی غلیظ و پایانی خوش‌ترشی؛ یاقوتی در قوطی برای عاشقان طعم‌های اصیل ایرانی.",
  ),
  can(
    "zarin",
    "نوشابه گازدار زرین",
    "زردآلوی رسیده با شیرینی طلایی و عطر گرم؛ طعمی متفاوت و کمی لوکس که کمتر جایی پیدا می‌شود.",
  ),
  can(
    "samsin",
    "نوشابه گازدار سمسین",
    "لیمو با گازِ روشن و سبک، در قوطی نقره‌ای و سرمه‌ای؛ خنکی ساده‌ای که هر لحظهٔ خسته را روشن می‌کند.",
  ),
  can(
    "behshinam",
    "نوشابه گازدار بحشینم",
    "خیار تازه و نعنا با خنکای خالص و طعمی سبک؛ نزدیک‌ترین حس به یک لیوان آب خنک، این بار با حباب.",
  ),
  can(
    "khorshid",
    "نوشابه گازدار خورشید",
    "انار و پرتقال در کنار هم، با انرژی سرخ و شیرینی گرم؛ ترکیبی آفتابی برای شروع پرقدرت و پرانرژی روز.",
  ),
  can(
    "baran",
    "نوشابه گازدار باران",
    "انگور آبدار با طراوت باران و حباب‌های لطیف؛ نوشیدنی خنک و کمی شیرین که به روزهای ابری حس خوب می‌دهد.",
  ),
  can(
    "golbarg",
    "نوشابه گازدار گلبرگ",
    "توت‌فرنگی با عطر گلبرگ و شیرینی لطیف؛ طعمی نرم و خوش‌رنگ که هر جرعه‌اش دل را کمی بازتر می‌کند.",
  ),
  can(
    "nasim-taze",
    "نوشابه گازدار نسیم (تازه)",
    "پرتقال تازه با گازِ سبک و عطری مرکباتی؛ نسیمی خنک برای لحظه‌هایی که فقط به یک نفس تازه نیاز دارید.",
  ),
  can(
    "shabnam",
    "نوشابه گازدار شبنم",
    "لیمو و نعنا با خنکای هر نفس؛ ترکیبی شفاف و سبک که مثل شبنم صبح، کام را تازه و بیدار می‌کند.",
  ),
  can(
    "bahar",
    "نوشابه گازدار بهار",
    "انار و لیمو با تعادلی ترش و شیرین؛ طعمی بهاری و سرزنده برای وقتی که دلتان یک شروع تازه می‌خواهد.",
  ),

  /* --- Dark-cola line: شبگرد --- */
  can(
    "shabgard-moj",
    "نوشابه گازدار شبگرد (موج شب)",
    "کولا تیره با گازِ نرم و پایانی تلخِ دلپذیر؛ قوطی آبی با موج‌های شبانه، برای وقتی که شب تازه شروع شده.",
    125,
  ),
  can(
    "shabgard-gardab",
    "نوشابه گازدار شبگرد (گرداب بنفش)",
    "کولا با عطر کاراملی و حباب‌های ریز، در طرح گردابی بنفش؛ طعمی عمیق که آرام‌آرام کام را پر می‌کند.",
    125,
  ),
  can(
    "shabgard-chehre",
    "نوشابه گازدار شبگرد (چهرهٔ شب)",
    "کولای تیره با بدنهٔ تلخ و شیرین متعادل، در قابی هندسی و مرموز؛ انتخابی برای کسانی که طراحی جسور دوست دارند.",
    125,
  ),
  can(
    "shabgard-bagh",
    "نوشابه گازدار شبگرد (باغ شب)",
    "کولا تیره با رایحهٔ ملایم و پایانی خنک، در نقش‌های باغ ایرانی؛ طعمی که شب را به یک دورهمی آرام تبدیل می‌کند.",
    125,
  ),
  can(
    "shabgard-karavan",
    "نوشابه گازدار شبگرد (کاروان شب)",
    "کولا با گازِ پرانرژی و شیرینی گرم، در طرح کاروان و ماه؛ نوشیدنی سفرهای شبانه و جاده‌های خالی.",
    125,
  ),
  can(
    "shabgard-ghab",
    "نوشابه گازدار شبگرد (قاب نقره)",
    "کولا تیره در قوطی نقره‌ای با نقش‌های ظریف؛ طعمی متعادل و تمیز که بعد از هر جرعه کام را تازه می‌گذارد.",
    125,
  ),
  can(
    "shabgard-sorkh",
    "نوشابه گازدار شبگرد (شب سرخ)",
    "کولای تیره با شیرینی بیشتر و ته‌مایهٔ سرخ؛ طعمی گرم و پرشور برای شب‌هایی که خواب دیر می‌آید.",
    125,
  ),
  can(
    "shabgard-zomorrod",
    "نوشابه گازدار شبگرد (شب زمرد)",
    "کولا با پایانی خنک و ته‌مایهٔ کمی گیاهی، در سبزِ زمردی؛ نوشیدنی سبک برای شب‌های تابستانی و تراس.",
    125,
  ),
  can(
    "shabgard-banafsh",
    "نوشابه گازدار شبگرد (شب بنفش)",
    "کولا تیره با عطری میوه‌ای و محو و حباب‌های نرم، در قوطی بنفش؛ طعمی آرام و متفاوت از کولای کلاسیک.",
    125,
  ),
  can(
    "shabgard-niloofar",
    "نوشابه گازدار شبگرد (نیلوفر شب)",
    "کولا با گازِ ملایم و پایان تازه، در طرح نیلوفر و انعکاس ماه روی آب؛ طعمی شاعرانه و بی‌عجله.",
    125,
  ),
  can(
    "shabgard-sarv",
    "نوشابه گازدار شبگرد (سرو و ماه)",
    "کولا تیره با شیرینی کم و عطری دودیِ محو، در قاب سرو و هلال؛ طعمی اصیل برای شب‌های طولانی.",
    125,
  ),

  /* --- Dark-cola line: مهتاب، هلال و خط مدرن --- */
  can(
    "mahtab-lake",
    "نوشابه گازدار مهتاب (دریاچه)",
    "کولا تیره با حباب‌های ریز و پایانی نرم، در منظرهٔ ماه روی دریاچه؛ نوشیدنی آرام برای سکوت شب.",
    130,
  ),
  can(
    "helal",
    "نوشابه گازدار هلال",
    "کولا با گازِ متوسط و شیرینی متعادل، در قوطی نقره‌ای و نقش هلال؛ طعمی کلاسیک با پایانی خنک.",
    135,
  ),
  can(
    "mahtab-window",
    "نوشابه گازدار مهتاب (پنجره)",
    "کولا تیره با عطر کارامل و پایانی خشک، در قاب پنجرهٔ ماه؛ انتخاب متعادل برای عصرهای دیروقت.",
    130,
  ),
  can(
    "aftab-cola",
    "نوشابه گازدار آفتاب (کولا تیره)",
    "کولا تیره با شیرینی گرم و ته‌مایهٔ مرکبات، در طرح خورشید؛ طعمی که شب را به صبح وصل می‌کند.",
    120,
  ),
  can(
    "zarin-cola",
    "نوشابه گازدار زرین (کولا تیره)",
    "کولا با بدنهٔ غلیظ و شیرینی طلایی، در قوطی طلایی؛ طعمی پرمایه و کمی لوکس برای مهمانی‌های شبانه.",
    140,
  ),
  can(
    "no",
    "نوشابه گازدار نو (کولا تیره)",
    "کولا تیره با طعمی تمیز و مدرن، در قوطی مشکی و طلایی؛ همان کولای آشنا، این بار با حسی تازه.",
    110,
  ),
  can(
    "pas",
    "نوشابه گازدار پاس (کولا تیره)",
    "کولا با گازِ تیز و شیرینی مستقیم، در قوطی نقره‌ای با نوار آبی و سرخ؛ انرژی سریع برای لحظه‌های کوتاه.",
    105,
  ),
  can(
    "siah-cola",
    "نوشابه گازدار سیاه (کولا تیره)",
    "کولا تیره در قالبی کاملاً مینیمال و مشکی؛ طعمی ساده و بی‌حاشیه برای کسانی که حاشیه دوست ندارند.",
    95,
  ),
  can(
    "tiz",
    "نوشابه گازدار تیز (کولا تیره)",
    "کولا با گازِ قوی و ضربهٔ اولیهٔ تند، در قوطی مشکی و سرخ؛ نوشیدنی کسانی که طعم پرقدرت می‌خواهند.",
    115,
  ),
  can(
    "sorkh-cola",
    "نوشابه گازدار سرخ (کولا تیره)",
    "کولا تیره با شیرینی کلاسیک و پایانی کوتاه، در قوطی سرخ؛ طعمی آشنا و بی‌زحمت برای هر شب.",
    95,
  ),
  can(
    "abi-sorkh",
    "نوشابه گازدار آبی‌سرخ (کولا تیره)",
    "کولا با گازِ پرانرژی و شیرینی متعادل، در قوطی نقره‌ای با دایرهٔ آبی و سرخ؛ طعمی که بیدار نگه می‌دارد.",
    105,
  ),
  can(
    "sabz-cola",
    "نوشابه گازدار سبز (کولا تیره)",
    "کولا با پایانی خنک و ته‌مایهٔ لیمویی، در قوطی سبز؛ سبک‌تر از کولای کلاسیک و مناسب شب‌های گرم.",
    95,
  ),
  can(
    "minimal",
    "نوشابه گازدار مینیمال",
    "کولا تیره با طعمی تمیز و بدون شیرینی اضافه، در طراحی مینیمال مشکی؛ برای ذائقه‌های ساده‌پسند.",
    110,
  ),
  can(
    "line",
    "نوشابه گازدار لاین",
    "کولا با گازِ نرم و بدنهٔ سبک، در قوطی نقره‌ای با خط‌های موازی؛ طعمی مرتب و قابل‌اعتماد برای هر روز.",
    110,
  ),

  /* --- Dark-cola line: کندل --- */
  can(
    "kandel-1",
    "نوشابه گازدار کندل (روند صعودی)",
    "کولا تیره با شیرینی متعادل و پایانی خشک، در طرح نمودار صعودی؛ طعمی که رو به بالا می‌رود.",
    130,
  ),
  can(
    "kandel-2",
    "نوشابه گازدار کندل (نقره‌ای)",
    "کولا با گازِ ریز و عطر کارامل، در قوطی نقره‌ای و نمودار سبز و سرخ؛ انتخابی برای شب‌های کاری.",
    130,
  ),
  can(
    "kandel-3",
    "نوشابه گازدار کندل (بازار)",
    "کولا تیره با بدنهٔ پر و شیرینی کم، در قاب نقره‌ای بازار؛ طعمی جدی و بی‌حاشیه.",
    130,
  ),
  can(
    "kandel-4",
    "نوشابه گازدار کندل (رنگ تند)",
    "کولا با گازِ پرانرژی و رنگ‌های تند، در طرح پرچم و نمودار؛ نوشیدنی شب‌های پرهیجان.",
    130,
  ),
  can(
    "kandel-5",
    "نوشابه گازدار کندل (گرافیک قوی)",
    "کولا تیره با شیرینی گرم و پایانی بلند، در گرافیکی جسور با سبز و سرخ؛ طعمی که فراموش نمی‌شود.",
    130,
  ),
  can(
    "kandel-6",
    "نوشابه گازدار کندل (مینیمال)",
    "کولا با گازِ سبک و طعمی تمیز، در قوطی مشکی با فلش صعودی؛ ساده، مدرن و رو به جلو.",
    130,
  ),
];

/** Picks catalogue products by id, so rows stay in sync with `PRODUCTS`. */
function pick(...ids: string[]): Product[] {
  return ids.map((id) => {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Unknown product id: ${id}`);
    }
    return product;
  });
}

/** Highlighted promo row ("جشنواره تخفیفی") with its own product list. */
export const FESTIVAL_PRODUCT_ROW: ProductRow = {
  id: "festival",
  title: "جشنواره نوشیدنی‌های گازدار",
  moreHref: "#",
  products: pick("limoo", "nove", "atash", "firooze", "yaghut", "shabnam"),
};

/** Horizontally scrolling product rows, each with its own heading. */
export const SLIDER_SHOW_ROWS: ProductRow[] = [
  {
    id: "fruit",
    title: "طعم‌های میوه‌ای",
    moreHref: "#",
    products: pick(
      "shole",
      "alale",
      "shaghayegh",
      "arghavan",
      "khande",
      "golshan",
      "sepid",
      "khorshid",
      "baran",
      "golbarg",
    ),
  },
  {
    id: "modern",
    title: "خط مدرن",
    moreHref: "#",
    products: pick("tala", "sabz", "sorkh", "abi", "siah"),
  },
  {
    id: "classic",
    title: "کلاسیک و خاص",
    moreHref: "#",
    products: pick(
      "azar",
      "aftab",
      "nasim-classic",
      "zarin",
      "samsin",
      "behshinam",
      "nasim-taze",
      "bahar",
    ),
  },
  {
    id: "night",
    title: "خط شبگرد",
    moreHref: "#",
    products: pick(
      "shabgard-moj",
      "shabgard-gardab",
      "shabgard-chehre",
      "shabgard-bagh",
      "shabgard-karavan",
      "shabgard-ghab",
      "shabgard-sorkh",
      "shabgard-zomorrod",
      "shabgard-banafsh",
      "shabgard-niloofar",
      "shabgard-sarv",
    ),
  },
  {
    id: "dark-cola",
    title: "کولا تیره",
    moreHref: "#",
    products: pick(
      "mahtab-lake",
      "mahtab-window",
      "helal",
      "aftab-cola",
      "zarin-cola",
      "no",
      "pas",
      "siah-cola",
      "tiz",
      "sorkh-cola",
      "abi-sorkh",
      "sabz-cola",
      "minimal",
      "line",
    ),
  },
  {
    id: "candle",
    title: "سری کندل",
    moreHref: "#",
    products: pick(
      "kandel-1",
      "kandel-2",
      "kandel-3",
      "kandel-4",
      "kandel-5",
      "kandel-6",
    ),
  },
];

/** Blog posts, used by the homepage rail, the listing page and `/blog/[slug]`. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "party-guide",
    slug: "party-guide",
    title: "راهنمای انتخاب نوشیدنی برای یک مهمانی شبانه",
    image: "/images/blog/party-guide.jpg",
    date: "۱۸ آبان ۱۴۰۵",
    excerpt:
      "از تعداد قوطی تا ترکیب طعم‌ها؛ چند قاعدهٔ ساده که مهمانی شبانه‌تان را بی‌نقص می‌کند.",
    href: "/blog/party-guide",
    category: "راهنمای خرید",
    readingTimeMinutes: 6,
    author: {
      name: "تحریریهٔ مشکله",
      role: "تیم محتوا",
      avatar: "/images/icon.png",
    },
    tags: ["مهمانی", "راهنمای خرید", "نوشیدنی"],
    content: [
      {
        type: "paragraph",
        text: "میزبان خوب کسی نیست که بیشترین نوشیدنی را بخرد؛ کسی است که برای هر سلیقه یک انتخاب داشته باشد. در مهمانی شبانه، نوشیدنی بخشی از حال‌وهوای جمع است و ترکیب درست آن می‌تواند شب را از یک دورهمی ساده به یک خاطره تبدیل کند.",
      },
      {
        type: "heading",
        level: 2,
        text: "اول مهمان‌ها را بشناسید",
        id: "guests",
      },
      {
        type: "paragraph",
        text: "قبل از خرید، فهرست کوتاهی از سلیقه‌ها بسازید: چه کسی طعم میوه‌ای دوست دارد، چه کسی کولای تیره می‌خواهد و چه کسی دنبال چیزی تازه و کم‌شیرین است. با همین فهرست کوچک، می‌توانید از خرید چندبارهٔ طعم‌های تکراری جلوگیری کنید.",
      },
      {
        type: "heading",
        level: 2,
        text: "ترکیب طعم‌ها را متعادل کنید",
        id: "mix",
      },
      {
        type: "list",
        items: [
          "یک سوم قوطی‌ها را به طعم‌های میوه‌ای اختصاص دهید تا میز رنگارنگ شود.",
          "یک سوم را کولای تیره بگذارید؛ انتخاب مطمئن بیشتر مهمان‌ها.",
          "یک یا دو قوطی از طعم‌های خاص و کم‌شیرین برای ذائقه‌های ماجراجو کنار بگذارید.",
          "همیشه دو قوطی بیشتر از تعداد مهمان‌ها در نظر بگیرید.",
        ],
      },
      {
        type: "quote",
        text: "میز نوشیدنی خوب، میزی است که هیچ‌کس مجبور نباشد بین دو طعم دلخواه یکی را انتخاب کند.",
        cite: "تحریریهٔ مشکله",
      },
      {
        type: "heading",
        level: 2,
        text: "سرو و دمای درست",
        id: "serve",
      },
      {
        type: "paragraph",
        text: "نوشیدنی گازدار را چند ساعت قبل در یخچال بگذارید، نه در فریزر. سرو در لیوان بلند با چند تکه یخ و یک برش لیمو، عطر نوشیدنی را باز می‌کند و ظاهر میز را هم کامل می‌کند.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "قوطی‌ها را حداقل چهار ساعت در دمای ۴ درجه خنک کنید.",
          "لیوان‌ها را قبل از سرو چند دقیقه در یخچال بگذارید.",
          "هنگام باز کردن قوطی، آن را کمی کج بگیرید تا کف نزند.",
        ],
      },
    ],
  },
  {
    id: "can-collecting",
    slug: "can-collecting",
    title: "چرا قوطی‌های طرح‌دار کلکسیونی می‌شوند؟",
    image: "/images/blog/can-collecting.jpg",
    date: "۱۲ آبان ۱۴۰۵",
    excerpt:
      "از قوطی‌های تبلیغاتی دههٔ گذشته تا طرح‌های هنری امروز؛ داستان کوتاهی دربارهٔ کلکسیون قوطی.",
    href: "/blog/can-collecting",
    category: "داستان‌ها",
    readingTimeMinutes: 7,
    author: {
      name: "تحریریهٔ مشکله",
      role: "تیم محتوا",
      avatar: "/images/icon.png",
    },
    tags: ["کلکسیون", "طراحی", "تاریخ"],
    content: [
      {
        type: "paragraph",
        text: "برای بسیاری از ما، قوطی نوشیدنی فقط یک بسته‌بندی نیست؛ یک تکه از حافظهٔ بصری روزگار است. رنگ، خط و نقش روی قوطی می‌تواند یک دهه را در خود خلاصه کند.",
      },
      {
        type: "heading",
        level: 2,
        text: "قوطی به‌عنوان بوم نقاشی",
        id: "canvas",
      },
      {
        type: "paragraph",
        text: "از زمانی که چاپ روی قوطی‌های آلومینیمی رایج شد، طراحان فهمیدند این سطح فلزی کوچک می‌تواند مثل یک بوم عمل کند. طرح‌های ایرانی با نقش‌های اسلیمی، ترنج و رنگ‌های لاجوردی و طلایی، دقیقاً همین کار را می‌کنند: یک اثر هنری که در دست گرفته می‌شود.",
      },
      {
        type: "heading",
        level: 2,
        text: "چرا بعضی طرح‌ها کمیاب می‌شوند؟",
        id: "rare",
      },
      {
        type: "list",
        items: [
          "تیراژ محدود: بعضی طرح‌ها فقط برای یک فصل یا یک رویداد تولید می‌شوند.",
          "تغییر بسته‌بندی: با هر بازطراحی، نسخهٔ قبلی از خط تولید خارج می‌شود.",
          "کیفیت نگهداری: قوطی‌های بدون خط‌وخش و رنگ‌پریدگی کمیاب‌ترند.",
        ],
      },
      {
        type: "quote",
        text: "یک قوطی خوب، هم نوشیدنی است و هم سندی از سلیقهٔ بصری زمانهٔ خودش.",
        cite: "تحریریهٔ مشکله",
      },
      {
        type: "heading",
        level: 2,
        text: "چطور یک کلکسیون را سالم نگه داریم؟",
        id: "keep",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "قوطی را خالی و کاملاً خشک کنید تا از زنگ‌زدگی جلوگیری شود.",
          "از قرار دادن آن در نور مستقیم آفتاب پرهیز کنید.",
          "قوطی‌ها را ایستاده و بدون فشار روی هم نگه دارید.",
          "بهترین نمونه‌ها را در قاب یا ویترین بسته نگه دارید.",
        ],
      },
      {
        type: "paragraph",
        text: "کلکسیون قوطی، در نهایت کلکسیون خاطره است؛ هر قوطی یادآور یک مهمانی، یک سفر یا یک عصر ساده است.",
      },
    ],
  },
  {
    id: "summer-flavors",
    slug: "summer-flavors",
    title: "پنج طعم خنک برای بعدازظهرهای تابستان",
    image: "/images/blog/summer-flavors.jpg",
    date: "۵ آبان ۱۴۰۵",
    excerpt:
      "لیمو، انار، نعنا و چند تکه یخ؛ پنج ترکیب ساده که گرمای بعدازظهر را قابل‌تحمل می‌کنند.",
    href: "/blog/summer-flavors",
    category: "طعم‌ها",
    readingTimeMinutes: 5,
    author: {
      name: "تحریریهٔ مشکله",
      role: "تیم محتوا",
      avatar: "/images/icon.png",
    },
    tags: ["تابستان", "لیمو", "انار", "نعنا"],
    content: [
      {
        type: "paragraph",
        text: "تابستان با همهٔ گرمایش، فصل طعم‌های روشن و خنک است. چند مادهٔ ساده کنار یک قوطی نوشیدنی گازدار می‌توانند یک نوشیدنی خانگی و متفاوت بسازند.",
      },
      {
        type: "heading",
        level: 2,
        text: "پنج ترکیب پیشنهادی",
        id: "five",
      },
      {
        type: "list",
        items: [
          "لیمو و نعنا: کلاسیک، خنک و همیشه جواب می‌دهد.",
          "انار و یخ خردشده: ترشی و شیرینی در یک لیوان.",
          "پرتقال و پوست‌نارنج: عطری گرم که در یخ فرو می‌رود.",
          "خیار و لیمو: سبک، بی‌شیرینی و مناسب هوای شرجی.",
          "توت‌فرنگی و ریحان: ترکیبی غیرمنتظره با پایانی تازه.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "قاعدهٔ طلایی سرو",
        id: "serve",
      },
      {
        type: "paragraph",
        text: "هرچه یخ کمتر و لیوان خنک‌تر باشد، گاز نوشیدنی بیشتر می‌ماند. میوه را له نکنید؛ فقط چند برش نازک روی یخ بگذارید تا عطرش آرام‌آرام آزاد شود.",
      },
      {
        type: "quote",
        text: "نوشیدنی تابستانی خوب، اول چشم را خنک می‌کند و بعد کام را.",
      },
      {
        type: "paragraph",
        text: "این ترکیب‌ها را با طعم‌های میوه‌ای مشکله امتحان کنید و نسخهٔ دلخواه خودتان را بسازید؛ قرار نیست همیشه به دستور دقیق پایبند باشید.",
      },
    ],
  },
];

/** "Why choose us" feature items. */
export const WHY_US_ITEMS: WhyUsItem[] = [
  {
    id: "shipping",
    image: "/images/why-us/shipping.png",
    title: "ارسال سریع",
    description: "سفارش تا ۲۴ ساعت",
    imageWidth: 256,
    imageHeight: 256,
  },
  {
    id: "authenticity",
    image: "/images/why-us/authenticity.png",
    title: "ضمانت اصالت",
    description: "مستقیم از کارخانه",
    imageWidth: 256,
    imageHeight: 256,
  },
  {
    id: "secure-payment",
    image: "/images/why-us/secure-payment.png",
    title: "پرداخت امن",
    description: "درگاه معتبر بانکی",
    imageWidth: 256,
    imageHeight: 256,
  },
  {
    id: "support",
    image: "/images/why-us/support.png",
    title: "پشتیبانی ۲۴/۷",
    description: "همیشه در دسترس",
    imageWidth: 256,
    imageHeight: 256,
  },
];

/** Footer link columns. Real internal routes are used where a matching page
 * exists (blog, login, register); the rest intentionally point to "#". */
export const FOOTER_LINKS: NavLink[] = [];

export const FOOTER_SERVICE_LINKS: NavLink[] = [];

/** Mobile bottom navigation bar. */
export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [];
