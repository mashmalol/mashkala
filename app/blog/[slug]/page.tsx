import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { TagList } from "@/components/blog/TagList";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { CommentSection } from "@/components/blog/CommentSection";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { BLOG_POSTS } from "@/constants/data";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

function findPostIndex(slug: string) {
  return BLOG_POSTS.findIndex((post) => post.slug === slug);
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const index = findPostIndex(slug);
  if (index === -1) return {};

  const post = BLOG_POSTS[index]!;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const index = findPostIndex(slug);
  if (index === -1) notFound();

  const post = BLOG_POSTS[index]!;
  const previous = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1]! : null;
  const next = index > 0 ? BLOG_POSTS[index - 1]! : null;
  const related = BLOG_POSTS.filter((_, i) => i !== index).slice(0, 3);

  return (
    <>
      <Header />

      <main className="blog-detail-page">
        <nav aria-label="مسیر صفحه" className="breadcrumb blog-detail-breadcrumb">
          <Link href="/">صفحه اصلی</Link>
          <span>/</span>
          <Link href="/blog">وبلاگ</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        <div className="blog-detail-hero">
          <Image src={post.image} alt={post.title} fill sizes="100vw" priority style={{ objectFit: "cover" }} />
        </div>

        <h1 className="blog-detail-title">{post.title}</h1>

        <ArticleMeta
          author={post.author}
          date={post.date}
          readingTimeMinutes={post.readingTimeMinutes}
          category={post.category}
        />

        <div className="blog-detail-layout">
          <aside className="blog-detail-sidebar">
            <TableOfContents content={post.content} />
          </aside>

          <div className="blog-detail-body">
            <ArticleContent content={post.content} />
            <TagList tags={post.tags} />
            <ShareButtons title={post.title} />
          </div>
        </div>

        <PrevNextNav previous={previous} next={next} />

        <RelatedArticles posts={related} />

        <CommentSection articleId={post.id} />

        <section className="blog-detail-newsletter">
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
