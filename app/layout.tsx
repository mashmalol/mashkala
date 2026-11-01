import type { Metadata } from "next";
import { CartProvider } from "@/contexts/CartContext";
import { BrowserFrame } from "@/components/chrome/BrowserFrame";
import { SITE_NAME, SITE_URL } from "@/constants/data";
import "./globals.css";
import "./chrome.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  icons: {
    icon: "/chrome/throbber-a.svg",
    shortcut: "/chrome/throbber-a.svg",
    apple: "/images/placeholder.png",
  },
  openGraph: {
    title: SITE_NAME,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/images/placeholder.png" }],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    images: ["/images/placeholder.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* App Router renders this link on every page, so the
            `no-page-custom-font` warning (aimed at `pages/_document`) does not apply. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0&display=swap"
        />
      </head>
      <body>
        <BrowserFrame>
          <CartProvider>{children}</CartProvider>
        </BrowserFrame>
      </body>
    </html>
  );
}
