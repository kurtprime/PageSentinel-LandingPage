import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pagesentinel.io"),
  title: {
    default: "PageSentinel — Website Change Monitoring for Agencies, Site Owners, and Teams",
    template: "%s | PageSentinel",
  },
  description:
    "PageSentinel is a website change monitoring tool that detects visual, structural, and content changes across the pages you care about. Catch website defacement, broken layouts, policy updates, pricing changes, and silent redirects with fewer false positives and a clear audit trail.",
  keywords: [
    "website change monitoring",
    "website change detection",
    "visual website monitoring",
    "website content monitoring",
    "page change detection",
    "website defacement detection",
    "structural change detection",
    "website audit trail",
    "site monitoring",
    "change alerts",
  ],
  authors: [{ name: "PageSentinel" }],
  icons: {
    icon: [
      { url: "/assets/favicon_io/favicon.ico", sizes: "48x48" },
      { url: "/assets/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/assets/favicon_io/favicon.ico",
    apple: "/assets/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/assets/favicon_io/site.webmanifest",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PageSentinel — Website Change Monitoring for Agencies, Site Owners, and Teams",
    description:
      "Detect visual, structural, and content changes across the pages you care about. Catch website defacement, broken layouts, and policy changes before your customers do.",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageSentinel — Website Change Monitoring",
    description:
      "Detect visual, structural, and content changes across the pages you care about. Catch website defacement, broken layouts, and policy changes before your customers do.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PageSentinel",
              url: "https://pagesentinel.io",
              logo: "https://pagesentinel.io/assets/icon.svg",
              description: "Website change monitoring that detects visual, structural, and content changes across web pages. Catch defacement, broken layouts, and policy changes with fewer false positives and a clear audit trail.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PageSentinel",
              url: "https://pagesentinel.io",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pagesentinel.io/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PageSentinel",
              applicationCategory: "WebApplication",
              operatingSystem: "Web",
              description: "Website change monitoring that detects visual, structural, and content changes. Catch defacement, broken layouts, and policy changes with fewer false positives and a clear audit trail.",
              offers: {
                "@type": "Offer",
                price: "29.00",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
