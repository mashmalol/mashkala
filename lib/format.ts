const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts ASCII digits (0-9) in a string to Persian digits (۰-۹). */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/**
 * Formats a Rial amount as a grouped, Persian-numeral price string, e.g.
 * `formatRial(5039000)` -> `"۵,۰۳۹,۰۰۰ ریال"`.
 */
export function formatRial(amount: number): string {
  const grouped = Math.round(amount).toLocaleString("en-US");
  return `${toPersianDigits(grouped)} ریال`;
}
