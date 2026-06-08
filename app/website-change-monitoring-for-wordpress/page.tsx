import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Change Monitoring for WordPress — Detect Plugin Update Damage",
  description:
    "WordPress sites break when plugins update. Catch broken layouts, missing content, and redirect injections before your visitors or clients notice. No plugin installs needed.",
  alternates: {
    canonical: "https://pagesentinel.io/website-change-monitoring-for-wordpress",
  },
  openGraph: {
    title: "Website Change Monitoring for WordPress Sites | PageSentinel",
    description:
      "WordPress sites break when plugins update. Catch broken layouts, missing content, and redirect injections before your visitors or clients notice.",
    type: "article",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Change Monitoring for WordPress | PageSentinel",
    description:
      "WordPress sites break when plugins update. Catch broken layouts before your visitors do.",
  },
};

const pains = [
  {
    title: "Auto-updating plugins that quietly break your site",
    description:
      "WordPress plugins auto-update by default. One bad update from Elementor, WooCommerce, or a page builder can break layouts across your entire site — headers shift, CTAs disappear, checkout forms stop working. You won't know until a customer tells you. PageSentinel catches every layout change the moment it happens.",
  },
  {
    title: "Theme updates that destroy your design",
    description:
      "A theme update can change CSS rules, shift your navigation, hide your hero section, or break your mobile layout. Since the server still returns 200 OK, uptime monitoring won't catch it. PageSentinel compares full-page screenshots pixel-by-pixel to catch visual regressions instantly.",
  },
  {
    title: "Security vulnerabilities from outdated or compromised plugins",
    description:
      "Compromised plugins inject spam links, redirect rules, and malicious scripts into your pages. These changes are invisible until Google blacklists your domain or your visitors complain. PageSentinel detects new outbound links, unexpected redirects, and injected content — and alerts you immediately.",
  },
  {
    title: "No wp-admin access? No problem",
    description:
      "PageSentinel monitors from the outside — no plugin installs, no wp-admin access, no code snippets. Just add your URLs and we handle the rest. This is especially useful for agencies managing client sites where you don't want to install additional plugins.",
  },
];

const faqs = [
  {
    question: "Do I need to install a WordPress plugin to use PageSentinel?",
    answer:
      "No. PageSentinel monitors any public URL from the outside. There's nothing to install on your WordPress site — no plugins, no wp-admin access, no code snippets. Just add the URLs you want to monitor and set your scan frequency.",
  },
  {
    question: "Can PageSentinel detect changes caused by Elementor or page builder updates?",
    answer:
      "Yes. Page builder updates often cause visual layout shifts — broken containers, missing widgets, misaligned sections. PageSentinel's screenshot comparison catches these visual regressions immediately, even if the underlying HTML still loads without errors. You'll see exactly which section shifted and how.",
  },
  {
    question: "What about WooCommerce pages — can it check those?",
    answer:
      "Yes. Monitor your shop page, product pages, cart, and checkout — any public-facing WooCommerce URL. Catch price changes, missing Add to Cart buttons, broken checkout forms, and modified product descriptions before they cost you sales.",
  },
];

export default function WordPressPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Website Change Monitoring for WordPress — Detect Plugin Update Damage",
              description:
                "WordPress sites break when plugins update. Catch broken layouts, missing content, and redirect injections before your visitors or clients notice.",
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
                { "@type": "ListItem", position: 2, name: "Website Change Monitoring for WordPress" },
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
          <span className="text-emerald-600 font-bold">WP</span>
          WordPress Sites
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Website change monitoring for WordPress — catch plugin damage before your visitors do
        </h1>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
          <p className="text-base leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
            WordPress sites are powerful but fragile. One auto-updating plugin can break your
            layout, inject redirects, or hide your checkout form — and traditional uptime
            monitoring won't catch any of it. PageSentinel monitors your WordPress pages from
            the outside, detects every visual, content, and structural change, and alerts you
            before your visitors notice. No plugin installs required.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {pains.map((pain) => (
            <div key={pain.title} className="rounded-xl border border-border/60 bg-muted/20 p-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold text-foreground">{pain.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pain.description}</p>
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
            Protect your WordPress sites from plugin update damage
          </h2>
          <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">
            7-day free trial. Monitor up to 20 pages. No credit card. No plugin installs.
          </p>
          <div className="mt-6">
            <a href="https://app.pagesentinel.com/signup?plan=Free-Trial">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
