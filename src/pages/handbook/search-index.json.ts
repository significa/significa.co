import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

/**
 * Strips MDX/Markdown syntax from a string, leaving plain searchable text.
 * - Removes frontmatter (shouldn't be present in body, but just in case)
 * - Removes import/export statements
 * - Removes JSX/HTML tags
 * - Removes Markdown headings markers, bold, italic, code fences, links, images
 * - Collapses whitespace
 */
function stripMarkdown(raw: string): string {
  return (
    raw
      // Remove fenced code blocks
      .replace(/```[\s\S]*?```/g, " ")
      // Remove inline code
      .replace(/`[^`]*`/g, " ")
      // Remove import / export lines (MDX)
      .replace(/^(import|export)\s+.+$/gm, " ")
      // Remove JSX/HTML tags
      .replace(/<[^>]+>/g, " ")
      // Remove Markdown images ![alt](url)
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      // Remove Markdown links [text](url) — keep the text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      // Remove heading markers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic markers
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
      // Remove blockquote markers
      .replace(/^\s*>\s*/gm, "")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Remove list markers
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      // Collapse whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

export interface SearchIndexEntry {
  id: string;
  title: string;
  description: string;
  body: string;
  url: string;
}

export const GET: APIRoute = async () => {
  const pages = await getCollection("handbook");

  const index: SearchIndexEntry[] = pages.map((page) => ({
    id: page.id,
    title: page.data.title,
    description: page.data.description ?? "",
    body: stripMarkdown(page.body ?? ""),
    url: `/handbook/${page.id}`,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
