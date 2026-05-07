import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://overseek.net";

export async function GET() {
  const posts = getAllPosts();

  const blogEntries = posts
    .map(
      (post) =>
        `- [${post.frontmatter.title}](${SITE_URL}/blog/${post.slug}): ${post.frontmatter.description}`
    )
    .join("\n");

  const content = `# Overseek

> AI and automation solutions for small businesses. We design and build AI agents, workflow automations, cloud infrastructure, and custom software — so you can operate smarter without growing your headcount.

## Blog

Practical guides on AI, agents, and automation for small business owners:

${blogEntries || "- Coming soon"}

## Raw Markdown

Each blog article is available as plain text at: ${SITE_URL}/blog/[slug]/raw

## Services

- [Homepage](${SITE_URL}): Cloud & DevOps, AI & Machine Learning, Custom Software Development
- [Contact](${SITE_URL}/#contact): Get in touch for project inquiries

## About

Overseek is an engineering consultancy helping small businesses integrate AI agents and automation into their daily operations. We specialise in RAG pipelines, self-hosted LLMs, workflow automation, and production-grade infrastructure.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
