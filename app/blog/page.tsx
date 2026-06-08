import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogGrid } from "@/components/blog/blog-grid";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import type { PostMeta } from "@/lib/post-types";

export const metadata: Metadata = {
  title: "Blog — Website Change Monitoring Guides & Insights",
  description:
    "Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check. Written for agencies, site owners, and teams.",
  alternates: {
    canonical: "https://pagesentinel.io/blog",
  },
  openGraph: {
    title: "The Website Change Monitoring Blog | PageSentinel",
    description:
      "Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check.",
    type: "website",
    images: [{ url: "https://pagesentinel.io/assets/ai-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Website Change Monitoring Blog | PageSentinel",
    description:
      "Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check.",
  },
};

function getPosts(): PostMeta[] {
  const contentDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    return {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      tags: (data.tags as string[]) || [],
      readingTime: (data.readingTime as string) || "5 min",
      image: (data.image as string) || "",
    };
  });

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export default function BlogPage() {
  const posts = getPosts();

  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The PageSentinel Blog",
    description:
      "Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check.",
    url: "https://pagesentinel.io/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://pagesentinel.io/blog/${post.slug}`,
      image: post.image ? `https://pagesentinel.io${post.image}` : undefined,
    })),
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-900/20" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-900/10" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://pagesentinel.io" },
                  { "@type": "ListItem", position: 2, name: "Blog" },
                ],
              }),
            }}
          />

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Blog</span>
          </nav>

          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Website Change Monitoring Blog
            </h1>
            <p className="mt-4 text-muted-foreground">
              Practical guides on website change monitoring, defacement detection, downtime
              costs, and keeping your pages in check — written for agencies, site owners, and
              teams who depend on their websites.
            </p>
          </div>

          {posts.length > 0 ? (
            <BlogGrid posts={posts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Articles coming soon. Stay tuned.</p>
            </div>
          )}

          <div className="mx-auto mt-16 max-w-md rounded-xl border border-border bg-muted/30 p-6 text-center">
            <h2 className="font-semibold text-foreground">Get one article per week on website monitoring</h2>
            <p className="mt-1 text-sm text-muted-foreground">No spam. Unsubscribe anytime.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <Link
              href="/calculator"
              className="rounded-xl border border-red-200 bg-red-50/30 dark:bg-red-950/10 p-6 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-foreground group-hover:text-red-600 transition-colors">
                How much are broken pages costing you?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use our free downtime cost calculator to see your annual revenue at risk.
              </p>
            </Link>
            <Link
              href="https://app.pagesentinel.com/signup?plan=Free-Trial"
              className="rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                Ready to monitor your sites?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your free 7-day trial — no credit card required.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
