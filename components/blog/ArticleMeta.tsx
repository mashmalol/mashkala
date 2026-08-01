import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { BlogAuthor } from "@/types";

export interface ArticleMetaProps {
  author: BlogAuthor;
  date: string;
  readingTimeMinutes: number;
  category: string;
}

export function ArticleMeta({ author, date, readingTimeMinutes, category }: ArticleMetaProps) {
  return (
    <div className="article-meta">
      <div className="article-meta-author">
        <Image src={author.avatar} alt="" width={44} height={44} />
        <div>
          <span className="article-meta-author-name">{author.name}</span>
          <span className="article-meta-author-role">{author.role}</span>
        </div>
      </div>
      <div className="article-meta-details">
        <span>
          <MaterialIcon name="calendar_month" />
          {date}
        </span>
        <span>
          <MaterialIcon name="schedule" />
          {readingTimeMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
        </span>
        <span className="article-meta-category">
          <MaterialIcon name="sell" />
          {category}
        </span>
      </div>
    </div>
  );
}
