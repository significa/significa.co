/**
 * Applies a text transform to the prose of a Markdown document only, leaving
 * fenced code blocks (``` or ~~~) byte for byte as they are, since blank lines
 * and trailing spaces can be part of a code example.
 */
export function mapOutsideFences(markdown: string, transform: (prose: string) => string): string {
  const parts = markdown.split(/(^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)[ \t]*$)/m);
  return parts.map((part, index) => (index % 2 === 1 ? part : transform(part))).join('');
}
