import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://willswalks.co.uk"),
  title: {
    default: "Will's Walks — Solo Dog Walking in Fulham, SW6",
    template: "%s | Will's Walks",
  },
  description:
    "Dedicated one-on-one dog walks in Fulham, London. Your dog gets undivided attention and adventure. Book online today — from £18 per walk.",
  keywords: [
    "dog walking Fulham",
    "solo dog walks",
    "dog walker SW6",
    "Fulham dog walker",
    "one-on-one dog walking London",
    "professional dog walker Fulham",
  ],
  authors: [{ name: "Will's Walks" }],
  creator: "Will's Walks",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://willswalks.co.uk",
    siteName: "Will's Walks",
    title: "Will's Walks — Solo Dog Walking in Fulham, SW6",
    description:
      "Dedicated one-on-one dog walks in Fulham, London. Your dog gets undivided attention and adventure.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Will's Walks — Happy dogs, happy walks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will's Walks — Solo Dog Walking in Fulham",
    description: "One-on-one dog walks in Fulham. Book online from £18.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://willswalks.co.uk" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-[var(--cream)] text-[var(--text)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
