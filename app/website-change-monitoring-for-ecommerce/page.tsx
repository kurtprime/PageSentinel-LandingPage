import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Check, ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Change Monitoring for Ecommerce — Protect Checkout & Pricing Pages",
  description:
    "Every hour a broken checkout or incorrect price goes undetected is lost revenue. Monitor your ecommerce pages for layout breaks, pricing changes, and form errors — automatically.",
  alternates: {
    canonical: "https://pagesentinel.io/website-change-monitoring-for-ecommerce",
  },
  openGraph: {
    title: "Website Change Monitoring for Ecommerce Sites | PageSentinel",
    description:
      "Every hour a broken checkout or incorrect price goes undetected is lost revenue. Monitor your ecommerce pages for layout breaks, pricing changes, and form errors.",
    type: "article",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Change Monitoring for Ecommerce | PageSentinel",
    description:
      "Every hour a broken checkout or incorrect price goes undetected is lost revenue. Monitor your pages automatically.",
  },
};

const costs = [
  {
    title: "Broken checkout = lost revenue, forever",
    description:
      "If your Add to Cart button breaks, your checkout form stops submitting, or your payment gateway integration silently fails — every visitor who tries to buy leaves empty-handed. You lose the sale, the ad spend, and potentially the customer. PageSentinel checks your checkout flow around the clock and alerts you the moment something breaks.",
  },
  {
    title: "Pricing changes that drain your margins",
    description:
      "A pricing table that accidentally shows $19 instead of $29 costs you $10 per sale until someone notices. During a promotion or flash sale, a broken discount code can wipe out margins across thousands of orders. PageSentinel detects text and number changes on your pricing pages and alerts you before the revenue leak compounds.",
  },
  {
    title: "Product page modifications during peak season",
    description:
      "During Black Friday, Cyber Monday, or a product launch, your team is making rapid updates — prices, inventory, descriptions. One wrong edit can cascade. PageSentinel captures every change with a timestamped audit trail, so you can verify every edit was intentional and roll back if it wasn't.",
  },
  {
    title: "Plugin updates that break your store",
    description:
      "Shopify apps, WooCommerce plugins, and payment gateway integrations update automatically. One bad update can hide your cart, break your search, or corrupt your product data. Uptime monitoring says your site is 'up.' PageSentinel says your Add to Cart button disappeared.",
  },
];

const faqs = [
  {
    question: "Can PageSentinel monitor Shopify stores?",
    answer:
      "Yes. PageSentinel monitors any public URL — Shopify storefronts, product pages, checkout flows, and landing pages. There's nothing to install. No app to add. We monitor from the outside, which means we see exactly what your customers see.",
  },
  {
    question: "How often should I scan my checkout and pricing pages?",
    answer:
      "For high-revenue pages like checkout, cart, and pricing, we recommend every 15-30 minutes. For product pages and category pages, hourly or daily scanning is usually sufficient. PageSentinel lets you set different frequencies per URL so critical pages get tighter coverage without wasting credits on lower-priority ones.",
  },
  {
    question: "What's the ROI of ecommerce website change monitoring?",
    answer:
      "Consider this: if your checkout processes 100 orders per day at an average order value of $75, one hour of undetected downtime costs $312.50 in lost revenue. If a pricing error goes undetected for a full day, the cost compounds. A PageSentinel plan starts at $29/month — it pays for itself after catching one incident.",
  },
];

export default function EcommercePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Website Change Monitoring for Ecommerce — Protect Checkout & Pricing Pages",
              description:
                "Every hour a broken checkout or incorrect price goes undetected is lost revenue. Monitor your ecommerce pages for layout breaks, pricing changes, and form errors.",
              datePublished: "2026-06-01",
              author: { "@type": "Organization", name: "PageSentinel" },
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://pagesentinel.io" },
                { "@type": "ListItem", position: 2, name: "Website Change Monitoring for Ecommerce" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />

        <Badge variant="secondary" className="mb-4 gap-1.5 px-3 py-1 text-sm font-medium">
          <ShoppingCart className="h-3.5 w-3.5 text-emerald-600" />
          Ecommerce
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Website change monitoring for ecommerce — protect every dollar on every page
        </h1>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
          <p className="text-base leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
            Every hour your checkout, pricing, or product page is broken is revenue you never
            get back. PageSentinel monitors your ecommerce pages around the clock, detects
            changes the moment they happen, and alerts you with a visual diff — so you fix
            issues before they cost you sales. No plugins. No app installs. Just continuous
            monitoring from the outside.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {costs.map((cost) => (
            <div key={cost.title} className="rounded-xl border border-border/60 bg-muted/20 p-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold text-foreground">{cost.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cost.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-8 text-center">
          <h2 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
            Stop losing revenue to undetected page changes
          </h2>
          <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">
            7-day free trial. Monitor up to 20 pages. No credit card required.
          </p>
          <div className="mt-6">
            <Link href="/pricing">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
