/**
 * Fenced code block detection, following CommonMark: a block opens with three
 * or more backticks or tildes (up to three spaces of indent) and closes only
 * on a line with the same character, at least as many of them, and nothing
 * else. So a ```` block can contain a ``` line, and an unclosed block runs to
 * the end of the document.
 */

const OPENING = /^ {0,3}(`{3,}|~{3,})/;

/** For each line, whether it belongs to a fenced code block (fence lines included). */
export function codeLines(lines: string[]): boolean[] {
  const inCode: boolean[] = [];
  let fence: { char: string; length: number } | undefined;

  for (const line of lines) {
    if (fence) {
      inCode.push(true);
      const closing = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (closing && closing[1][0] === fence.char && closing[1].length >= fence.length) {
        fence = undefined;
      }
      continue;
    }
    const opening = line.match(OPENING);
    // A backtick fence's info string may not contain backticks (CommonMark).
    if (opening && !(opening[1][0] === '`' && line.slice(opening[0].length).includes('`'))) {
      fence = { char: opening[1][0], length: opening[1].length };
      inCode.push(true);
      continue;
    }
    inCode.push(false);
  }
  return inCode;
}

/**
 * Applies a text transform to the prose of a Markdown document only, leaving
 * fenced code blocks byte for byte as they are, since blank lines and
 * trailing spaces can be part of a code example.
 */
export function mapOutsideFences(markdown: string, transform: (prose: string) => string): string {
  const lines = markdown.split('\n');
  const inCode = codeLines(lines);
  const chunks: { code: boolean; lines: string[] }[] = [];
  lines.forEach((line, index) => {
    const last = chunks[chunks.length - 1];
    if (last && last.code === inCode[index]) last.lines.push(line);
    else chunks.push({ code: inCode[index], lines: [line] });
  });
  return chunks
    .map((chunk) => (chunk.code ? chunk.lines.join('\n') : transform(chunk.lines.join('\n'))))
    .join('\n');
}
