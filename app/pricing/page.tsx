import type { Metadata } from "next";
import { PricingCards } from "./pricing-cards";
import { PricingFAQ } from "./pricing-faq";
import { RiskReversal } from "./risk-reversal";
import { SectionHeader } from "@/components/shared/section-header";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Website Change Monitoring Plans from $29/mo",
  description:
    "Simple scan-credit pricing for website change monitoring. Starter at $29/mo, Pro at $59/mo, Business at $129/mo, Agency at $249/mo. All plans include a 7-day free trial. No credit card required.",
  alternates: {
    canonical: "https://pagesentinel.io/pricing",
  },
  openGraph: {
    title: "Website Change Monitoring Pricing | PageSentinel",
    description:
      "Simple scan-credit pricing for website change monitoring. Starter at $29/mo, Pro at $59/mo, Business at $129/mo, Agency at $249/mo. 7-day free trial on every plan.",
    type: "website",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Change Monitoring Pricing | PageSentinel",
    description:
      "Simple scan-credit pricing for website change monitoring. Starter at $29/mo, Pro at $59/mo, Business at $129/mo, Agency at $249/mo.",
  },
};

const plans = [
  {
    name: "Starter",
    price: "29.00",
    description:
      "For freelancers and small teams getting started with website change monitoring.",
    scans: "10,000 scans/month",
    features: [
      "Visual, content, and structural change detection",
      "Email alerts",
      "Audit trail with change history",
      "Baseline + before/after evidence",
      "Noise reduction to cut false alarms",
    ],
  },
  {
    name: "Pro",
    price: "59.00",
    description: "For growing teams that need faster detection and more scan coverage.",
    scans: "50,000 scans/month",
    features: [
      "Everything in Starter, plus:",
      "Slack and webhook alerts",
      "Faster scan cadences (hourly)",
      "60-day change history retention",
      "Priority email support",
    ],
  },
  {
    name: "Business",
    price: "129.00",
    description: "For agencies and teams managing multiple client sites or high-value pages.",
    scans: "200,000 scans/month",
    features: [
      "Everything in Pro, plus:",
      "SMS alerts",
      "120-day change history retention",
      "AI review for significant changes",
      "Custom frequency per URL",
    ],
  },
  {
    name: "Agency",
    price: "249.00",
    description:
      "For large agencies and enterprises that need maximum coverage and white-label options.",
    scans: "500,000 scans/month",
    features: [
      "Everything in Business, plus:",
      "180-day change history retention",
      "White-label reporting (coming soon)",
      "API access for custom integrations",
      "Dedicated account manager",
      "SSO and team management",
    ],
  },
];

const offerSchema = plans.map((plan) => ({
  "@type": "Offer" as const,
  name: `PageSentinel ${plan.name}`,
  description: plan.description,
  price: plan.price,
  priceCurrency: "USD",
  category: "Website Change Monitoring",
  eligibleRegion: "Worldwide",
}));

const faqs = [
  {
    question: "What is website change monitoring?",
    answer:
      "Website change monitoring tracks what actually changes on your pages — visual shifts, text edits, new links, removed sections — not just whether the server is responding. Think of it as the difference between knowing your site is 'up' and knowing exactly what looks different from yesterday.",
  },
  {
    question: "How is this different from uptime monitoring?",
    answer:
      "Uptime monitoring checks one thing: is the server responding? Your site can be 'up' but broken — layout shifted, checkout form missing, prices changed, redirect injected. Uptime tools miss all of these. Website change monitoring catches the problems that actually affect your visitors and your revenue.",
  },
  {
    question: "What are scan credits and how do they work?",
    answer:
      "Each time a monitored URL is checked, it uses one scan credit. If you monitor 10 pages once daily, that's roughly 300 scans per month. Credits are pooled across all your URLs and reset each billing cycle.",
  },
  {
    question: "Can I set different frequencies for different pages?",
    answer:
      "Yes. You might scan your homepage every 15 minutes, your pricing page hourly, and your blog daily — all managed from the same dashboard. Set a default frequency, then override individual URLs that need more or less frequent checks.",
  },
  {
    question: "Can PageSentinel detect visual website changes like broken layouts?",
    answer:
      "Yes — it's one of the core features. Full-page screenshots are compared pixel-by-pixel to catch layout breaks, hidden sections, CSS regressions, and design shifts. Built-in noise reduction filters out benign differences like font smoothing variations.",
  },
  {
    question: "Can PageSentinel detect defacement or malicious redirects?",
    answer:
      "Yes. Defacement, injected links, redirect hacks, and unauthorized script tags are all detectable. When something that looks like tampering appears — new outbound links, unexpected redirect rules — you're alerted immediately with details on what was added or modified.",
  },
  {
    question: "Can I monitor competitor websites for changes?",
    answer:
      "PageSentinel monitors any publicly accessible URL, including competitor pages. Track pricing changes, messaging updates, new feature launches, or policy revisions across any website. Terms of service require respecting robots.txt and applicable laws.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* Structured Data — SoftwareApplication with multiple Offers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PageSentinel",
              applicationCategory: "WebApplication",
              operatingSystem: "Web",
              description:
                "Website change monitoring that detects visual, structural, and content changes across web pages.",
              offers: offerSchema,
            }),
          }}
        />

        {/* FAQPage Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* BreadcrumbList Structured Data */}
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
                  name: "Pricing",
                },
              ],
            }),
          }}
        />

        <SectionHeader
          badge="Pricing"
          badgeIcon={CreditCard}
          title="Simple scan-credit pricing"
          description="All plans include a 7-day free trial. Upgrade or cancel anytime. No credit card required."
        />
        <PricingCards />
        <RiskReversal />
        <PricingFAQ />
      </div>
    </div>
  );
}
