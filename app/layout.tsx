import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VibeStream — Music Streaming Dashboard",
  description:
    "A modern music streaming dashboard built with Next.js, TypeScript, TanStack Query, Redux Toolkit, and NextAuth.",
  keywords: [
    "Music Dashboard",
    "Next.js App Router",
    "Music Player",
    "TanStack Query",
    "Redux Toolkit",
    "NextAuth",
    "Streaming App",
  ],
  authors: [{ name: "Pritee" }],
  creator: "Pritee",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "VibeStream — Music Streaming Dashboard",
    description:
      "A clean and modern next-generation music dashboard built with Next.js.",
    url: "http://localhost:3000",
    siteName: "VibeStream",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
