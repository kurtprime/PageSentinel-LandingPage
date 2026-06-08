import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, User, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function formatMarkdown(content: string): string {
  let html = content;

  html = html.replace(/^### (.+)$/gm, (_match, text) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return `<h3 id="${id}" class="text-lg font-bold mt-8 mb-3 scroll-mt-20">${text.trim()}</h3>`;
  });

  html = html.replace(/^## (.+)$/gm, (_match, text) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return `<h2 id="${id}" class="text-xl font-bold mt-10 mb-4 scroll-mt-20">${text.trim()}</h2>`;
  });

  html = html.replace(/^# (.+)$/gm, (_match, text) => {
    const id = text.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return `<h1 id="${id}" class="text-2xl font-extrabold mt-10 mb-4 scroll-mt-20">${text.trim()}</h1>`;
  });

  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-muted-foreground mb-1">$1</li>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  html = html.replace(/\n\n/g, '</p><p class="mt-4 leading-relaxed text-muted-foreground">');

  html = html.replace(/^(.+)$/gm, (match) => {
    if (match.startsWith("<")) return match;
    return match;
  });

  html = `<p class="leading-relaxed text-muted-foreground">${html}</p>`;

  html = html.replace(/<li class="ml-4 text-muted-foreground mb-1">([\s\S]*?)<\/li>/g, (_match, content) => {
    const ulContent = `<li class="ml-4 text-muted-foreground mb-1">${content}</li>`;
    return ulContent;
  });

  return html;
}

interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  image: string;
}

function getAllPosts(): PostMeta[] {
  const contentDir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.frontmatter.title as string,
    description: post.frontmatter.excerpt as string,
    alternates: {
      canonical: `https://pagesentinel.io/blog/${slug}`,
    },
    openGraph: {
      title: post.frontmatter.title as string,
      description: post.frontmatter.excerpt as string,
      type: "article",
      publishedTime: post.frontmatter.date as string,
      modifiedTime: post.frontmatter.lastUpdated
        ? (post.frontmatter.lastUpdated as string)
        : (post.frontmatter.date as string),
      images: post.frontmatter.image
        ? [{ url: `https://pagesentinel.io${post.frontmatter.image}`, width: 1200, height: 630 }]
        : [],
      authors: [post.frontmatter.author as string],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title as string,
      description: post.frontmatter.excerpt as string,
    },
  };
}

function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const { frontmatter, content } = post;
  const headings = extractHeadings(content);
  const formattedContent = formatMarkdown(content);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: frontmatter.title,
            description: frontmatter.excerpt,
            datePublished: frontmatter.date,
            dateModified: frontmatter.lastUpdated
              ? frontmatter.lastUpdated
              : frontmatter.date,
            author: {
              "@type": "Person",
              name: frontmatter.author,
              jobTitle: frontmatter.authorRole,
            },
            publisher: {
              "@type": "Organization",
              name: "PageSentinel",
              logo: {
                "@type": "ImageObject",
                url: "https://pagesentinel.io/assets/icon.svg",
              },
            },
            image: frontmatter.image
              ? `https://pagesentinel.io${frontmatter.image}`
              : undefined,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pagesentinel.io/blog/${slug}`,
            },
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
                name: "Blog",
                item: "https://pagesentinel.io/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: frontmatter.title,
              },
            ],
          }),
        }}
      />

      {/* Back to blog */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to blog
      </Link>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {Array.isArray(frontmatter.tags) &&
          (frontmatter.tags as string[]).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {frontmatter.title as string}
      </h1>

      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {frontmatter.excerpt as string}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{frontmatter.author as string}</span>
          <span>·</span>
          <span>{frontmatter.authorRole as string}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {frontmatter.lastUpdated
            ? `Updated ${frontmatter.lastUpdated as string}`
            : (frontmatter.date as string)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {frontmatter.readingTime as string}
        </span>
      </div>

      {/* Featured Image */}
      {frontmatter.image && (
        <div className="mt-8 overflow-hidden rounded-xl border border-border/60">
          <Image
            src={frontmatter.image as string}
            alt={frontmatter.title as string}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Table of Contents */}
      {headings.length > 2 && (
        <nav className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-5" aria-label="Table of contents">
          <h2 className="text-sm font-semibold text-foreground mb-3">Table of Contents</h2>
          <ul className="space-y-1.5">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors leading-relaxed"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Content */}
      <div className="mt-10 prose prose-zinc dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-6">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block rounded-xl border border-border bg-background shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="aspect-video bg-muted/30 flex items-center justify-center">
                  {related.image ? (
                    <Image
                      src={related.image}
                      alt={related.title}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Tag className="h-6 w-6 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">{related.date} · {related.readingTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 text-center">
        <h2 className="font-bold text-emerald-800 dark:text-emerald-300">
          Stop losing revenue to broken client sites
        </h2>
        <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-400/80">
          Start your free 7-day trial — no credit card. Monitor all your client sites silently.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Start free trial
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
