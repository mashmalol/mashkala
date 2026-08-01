import Image from "next/image";
import type { WhyUsItem } from "@/types";

export interface WhyUsProps {
  items: WhyUsItem[];
}

export function WhyUs({ items }: WhyUsProps) {
  return (
    <div className="why-us">
      <div className="why-us-items">
        {items.map((item) => (
          <div className="why-us-item" key={item.id}>
            <Image src={item.image} alt="" width={item.imageWidth} height={item.imageHeight} />
            <span>{item.title}</span>
            {item.description ? <p>{item.description}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
