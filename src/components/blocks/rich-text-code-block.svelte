<script lang="ts">
  import CodeBlock from '$components/code-block.svelte';
  import type { RichtextCodeBlockStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: RichtextCodeBlockStoryblok;
</script>

<CodeBlock
  class={clsx('not-rich-text my-8 md:my-14', $$restProps.class)}
  code={block.code || ''}
  language={block.language || 'javascript'}
  lineNumbers={!!block.line_numbers}
  lineNumbersStartAt={Number(block.line_numbers_start)}
  lineHighlight={block.highlighted_lines}
/>
