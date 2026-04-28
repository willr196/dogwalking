import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fff8e8",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://willswalks.co.uk"),
  title: {
    default: "Will's Walks | Dog Walking in Fulham and SW6",
    template: "%s | Will's Walks",
  },
  description:
    "Happy, safety-first dog walking in Fulham and SW6. Solo and tiny group walks, max three dogs, photo updates, and a required meet and greet.",
  keywords: [
    "dog walking Fulham",
    "dog walking SW6",
    "dog walker SW6",
    "Fulham dog walker",
    "solo dog walks",
    "small group dog walks",
  ],
  authors: [{ name: "Will's Walks" }],
  creator: "Will's Walks",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://willswalks.co.uk",
    siteName: "Will's Walks",
    title: "Will's Walks | Dog Walking in Fulham and SW6",
    description: "Solo and tiny group dog walks in Fulham with clear updates, safety-first handling, and max three dogs.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Will's Walks in Fulham, SW6" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will's Walks | Dog Walking in Fulham and SW6",
    description: "Happy solo and tiny group dog walks in SW6 with max three dogs and clear updates.",
    images: ["/og-image.svg"],
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
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
