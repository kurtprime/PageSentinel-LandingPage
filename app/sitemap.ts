import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pagesentinel.io";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/website-change-monitoring-vs-uptime-monitoring`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/what-is-website-change-monitoring`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/website-change-monitoring-for-agencies`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/website-change-monitoring-for-wordpress`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/website-change-monitoring-for-ecommerce`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const blogPosts: MetadataRoute.Sitemap = [];
  const contentDir = path.join(process.cwd(), "content/blog");
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(contentDir, file);
      const { mtime } = fs.statSync(filePath);
      blogPosts.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: mtime,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...blogPosts];
}
