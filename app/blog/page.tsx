import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/shared/newsletter-form";

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
    images: [{ url: "https://pagesentinel.io/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Website Change Monitoring Blog | PageSentinel",
    description:
      "Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check.",
  },
};

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  image: string;
}

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
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
      </div>
    </div>
  );
}
