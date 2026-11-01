import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FestivalProductSlider } from "@/components/home/FestivalProductSlider";
import { SliderShowSection } from "@/components/home/SliderShowSection";
import { BlogSection } from "@/components/home/BlogSection";
import { WhyUs } from "@/components/home/WhyUs";
import {
  BLOG_POSTS,
  CATEGORY_ITEMS,
  FESTIVAL_PRODUCT_ROW,
  HERO_SLIDES,
  SLIDER_SHOW_ROWS,
  WHY_US_ITEMS,
} from "@/constants/data";

export default function HomePage() {
  return (
    <>
      <Header />

      <HeroSlider slides={HERO_SLIDES} />

      <CategoryGrid title="دسته بندی ها" items={CATEGORY_ITEMS} />

      <PromoBanner href="#" src="/images/placeholder.png" alt="" />

      <FestivalProductSlider row={FESTIVAL_PRODUCT_ROW} offerImage="/images/placeholder.png" />

      <SliderShowSection rows={SLIDER_SHOW_ROWS} />

      <PromoBanner href="#" src="/images/placeholder.png" alt="" />

      <BlogSection title="مطالب اخیر وبلاگ" posts={BLOG_POSTS} />

      <WhyUs items={WHY_US_ITEMS} />

      <Footer />

      <BottomNav />

      <BackToTopButton />
    </>
  );
}
