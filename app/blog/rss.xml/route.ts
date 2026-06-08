import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const baseUrl = "https://pagesentinel.io";
  const contentDir = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(contentDir)) {
    return new Response("<rss/>", {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.mdx$/, ""), ...data } as {
        slug: string;
        title: string;
        excerpt: string;
        date: string;
        tags: string[];
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PageSentinel Blog — Website Change Monitoring Guides</title>
    <link>${baseUrl}/blog</link>
    <description>Practical guides on website change monitoring, defacement detection, downtime costs, and keeping your pages in check. Written for agencies, site owners, and teams.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${p.slug}</guid>
      <description><![CDATA[${p.excerpt}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${(p.tags || []).map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
