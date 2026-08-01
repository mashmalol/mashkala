import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { BlogPost } from "@/types";

export interface PrevNextNavProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export function PrevNextNav({ previous, next }: PrevNextNavProps) {
  if (!previous && !next) return null;

  return (
    <nav className="prev-next-nav" aria-label="ناوبری مقالات">
      {next ? (
        <Link href={`/blog/${next.slug}`} className="prev-next-nav-item prev-next-nav-item--next">
          <span className="prev-next-nav-label">
            <MaterialIcon name="chevron_right" />
            مقاله بعدی
          </span>
          <span className="prev-next-nav-title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {previous ? (
        <Link href={`/blog/${previous.slug}`} className="prev-next-nav-item prev-next-nav-item--prev">
          <span className="prev-next-nav-label">
            مقاله قبلی
            <MaterialIcon name="chevron_left" />
          </span>
          <span className="prev-next-nav-title">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
