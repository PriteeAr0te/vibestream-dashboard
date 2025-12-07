import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Slide, ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import SessionProviderWrapper from "@/components/provider/SessionProviderWrapper";
import QueryProvider from "@/components/provider/QueryProvider";

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
    icon: "./favicon.png",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          const theme = localStorage.getItem('theme') || 'dark';
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
          }}
        />
      </head>
      <body className="h-screen overflow-hidden bg-background text-foreground font-sans">
        <SessionProviderWrapper>
          <ThemeProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </ThemeProvider>
        </SessionProviderWrapper>

        <ToastContainer
          position="top-right"
          transition={Slide}
          className="z-50"
          autoClose={3000}
          pauseOnHover
        />
      </body>

    </html>
  );
}
