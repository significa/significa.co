<script lang="ts">
  import CodeBlock from '$components/code-block.svelte';
  import type { RichtextCodeBlockStoryblok } from '$types/bloks';

  export let block: RichtextCodeBlockStoryblok;
</script>

<CodeBlock
  class="not-rich-text my-8 md:my-12"
  code={block.code || ''}
  language={block.language || 'javascript'}
  lineNumbers={!!block.line_numbers}
  lineNumbersStartAt={block.line_numbers_start}
  lineHighlight={block.highlighted_lines}
/>
