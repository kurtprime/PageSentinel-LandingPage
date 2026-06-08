import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { CalculatorPageClient } from "./client";
import { TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Downtime Cost Calculator — Calculate Your Revenue at Risk",
  description:
    "Calculate how much undetected website changes cost your business every year. See what PageSentinel saves you with automated change monitoring. Free tool, no signup required.",
  alternates: {
    canonical: "https://pagesentinel.io/calculator",
  },
  openGraph: {
    title: "Website Downtime Cost Calculator | PageSentinel",
    description:
      "How much are undetected website changes costing your business? Use our free calculator to find out what PageSentinel saves you every year.",
    type: "website",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Downtime Cost Calculator | PageSentinel",
    description:
      "Calculate how much undetected website changes cost your business every year.",
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PageSentinel Revenue Loss Calculator",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Free calculator that estimates how much undetected website changes and downtime cost your business — and how much PageSentinel saves you.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://pagesentinel.io",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Revenue Loss Calculator",
                },
              ],
            }),
          }}
        />

        <SectionHeader
          badge="Calculator"
          badgeIcon={TrendingDown}
          title="What are undetected changes costing you?"
          description="Slide the inputs to match your setup. See how much undetected changes cost every year — and what PageSentinel saves."
        />
        <Suspense fallback={null}>
          <CalculatorPageClient />
        </Suspense>
      </div>
    </div>
  );
}
