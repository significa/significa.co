<script lang="ts">
  import CodeBlock from '$components/code-block.svelte';
  import type { RichtextCodeBlockStoryblok } from '$types/bloks';

  export let block: RichtextCodeBlockStoryblok;
</script>

<CodeBlock
  class="rich-text-code-block"
  code={block.code || ''}
  language={block.language || 'javascript'}
  lineNumbers={!!block.line_numbers}
  lineNumbersStartAt={block.line_numbers_start}
  lineHighlight={block.highlighted_lines}
/>

<style lang="postcss">
  :global(.rich-text-code-block) {
    @media (--md) {
      margin-inline: -2rem;
    }
  }
</style>
