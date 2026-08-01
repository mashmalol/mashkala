"use client";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useScrollPastThreshold } from "@/hooks/useScrollPastThreshold";

const FADE_THRESHOLD = 500;

export function BackToTopButton() {
  const isPastThreshold = useScrollPastThreshold(FADE_THRESHOLD);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`up-btn ${isPastThreshold ? "show" : "fade"}`}
      onClick={handleClick}
    >
      بازگشت به بالا
      <MaterialIcon name="expand_less" />
    </button>
  );
}
