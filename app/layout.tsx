import type { Metadata } from "next";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const SITE_URL = "https://amirkabir-kala.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "امیر کبیر کالا",
  description:
    "فروشگاه اینترنتی امیرکبیر کالا - فروش محصولات گروه آروا، ایران پتک و رونیکس با تخفیف ویژه",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "امیر کبیر کالا",
    description:
      "فروشگاه اینترنتی امیرکبیر کالا - فروش محصولات گروه آروا، ایران پتک و رونیکس با تخفیف ویژه",
    url: SITE_URL,
    siteName: "امیر کبیر کالا",
    images: [{ url: "/images/logo.png" }],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "امیر کبیر کالا",
    description:
      "فروشگاه اینترنتی امیرکبیر کالا - فروش محصولات گروه آروا، ایران پتک و رونیکس با تخفیف ویژه",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0"
        />
      </head>
      <body>
        <div className="main">
          <CartProvider>{children}</CartProvider>
        </div>
      </body>
    </html>
  );
}
