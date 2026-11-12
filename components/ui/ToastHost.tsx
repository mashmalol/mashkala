"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { toastStore } from "@/lib/toast-store";

/**
 * Mounts once in the root layout and renders whatever toast is currently in
 * the store. Kept deliberately small: one message, one optional action link.
 */
export function ToastHost() {
  const toast = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot,
  );

  if (!toast) return null;

  return (
    <div className="site-toast" role="status" aria-live="polite">
      <span className="site-toast-icon">
        <MaterialIcon name="check_circle" />
      </span>
      <div className="site-toast-text">
        <strong>{toast.title}</strong>
        {toast.message ? <span>{toast.message}</span> : null}
      </div>
      {toast.href && toast.actionLabel ? (
        <Link href={toast.href} className="site-toast-action" onClick={toastStore.dismiss}>
          {toast.actionLabel}
        </Link>
      ) : null}
      <button
        type="button"
        className="site-toast-close"
        aria-label="بستن پیام"
        onClick={toastStore.dismiss}
      >
        <MaterialIcon name="close" />
      </button>
    </div>
  );
}
