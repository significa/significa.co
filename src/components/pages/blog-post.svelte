<script lang="ts">
  import { richTextBlockWidths } from '$lib/constants';
  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import type { BlogPostStoryblok } from '$types/bloks';
  import { Tag } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import RichText from '$components/rich-text.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';

  export let story: ISbStoryData<BlogPostStoryblok>;
</script>

<div use:drawerLinks class="container">
  <header class="max-w-2xl mx-auto mt-8 mb-10">
    {#if story.first_published_at}
      <p class="text-base text-foreground-secondary font-medium">
        {formatDate(new Date(story.first_published_at || story.published_at || story.created_at), {
          dateStyle: 'medium'
        })}
      </p>
    {/if}
    <h1 class="text-5xl">{story.name}</h1>
    {#if story.tag_list.length}
      <div class="flex flex-wrap gap-2 mt-5">
        {#each story.tag_list as tag}
          <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
        {/each}
      </div>
    {/if}
    {#if story.content.intro}
      <p class="mt-9 text-2xl font-medium">{story.content.intro}</p>
    {/if}
  </header>
  {#if story.content.cover?.filename}
    {@const { alt, src, width, height } = getImageAttributes(story.content.cover, {
      size: [1440, 0]
    })}
    <img class="max-w-6xl mx-auto rounded-md w-full h-auto" {src} {alt} {width} {height} />
  {/if}
  {#if story.content.body}
    <RichText
      class="my-10 md:my-15 lg:my-20"
      doc={story.content.body}
      getAttributes={(_, block) => ({
        class: `mx-auto ${richTextBlockWidths[block?.width || 'narrow']}`
      })}
    />
  {/if}
</div>
