export interface MaterialIconProps {
  /** The Material Symbols ligature name, e.g. "search", "shopping_cart". */
  name: string;
  className?: string;
}

/**
 * Renders a single Material Symbols (Outlined) icon. The font itself is
 * loaded once, globally, via the stylesheet `<link>` in the root layout.
 */
export function MaterialIcon({ name, className }: MaterialIconProps) {
  const classes = ["material-symbols-outlined", className].filter(Boolean).join(" ");
  return <span className={classes}>{name}</span>;
}
