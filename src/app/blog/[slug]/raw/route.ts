import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Strip MDX import lines, keep pure markdown
  const markdown = post.content
    .replace(/^import\s+.+from\s+['"].+['"]\s*;?\s*$/gm, "")
    .trim();

  const frontmatterHeader = [
    `# ${post.frontmatter.title}`,
    ``,
    `> ${post.frontmatter.description}`,
    ``,
    `**Date:** ${post.frontmatter.date}`,
    `**Tags:** ${post.frontmatter.tags.join(", ")}`,
    `**Reading time:** ${post.readingTime}`,
    `**Author:** ${post.frontmatter.author}`,
    ...(post.frontmatter.series
      ? [`**Series:** ${post.frontmatter.series} (Part ${post.frontmatter.seriesOrder})`]
      : []),
    ``,
    `---`,
    ``,
  ].join("\n");

  return new NextResponse(frontmatterHeader + markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
