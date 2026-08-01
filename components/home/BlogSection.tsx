"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import type { BlogPost } from "@/types";

const SCROLL_STEP = 300;

export interface BlogSectionProps {
  title: string;
  posts: BlogPost[];
}

export function BlogSection({ title, posts }: BlogSectionProps) {
  const { ref, scrollBy } = useHorizontalScroll<HTMLDivElement>();

  return (
    <section>
      <div className="blog-wrapper">
        <div className="blog-header">
          <h3>{title}</h3>
          <div className="blog-header-btns">
            <button type="button" onClick={() => scrollBy(SCROLL_STEP)} aria-label="مطالب قبلی">
              <MaterialIcon name="chevron_right" />
            </button>
            <button type="button" onClick={() => scrollBy(-SCROLL_STEP)} aria-label="مطالب بعدی">
              <MaterialIcon name="chevron_left" />
            </button>
          </div>
        </div>
        <div className="blogs" ref={ref}>
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              <Link href={post.href} className="blog-card-pic">
                {/* eslint-disable-next-line @next/next/no-img-element -- fluid width, natural aspect ratio, matches original exactly */}
                <img src={post.image} alt="" />
              </Link>
              <div className="blog-card-content">
                <div className="blog-title">
                  <Link href={post.href}> {post.title} </Link>
                </div>
                <div className="blog-details">
                  <span className="blog-date">{post.date}</span>
                  <p className="blog-description">{post.excerpt}</p>
                  <Link href={post.href}>ادامه مطلب</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
