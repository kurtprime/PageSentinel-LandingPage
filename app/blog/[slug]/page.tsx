import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/blog/blog-post-content";
import type { PostMeta } from "@/lib/post-types";

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

  const articleStructuredData = {
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
  };

  const breadcrumbStructuredData = {
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
  };

  const faqStructuredData = frontmatter.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (frontmatter.faq as Array<{ question: string; answer: string }>).map(
          (item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })
        ),
      }
    : null;

  const howToStructuredData = frontmatter.howToSteps
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: frontmatter.title,
        step: (frontmatter.howToSteps as string[]).map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step,
        })),
      }
    : null;

  const softwareComparisonData = frontmatter.comparison
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: frontmatter.comparison.productName as string,
        applicationCategory: "WebMonitoringApplication",
        operatingSystem: "Web",
        description: frontmatter.excerpt,
      }
    : null;

  return (
    <BlogPostContent
      slug={slug}
      title={frontmatter.title as string}
      excerpt={frontmatter.excerpt as string}
      tags={(frontmatter.tags as string[]) || []}
      date={frontmatter.date as string}
      lastUpdated={frontmatter.lastUpdated as string | undefined}
      author={frontmatter.author as string}
      authorRole={frontmatter.authorRole as string}
      readingTime={(frontmatter.readingTime as string) || "5 min"}
      image={(frontmatter.image as string) || ""}
      headings={headings}
      formattedContent={formattedContent}
      relatedPosts={relatedPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        readingTime: p.readingTime,
        image: p.image,
      }))}
      articleStructuredData={articleStructuredData}
      breadcrumbStructuredData={breadcrumbStructuredData}
      faqStructuredData={faqStructuredData}
      howToStructuredData={howToStructuredData}
      softwareComparisonData={softwareComparisonData}
    />
  );
}
