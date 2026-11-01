import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { BLOG_POSTS } from "@/constants/data";

export const metadata: Metadata = {
  title: "وبلاگ",
};

export default function BlogListPage() {
  return (
    <>
      <Header />

      <main className="blog-list-page">
        <div className="blog-list-header">
          <h1>وبلاگ</h1>
        </div>

        <div className="blog-list-grid">
          {BLOG_POSTS.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="blog-list-card">
              <div className="blog-list-card-pic">
                <Image src={post.image} alt="" width={300} height={142} />
              </div>
              <div className="blog-list-card-content">
                <span className="blog-list-card-category">{post.category}</span>
                <p className="blog-list-card-title">{post.title}</p>
                <p className="blog-list-card-excerpt">{post.excerpt}</p>
                <div className="blog-list-card-meta">
                  <span>{post.date}</span>
                  <span>{post.readingTimeMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="blog-list-newsletter">
          <h2>در خبرنامه ما عضو شوید</h2>
          <p>از جدیدترین مقالات و راهنماهای خرید باخبر شوید.</p>
          <NewsletterForm variant="inline" />
        </section>
      </main>

      <Footer />
      <BottomNav />
      <BackToTopButton />
    </>
  );
}
