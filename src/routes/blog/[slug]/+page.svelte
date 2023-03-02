<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import { startStoryblokBridge } from '$lib/storyblok';

  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import { Tag } from '@significa/svelte-ui';
  import type { PageData } from './$types';

  export let data: PageData;

  startStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));

  const blockWidths: Record<string, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'w-full'
  };
</script>

{#key data.story.uuid}
  <div class="container">
    <header class="max-w-2xl mx-auto mt-8 mb-10 laeding">
      {#if data.story.first_published_at}
        <p class="text-base text-foreground-secondary font-medium">
          {formatDate(new Date(data.story.first_published_at))}
        </p>
      {/if}
      <h1 class="text-5xl">{data.story.name}</h1>
      {#if data.story.tag_list.length}
        <div class="flex flex-wrap gap-2 mt-5">
          {#each data.story.tag_list as tag}
            <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
          {/each}
        </div>
      {/if}
      {#if data.story.content.intro}
        <p class="mt-9 text-2xl font-medium">{data.story.content.intro}</p>
      {/if}
    </header>
    {#if data.story.content.cover?.filename}
      {@const { alt, src, width, height } = getImageAttributes(data.story.content.cover, {
        size: [1440, 0]
      })}
      <img class="rounded-md w-full h-auto" {src} {alt} {width} {height} />
    {/if}
    {#if data.story.content.body}
      <RichText
        class="my-20"
        doc={data.story.content.body}
        getAttributes={(_, block) => ({
          class: `mx-auto ${blockWidths[block?.width || 'narrow']}`
        })}
      />
    {/if}
  </div>
{/key}
