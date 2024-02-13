<script lang="ts">
  import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
  import { slugs } from '$lib/stores/handbook-slugs';
  import { onDestroy } from 'svelte';
  import { annotationsToCSS } from '$lib/utils/notion';

  export let richText: Array<RichTextItemResponse>;

  let dict: {
    [key: string]: string;
  };

  const unsubscribe = slugs.subscribe((value) => (dict = value));

  onDestroy(unsubscribe);
</script>

{#each richText as textPart}
  {#if textPart.type === 'text'}
    {#if textPart.href}
      <a
        class={annotationsToCSS(textPart.annotations)}
        href={textPart.href}
        target="_blank"
        rel="noopener noreferrer">{textPart.plain_text}</a
      >
    {:else}
      <span class={annotationsToCSS(textPart.annotations)}>{textPart.plain_text}</span>
    {/if}
  {:else if textPart.type === 'mention'}
    {#if textPart.mention.type === 'page'}
      {#if dict[textPart.mention.page.id]}
        <a class={annotationsToCSS(textPart.annotations)} href={`${dict[textPart.mention.page.id]}`}
          >{textPart.plain_text}</a
        >
      {:else}
        <a
          class={annotationsToCSS(textPart.annotations)}
          href={textPart.href}
          target="_blank"
          rel="noopener noreferrer">{textPart.plain_text}</a
        >
      {/if}
    {/if}
  {/if}
{/each}
