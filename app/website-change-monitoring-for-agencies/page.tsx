import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Check, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Change Monitoring for Agencies — Protect Every Client Site",
  description:
    "Monitor 20—200+ client sites from a single dashboard. Catch broken layouts, plugin update damage, and unauthorized changes before clients notice. Built for agencies.",
  alternates: {
    canonical: "https://pagesentinel.io/website-change-monitoring-for-agencies",
  },
  openGraph: {
    title: "Website Change Monitoring for Agencies | PageSentinel",
    description:
      "Monitor 20—200+ client sites from a single dashboard. Catch broken layouts, plugin update damage, and unauthorized changes before clients notice.",
    type: "article",
    images: [{ url: "https://pagesentinel.io/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Change Monitoring for Agencies | PageSentinel",
    description:
      "Monitor 20—200+ client sites from a single dashboard. Catch broken layouts before your clients do.",
  },
};

const reasons = [
  {
    title: "Catch plugin update damage across your entire roster",
    description:
      "One Elementor update can break 14+ client homepages overnight. PageSentinel scans every client site on your monitoring list and alerts you the moment a layout, CTA, or critical section shifts — so you fix it before a single client picks up the phone.",
  },
  {
    title: "Prove what changed and when — with evidence",
    description:
      "When a client asks 'what happened to my site?' you have a timestamped audit trail with before/after screenshots and a plain-English summary. Send it directly to the client. No more explaining. No more uncertainty.",
  },
  {
    title: "One dashboard for all your clients",
    description:
      "Monitor all client sites from one place. Group sites by client, set different scan frequencies per page, and route alerts to the right team member. Slack and webhook alerts keep your team in sync without adding another inbox to check.",
  },
  {
    title: "Stop finding out from your clients",
    description:
      "The average agency learns about a broken client site 3 days after it happened — from the client. PageSentinel alerts you in under 30 seconds. You're the one breaking the news — not the one getting the panicked call.",
  },
];

const faqs = [
  {
    question: "How many client sites can I monitor?",
    answer:
      "Every PageSentinel plan is built around scan credits, not site limits. The Starter plan includes 10,000 scans/month — enough for ~30 pages checked daily. The Agency plan includes 500,000 scans/month for large agencies managing 100+ sites. You set the frequency per page, and credits are pooled across all your URLs.",
  },
  {
    question: "Can I give clients access to their own monitoring dashboard?",
    answer:
      "White-label reporting and client-facing dashboards are coming soon to the Agency plan. For now, you can export and share audit trail reports, screenshot evidence, and change summaries directly with clients via email or your existing reporting tools.",
  },
  {
    question: "Does PageSentinel work with WordPress, Shopify, and custom sites?",
    answer:
      "Yes. PageSentinel monitors any public URL — WordPress, Shopify, Webflow, Squarespace, custom-built sites, whatever your clients use. There's nothing to install. No plugins. No wp-admin access needed. We monitor from the outside.",
  },
];

export default function AgenciesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Website Change Monitoring for Agencies — Protect Every Client Site",
              description:
                "Monitor 20—200+ client sites from a single dashboard. Catch broken layouts, plugin update damage, and unauthorized changes before clients notice.",
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
                { "@type": "ListItem", position: 2, name: "Website Change Monitoring for Agencies" },
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
          <Building2 className="h-3.5 w-3.5 text-emerald-600" />
          For Agencies
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Website change monitoring for agencies — know before your clients do
        </h1>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
          <p className="text-base leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
            PageSentinel monitors all your client sites from a single dashboard, alerting you the
            moment a layout breaks, content changes, or a redirect appears — so you fix it before
            the client ever opens their browser. No plugins. No wp-admin access. Just the peace
            of mind that comes from knowing first.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-xl border border-border/60 bg-muted/20 p-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-base font-bold text-foreground">{reason.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
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
            Start monitoring your client sites today
          </h2>
          <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">
            7-day free trial. Add unlimited pages. No credit card required.
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
