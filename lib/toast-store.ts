/**
 * Tiny global toast store, modelled on the cart store: a module-level value
 * with a subscription API so any client component can raise the same toast
 * without prop-drilling through the page tree.
 */

export interface ToastPayload {
  id: number;
  title: string;
  message?: string;
  /** Optional destination for the toast's action button. */
  href?: string;
  actionLabel?: string;
}

type ToastInput = Omit<ToastPayload, "id">;
type Listener = () => void;

const AUTO_DISMISS_MS = 3600;

let current: ToastPayload | null = null;
let sequence = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<Listener>();

const emit = () => {
  for (const listener of listeners) listener();
};

const clearTimer = () => {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
};

export const toastStore = {
  show(input: ToastInput) {
    current = { ...input, id: ++sequence };
    emit();
    clearTimer();
    timer = setTimeout(() => {
      current = null;
      emit();
    }, AUTO_DISMISS_MS);
  },

  dismiss() {
    if (!current) return;
    current = null;
    clearTimer();
    emit();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot: () => current,

  /** Toasts never exist during server rendering. */
  getServerSnapshot: (): ToastPayload | null => null,
};
