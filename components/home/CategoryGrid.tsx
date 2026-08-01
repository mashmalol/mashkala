import Image from "next/image";
import type { CategoryItem } from "@/types";

export interface CategoryGridProps {
  title: string;
  items: CategoryItem[];
}

export function CategoryGrid({ title, items }: CategoryGridProps) {
  return (
    <div className="category">
      <div className="category-text">
        <h3>{title}</h3>
      </div>
      <div className="category-items">
        {items.map((item) => (
          <a href={item.href} className="category-item" key={item.id}>
            <div className="category-item-pic">
              <Image src={item.image} alt={item.title} width={item.width} height={item.height} />
            </div>
            <p>{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
