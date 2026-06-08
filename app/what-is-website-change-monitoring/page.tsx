import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Check, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "What Is Website Change Monitoring? — A Complete Guide",
  description:
    "Website change monitoring automatically detects visual, content, and structural changes to web pages — not just whether they're up. Learn how it works, who needs it, and why it matters.",
  alternates: {
    canonical: "https://pagesentinel.io/what-is-website-change-monitoring",
  },
  openGraph: {
    title: "What Is Website Change Monitoring? | PageSentinel",
    description:
      "Website change monitoring automatically detects visual, content, and structural changes to web pages. Learn how it works, who needs it, and why it matters.",
    type: "article",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Website Change Monitoring? | PageSentinel",
    description:
      "Website change monitoring automatically detects visual, content, and structural changes to web pages.",
  },
};

const faqs = [
  {
    question: "How is website change monitoring different from uptime monitoring?",
    answer:
      "Uptime monitoring checks one thing: is the server responding? Website change monitoring checks everything else — layout shifts, content edits, redirect injections, broken forms, and visual changes. Your site can be 'up' and still be broken in ways that cost revenue. Change monitoring catches what uptime tools miss.",
  },
  {
    question: "What types of changes can website change monitoring detect?",
    answer:
      "Three main categories: Visual changes (layout breaks, hidden sections, CSS regressions, design inconsistencies), Content changes (text edits, pricing updates, policy modifications, new or removed content), and Structural changes (HTML modifications, injected scripts, redirect rules, form changes). PageSentinel detects all three.",
  },
  {
    question: "Who should use website change monitoring?",
    answer:
      "Agencies managing multiple client sites, ecommerce teams protecting checkout and pricing pages, compliance teams tracking policy changes, and any site owner who depends on their website for leads or revenue. If you'd lose money or reputation from an undetected page change, you need change monitoring.",
  },
  {
    question: "Do I need to install anything for website change monitoring?",
    answer:
      "No — PageSentinel monitors any public URL from the outside. You don't need plugin installs, wp-admin access, or code snippets. Just add the URLs you want to monitor, set your scan frequency, and you're done in under 3 minutes.",
  },
];

const changeTypes = [
  {
    title: "Visual changes",
    description:
      "Layout breaks, hidden sections, CSS regressions, design inconsistencies, broken images, and elements that render incorrectly after updates. These are the changes your visitors notice first — and the ones that erode trust fastest.",
    examples: ["Broken navigation after theme update", "Hidden CTA button after plugin install", "Misaligned hero section after CSS change"],
  },
  {
    title: "Content changes",
    description:
      "Text edits, pricing updates, policy modifications, new or removed content, changed headlines, and rewritten paragraphs. These are the changes that affect revenue, compliance, and customer trust.",
    examples: ["Pricing changed from $29 to $19", "Terms of service paragraph removed", "Product description rewritten without approval"],
  },
  {
    title: "Structural changes",
    description:
      "HTML modifications, injected scripts, redirect rules, form changes, new outbound links, and altered meta tags. These are the hardest to spot manually and the most dangerous when they're malicious.",
    examples: ["Injected spam links in footer", "Silent redirect to another page", "Malicious script added to checkout"],
  },
];

export default function GlossaryPage() {
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
              headline: "What Is Website Change Monitoring? — A Complete Guide",
              description:
                "Website change monitoring automatically detects visual, content, and structural changes to web pages. Learn how it works, who needs it, and why it matters.",
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
                { "@type": "ListItem", position: 2, name: "What Is Website Change Monitoring?" },
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
          <Search className="h-3.5 w-3.5 text-emerald-600" />
          Guide
        </Badge>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          What is website change monitoring?
        </h1>

        {/* GEO-optimized definition */}
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6">
          <p className="text-base leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
            Website change monitoring is the practice of automatically tracking and detecting
            visual, content, and structural changes to web pages — not just whether they respond
            to HTTP requests. It captures screenshots and HTML snapshots on a schedule, compares
            each capture to a known-good baseline, and alerts you with a visual diff and
            plain-English summary when something meaningful changes.
          </p>
        </div>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          If you manage websites — whether you&apos;re an agency, a freelancer, or an in-house
          team — you&apos;ve probably experienced this: a site looks fine at first glance (it
          loads, it responds), but something is wrong. A layout broke. A pricing table updated
          incorrectly. A redirect quietly started sending visitors somewhere else. Traditional
          uptime monitoring would tell you the site is &ldquo;up.&rdquo; And technically, it is.
          But &ldquo;up&rdquo; doesn&apos;t mean &ldquo;working correctly.&rdquo;
        </p>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          The three types of changes website change monitoring detects
        </h2>

        <div className="grid gap-6 sm:grid-cols-3 mt-4">
          {changeTypes.map((type) => (
            <div key={type.title} className="rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3 className="text-base font-bold text-foreground">{type.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{type.description}</p>
              <ul className="mt-3 space-y-1.5">
                {type.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4">
          How website change monitoring works
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Add the URLs you want to monitor", desc: "Enter any public URL — homepage, pricing page, checkout, blog. No plugin installs, no code snippets, no access needed." },
            { step: "2", title: "Set your scan frequency", desc: "Choose how often each page gets checked — from every 15 minutes to weekly, depending on how critical the page is to your business." },
            { step: "3", title: "Baseline capture established", desc: "PageSentinel takes a full-page screenshot and HTML snapshot. This becomes your known-good baseline that future captures are compared against." },
            { step: "4", title: "Scheduled scans run automatically", desc: "Every scan captures a new screenshot and HTML snapshot. The system compares each capture to the baseline, flagging differences that matter." },
            { step: "5", title: "You get alerted when something changes", desc: "When a meaningful change is detected, you receive an alert with a visual diff highlighting exactly what shifted and a plain-English summary describing the change." },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 rounded-xl border border-border/60 bg-muted/20 p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
            Start monitoring your pages today
          </h2>
          <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-400/80">
            7-day free trial. Monitor up to 20 pages. No credit card required.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="https://app.pagesentinel.com/signup?plan=Free-Trial">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Start free trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <Link href="/website-change-monitoring-vs-uptime-monitoring" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Website change monitoring vs uptime monitoring →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
