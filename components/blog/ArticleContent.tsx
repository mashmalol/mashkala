import Image from "next/image";
import type { BlogContentBlock } from "@/types";

export interface ArticleContentProps {
  content: BlogContentBlock[];
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="article-content">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;

          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag key={index} id={block.id} className="article-heading">
                {block.text}
              </Tag>
            );
          }

          case "image":
            return (
              <figure key={index} className="article-image">
                <Image src={block.src} alt={block.alt} width={block.width} height={block.height} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );

          case "quote":
            return (
              <blockquote key={index} className="article-quote">
                <p>{block.text}</p>
                {block.cite ? <cite>{block.cite}</cite> : null}
              </blockquote>
            );

          case "code":
            return (
              <pre key={index} className="article-code">
                <code>{block.code}</code>
              </pre>
            );

          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={index} className="article-list">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ListTag>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
