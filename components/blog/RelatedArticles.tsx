import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

export interface RelatedArticlesProps {
  posts: BlogPost[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="related-articles">
      <h2>مطالب مرتبط</h2>
      <div className="related-articles-grid">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="related-article-card">
            <div className="related-article-card-pic">
              <Image src={post.image} alt="" width={300} height={142} />
            </div>
            <div className="related-article-card-content">
              <span className="related-article-card-category">{post.category}</span>
              <p>{post.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
