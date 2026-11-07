"use client";

import { useState, useSyncExternalStore } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface ShareButtonsProps {
  title: string;
  /** Canonical, absolute URL of the article. Passed in from the server so
   * the share links are identical during SSR and hydration. */
  url: string;
}

/** `navigator.share` only exists in the browser, so read it as a client-only
 * value that is `false` on the server to keep hydration markup in sync. */
const subscribeToNothing = () => () => {};
const getCanNativeShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";
const getCanNativeShareOnServer = () => false;

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribeToNothing,
    getCanNativeShare,
    getCanNativeShareOnServer,
  );

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Cancelled by the user — nothing to do.
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Clipboard access denied — silently ignore, the link is still visible in the address bar.
    }
  };

  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  return (
    <div className="share-buttons">
      <span className="share-buttons-label">اشتراک‌گذاری:</span>
      <a href={telegramHref} target="_blank" rel="noopener noreferrer" aria-label="اشتراک در تلگرام" className="share-btn">
        <MaterialIcon name="send" />
      </a>
      <a href={twitterHref} target="_blank" rel="noopener noreferrer" aria-label="اشتراک در ایکس" className="share-btn">
        <MaterialIcon name="alternate_email" />
      </a>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="اشتراک در واتساپ" className="share-btn">
        <MaterialIcon name="chat" />
      </a>
      <button type="button" className="share-btn" onClick={handleCopyLink} aria-label="کپی لینک">
        <MaterialIcon name={isCopied ? "check" : "link"} />
      </button>
      {canNativeShare ? (
        <button
          type="button"
          className="share-btn share-btn--native"
          onClick={handleNativeShare}
          aria-label="اشتراک‌گذاری"
        >
          <MaterialIcon name="ios_share" />
        </button>
      ) : null}
    </div>
  );
}
