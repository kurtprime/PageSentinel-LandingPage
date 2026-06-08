import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Check, X, AlertTriangle, Eye, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Change Monitoring vs Uptime Monitoring — What's the Difference?",
  description:
    "Uptime monitoring checks if your server responds. Website change monitoring checks if your pages are correct. Learn the critical difference and why agencies need both.",
  alternates: {
    canonical: "https://pagesentinel.io/website-change-monitoring-vs-uptime-monitoring",
  },
  openGraph: {
    title: "Website Change Monitoring vs Uptime Monitoring | PageSentinel",
    description:
      "Uptime monitoring checks if your server responds. Website change monitoring checks if your pages are correct. Learn the critical difference.",
    type: "article",
    images: [{ url: "https://pagesentinel.io/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Change Monitoring vs Uptime Monitoring | PageSentinel",
    description:
      "Uptime monitoring checks if your server responds. Website change monitoring checks if your pages are correct.",
  },
};

const comparisonPoints = [
  {
    feature: "What it checks",
    uptime: "Server response (HTTP status code)",
    changeMonitoring: "Visual layout, content, structure, redirects, scripts",
    changeWins: true,
  },
  {
    feature: "Catches broken layouts?",
    uptime: "No — page can be 'up' but visually broken",
    changeMonitoring: "Yes — pixel-by-pixel screenshot comparison",
    changeWins: true,
  },
  {
    feature: "Catches content changes?",
    uptime: "No — text edits, pricing changes go undetected",
    changeMonitoring: "Yes — detects text, pricing, policy modifications",
    changeWins: true,
  },
  {
    feature: "Catches defacement?",
    uptime: "No — injected scripts don't affect HTTP status",
    changeMonitoring: "Yes — flags new links, redirects, injected content",
    changeWins: true,
  },
  {
    feature: "Alert detail",
    uptime: "'Your site is down' — no details on what broke",
    changeMonitoring: "Visual diff + plain-English summary of exactly what changed",
    changeWins: true,
  },
  {
    feature: "False positives",
    uptime: "High — brief network blips trigger alerts",
    changeMonitoring: "Low — noise reduction filters benign changes",
    changeWins: true,
  },
  {
    feature: "Audit trail",
    uptime: "Uptime/downtime log — no before/after evidence",
    changeMonitoring: "Timestamped screenshots + diffs proving when/what changed",
    changeWins: true,
  },
  {
    feature: "Setup required",
    uptime: "URL + check interval",
    changeMonitoring: "URL + baseline capture + scan frequency",
    changeWins: false,
  },
];

const faqs = [
  {
    question: "Do I need both uptime monitoring and website change monitoring?",
    answer:
      "They serve different purposes. Uptime monitoring tells you when your server stops responding — useful for infrastructure teams. Website change monitoring tells you when your page content, layout, or structure changes — essential for agencies, site owners, and anyone who depends on their pages being correct. Most teams need both because a site that's 'up' can still be broken in ways that cost revenue.",
  },
  {
    question: "Can one tool do both uptime and change monitoring?",
    answer:
      "Most tools specialize in one or the other. Uptime tools (Pingdom, UptimeRobot) focus on server response. Change monitoring tools (PageSentinel, Visualping, Hexometer) focus on visual and content changes. PageSentinel includes basic uptime signals as part of scanning, but its core value is detecting what changed on the page — not just whether it responded.",
  },
  {
    question: "How much does website change monitoring cost vs uptime monitoring?",
    answer:
      "Basic uptime monitoring is often free or very low cost ($5-10/mo). Website change monitoring starts around $29/mo (PageSentinel Starter) because it does more — capturing screenshots, comparing pixels, analyzing content, generating diffs, and providing human-readable summaries. The ROI calculation changes when you consider that one undetected broken checkout page can cost thousands in lost revenue.",
  },
];

export default function ComparisonPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Website Change Monitoring vs Uptime Monitoring — What's the Difference?",
              description:
                "Uptime monitoring checks if your server responds. Website change monitoring checks if your pages are correct. Learn the critical difference and why agencies need both.",
              datePublished: "2026-06-01",
              author: { "@type": "Organization", name: "PageSentinel" },
              publisher: {
                "@type": "Organization",
                name: "PageSentinel",
                logo: { "@type": "ImageObject", url: "https://pagesentinel.io/assets/icon.svg" },
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://pagesentinel.io" },
                { "@type": "ListItem", position: 2, name: "Website Change Monitoring vs Uptime Monitoring" },
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
          <Eye className="h-3.5 w-3.5 text-emerald-600" />
          Comparison Guide
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Website Change Monitoring vs Uptime Monitoring — What&apos;s the Difference?
        </h1>

        {/* Summary-first block (GEO-optimized) */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
            TL;DR — The 40-second answer
          </p>
          <p className="text-base leading-relaxed text-emerald-700/80 dark:text-emerald-400/80">
            <strong>Uptime monitoring</strong> checks if your server responds with a 200 OK — that&apos;s it.
            It won&apos;t catch broken layouts, changed pricing, injected redirects, or missing checkout
            forms. <strong>Website change monitoring</strong> captures screenshots and HTML snapshots on a
            schedule, compares each capture to a known-good baseline, and alerts you with a visual diff and
            plain-English summary of exactly what changed. The difference is the gap between &ldquo;your
            site is up&rdquo; and &ldquo;your site is correct.&rdquo;
          </p>
        </div>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          If you manage websites for clients — or run a business that depends on your website for revenue —
          you&apos;ve probably used uptime monitoring. Pingdom, UptimeRobot, or a basic server check.
          Here&apos;s the problem: your site can be &ldquo;up&rdquo; (server responding with 200 OK) and
          still be completely broken in ways that lose you money, clients, and reputation.
        </p>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          Side-by-side comparison
        </h2>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                <th className="text-left px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Uptime Monitoring
                  </div>
                </th>
                <th className="text-left px-4 py-3 font-semibold">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <Shield className="h-3.5 w-3.5" />
                    Website Change Monitoring
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonPoints.map((row, i) => (
                <tr key={i} className="border-b border-border/40 last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{row.uptime}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground">{row.changeMonitoring}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          When uptime monitoring is enough
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Uptime monitoring works well for infrastructure teams who need to know when a server goes down.
          If you&apos;re running a SaaS backend, an API, or a service where &ldquo;responding&rdquo; is the
          only success condition, uptime monitoring covers your needs. It&apos;s lightweight, easy to set
          up, and inexpensive.
        </p>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          When you need website change monitoring
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          You need change monitoring when what&apos;s ON the page matters as much as whether the page loads.
          This includes:
        </p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Agencies</strong> managing client sites — a plugin update can break layouts across dozens of sites simultaneously</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Ecommerce teams</strong> — every hour a broken checkout or incorrect price goes undetected is lost revenue</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Compliance teams</strong> — unauthorized edits to terms, privacy policies, or regulatory pages carry legal risk</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Marketing teams</strong> — landing pages, pricing tables, and campaign pages that silently change cost conversions</span>
          </li>
        </ul>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          The real cost of relying on uptime monitoring alone
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Here&apos;s what uptime monitoring won&apos;t catch — and what happens when these go undetected:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { issue: "Broken checkout form", cost: "Lost sales every hour it's down", icon: X },
            { issue: "Pricing changed from $29 to $19", cost: "Revenue leak until someone notices", icon: X },
            { issue: "Injected spam links in footer", cost: "SEO penalty + reputation damage", icon: X },
            { issue: "Silent redirect to another page", cost: "Lost traffic + conversion drop", icon: X },
          ].map((item) => (
            <div key={item.issue} className="rounded-lg border border-red-100 bg-red-50/30 dark:bg-red-950/10 p-4">
              <div className="flex items-start gap-2">
                <item.icon className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.issue}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.cost}</p>
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
            See what uptime monitoring is missing on your pages
          </h2>
          <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">
            Start your free 7-day trial. Monitor up to 20 pages. No credit card.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Calculate your revenue at risk →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
