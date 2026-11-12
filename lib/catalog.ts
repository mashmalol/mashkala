import { PRODUCTS, SLIDER_SHOW_ROWS } from "@/constants/data";
import type { Product, ProductRow } from "@/types";

/** All catalogue rows, in the same order the homepage renders them. */
export const PRODUCT_ROWS: ProductRow[] = SLIDER_SHOW_ROWS;

/** Every product tagged as part of a catalogue collection (e.g. `"new"`). */
export function getCollection(collection: string): Product[] {
  return PRODUCTS.filter((product) => product.collection === collection);
}

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/**
 * Row used for breadcrumbs: the product's own homepage row, or — for
 * collection members that are not on a row — the collection's row.
 */
export function findProductRow(productId: string): ProductRow | undefined {
  const product = findProduct(productId);
  const row = SLIDER_SHOW_ROWS.find((item) =>
    item.products.some((entry) => entry.id === productId),
  );
  if (row) return row;
  if (product?.collection) {
    return SLIDER_SHOW_ROWS.find((item) => item.id === product.collection);
  }
  return undefined;
}

/**
 * Products for the `/products` grid. `cat` matches a row id (`fruit`,
 * `dark-cola`, …) or a collection id (`new`, which spans the whole art-can
 * wave rather than just the homepage's curated picks); unknown/absent values
 * fall back to the full catalogue.
 */
export function getCatalogue(cat?: string): Product[] {
  if (cat) {
    const collection = getCollection(cat);
    if (collection.length > 0) return collection;
    const row = SLIDER_SHOW_ROWS.find((item) => item.id === cat);
    if (row) return row.products;
  }
  return PRODUCTS;
}

export function getCatalogueTitle(cat?: string): string {
  if (cat) {
    const row = SLIDER_SHOW_ROWS.find((item) => item.id === cat);
    if (row) return row.title;
  }
  return "همهٔ محصولات";
}

/** Same-collection/same-row siblings first, then the rest of the catalogue. */
export function getRelatedProducts(productId: string, limit = 8): Product[] {
  const product = findProduct(productId);
  const row = findProductRow(productId);
  const pool = [
    ...(product?.collection ? getCollection(product.collection) : []),
    ...(row?.products ?? []),
    ...PRODUCTS,
  ];
  const seen = new Set<string>();
  const related: Product[] = [];
  for (const entry of pool) {
    if (entry.id === productId || seen.has(entry.id)) continue;
    seen.add(entry.id);
    related.push(entry);
    if (related.length >= limit) break;
  }
  return related;
}
