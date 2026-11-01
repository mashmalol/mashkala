/**
 * Cart store backed by `localStorage`.
 *
 * Implemented as an external store so it can be read with
 * `useSyncExternalStore`: the server snapshot is an empty cart, and the
 * persisted cart is hydrated on the client right after the first subscriber
 * mounts. This keeps server and client markup identical without calling
 * `setState` from an effect.
 */

import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "mashkala:cart";

export interface CartSnapshot {
  items: CartItem[];
  /** True until the persisted cart has been read once on the client. */
  isLoading: boolean;
}

/** Stable snapshot rendered on the server (and during hydration). */
const SERVER_SNAPSHOT: CartSnapshot = { items: [], isLoading: true };

let items: CartItem[] = [];
let hydrated = false;
let snapshot: CartSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private mode / quota) — keep in-memory state.
  }
}

function publish() {
  snapshot = { items, isLoading: !hydrated };
  for (const listener of listeners) listener();
}

/** Read the persisted cart once, on the first client-side subscription. */
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  items = readStoredCart();
  hydrated = true;
  publish();
}

function update(next: CartItem[]) {
  items = next;
  if (typeof window !== "undefined") persist();
  publish();
}

export const cartStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    hydrate();
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot(): CartSnapshot {
    return snapshot;
  },

  getServerSnapshot(): CartSnapshot {
    return SERVER_SNAPSHOT;
  },

  addItem(product: Product, quantity = 1) {
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      update(
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      );
      return;
    }
    update([
      ...items,
      {
        id: product.id,
        title: product.title,
        image: product.image,
        imageWidth: product.imageWidth,
        imageHeight: product.imageHeight,
        option: product.option,
        price: product.price,
        quantity,
      },
    ]);
  },

  removeItem(id: string) {
    update(items.filter((item) => item.id !== id));
  },

  updateQuantity(id: string, quantity: number) {
    update(
      quantity <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  },

  clearCart() {
    update([]);
  },
};
