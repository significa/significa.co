import type { JsonLdGraph } from './types';

/**
 * Serialises a graph for an inline `<script type="application/ld+json">`.
 * `<`, `>` and `&` are escaped as unicode sequences so no CMS content can close
 * the script tag or open an HTML comment. U+2028/U+2029 are escaped for old
 * JavaScript parsers. The output is still valid JSON.
 */
export function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** The full script tag, for `{@html}` in Svelte. */
export function jsonLdScriptTag(graph: JsonLdGraph): string {
  return `<script type="application/ld+json">${serializeJsonLd(graph)}</` + `script>`;
}
