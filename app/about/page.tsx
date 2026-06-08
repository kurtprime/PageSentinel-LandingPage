import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Heart, Zap, Users, Sparkles, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About PageSentinel — Built by an Agency Developer",
  description:
    "Built by a former agency developer who was tired of getting panicked calls at 11 p.m. Meet the team behind PageSentinel — website change monitoring for agencies, site owners, and teams.",
  alternates: {
    canonical: "https://pagesentinel.io/about",
  },
  openGraph: {
    title: "About PageSentinel — Website Change Monitoring",
    description:
      "Built by a former agency developer who was tired of getting panicked calls at 11 p.m. Meet the team behind PageSentinel.",
    type: "website",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PageSentinel — Website Change Monitoring",
    description:
      "Built by a former agency developer who was tired of getting panicked calls at 11 p.m.",
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Accuracy First",
    description:
      "We will not send you a false alarm. Every alert that leaves our system is verified to filter out benign changes — font smoothing, ad rotations, minor spacing. If we're not sure, we don't ping you.",
  },
  {
    icon: Users,
    title: "Agency First",
    description:
      "Every feature is built for teams managing 20–200+ client sites. If it doesn't make agency life easier, it doesn't ship. Multi-site dashboards, client-ready reports, team notifications.",
  },
  {
    icon: Zap,
    title: "Radical Speed",
    description:
      "Alerts arrive in under 30 seconds so you can fix the issue before the client ever opens their browser. Speed is the difference between a quiet fix and a panicked phone call.",
  },
  {
    icon: Heart,
    title: "No Lock-In",
    description:
      "Monthly plans. Cancel anytime. Export your data. We earn your business every month — we don't trap you with annual contracts or proprietary formats.",
  },
  {
    icon: Sparkles,
    title: "Honest Growth",
    description:
      "We're new. That means you get direct access to the team building the product, personal onboarding, and your feature requests shape the roadmap.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PageSentinel",
  url: "https://pagesentinel.io",
  logo: "https://pagesentinel.io/assets/icon.svg",
  description:
    "Website change monitoring that detects visual, structural, and content changes across web pages. Catch defacement, broken layouts, and policy changes with fewer false positives and a clear audit trail.",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Kurt Quejada",
    jobTitle: "Founder",
  },
  email: "hello@pagesentinel.io",
  sameAs: [],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kurt Quejada",
  jobTitle: "Founder, PageSentinel",
  description:
    "Former agency developer who spent 6 years maintaining 40+ WordPress sites for local businesses before founding PageSentinel.",
  worksFor: {
    "@type": "Organization",
    name: "PageSentinel",
  },
  url: "https://pagesentinel.io/about",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pagesentinel.io" },
    { "@type": "ListItem", position: 2, name: "About" },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-border/40 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Built by an agency developer who was tired of getting panicked calls at
            11&nbsp;p.m.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            PageSentinel started after its founder spent 6 years maintaining 40+ WordPress
            sites for local businesses. One Elementor update broke 14 client homepages in a
            single night. The clients found out first. That was the last time.
          </p>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            No agency should learn about a broken client site from the client.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We&apos;re building the monitoring layer that teams and agencies deserve —
            AI-powered, false-positive-free, and invisible to end users. Every alert we send
            saves someone from a difficult conversation.
          </p>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-12">
            What we stand for
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 md:py-24 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            We personally onboard every agency.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Not a chatbot. Not a knowledge base. You&apos;ll talk to a real person
            who&apos;s managed client sites and knows your stack. We&apos;ll help you set
            up monitoring for every page you care about in under 10 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Book a 15-minute setup call
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <a
              href="mailto:hello@pagesentinel.io"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@pagesentinel.io
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
