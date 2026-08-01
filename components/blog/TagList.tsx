export interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="article-tags" aria-label="برچسب‌ها">
      {tags.map((tag) => (
        <li key={tag}>
          <a href="#">#{tag}</a>
        </li>
      ))}
    </ul>
  );
}
