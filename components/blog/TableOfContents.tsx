import type { BlogContentBlock } from "@/types";

export interface TableOfContentsProps {
  content: BlogContentBlock[];
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = content.filter(
    (block): block is Extract<BlogContentBlock, { type: "heading" }> => block.type === "heading",
  );

  if (headings.length === 0) return null;

  return (
    <nav className="table-of-contents" aria-label="فهرست مطالب">
      <h2>فهرست مطالب</h2>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-level-${heading.level}`}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
