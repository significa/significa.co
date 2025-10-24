<script lang="ts">
  import { clsx } from 'clsx';
  import type { HTMLAttributes } from 'svelte/elements';
  import { sanitizeSlug } from '$lib/utils/paths';

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    doc: any; // WordPress content (can be HTML string or structured content)
    getAttributes?: (section: any, block?: any) => Partial<Record<string, string>>;
    as?: string;
    patternMatchReplace?: [string, string][];
  };

  let className: $$Props['class'] = undefined;
  export { className as class };
  export let doc: $$Props['doc'];
  export let getAttributes: $$Props['getAttributes'] = () => ({});
  export let as: $$Props['as'] = 'div';
  export let patternMatchReplace: $$Props['patternMatchReplace'] = undefined;

  // WordPress content is typically just HTML
  // If doc is a string, render it directly
  // If it's an object with rendered content, use that
  const getContent = (content: any): string => {
    if (typeof content === 'string') {
      return content;
    }
    if (content && typeof content === 'object') {
      // WordPress REST API format
      if (content.rendered) {
        return content.rendered;
      }
      // Fallback: stringify
      return String(content);
    }
    return '';
  };

  let htmlContent = getContent(doc);

  // Apply pattern replacements if any
  if (patternMatchReplace) {
    patternMatchReplace.forEach((r) => {
      htmlContent = htmlContent.replace(new RegExp(r[0], 'g'), r[1]);
    });
  }

  // Sanitize links in the HTML
  // This is a basic implementation - you might want to make it more robust
  htmlContent = htmlContent.replace(/href="([^"]*)"/g, (match, url) => {
    return `href="${sanitizeSlug(url)}"`;
  });
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:element this={as} class={clsx('group rich-text @container', className)} {...$$restProps}>
  {@html htmlContent}
</svelte:element>
