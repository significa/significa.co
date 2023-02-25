<script lang="ts">
  import ColumnContainer from '$components/column-container.svelte';
  import RichText from '$components/rich-text.svelte';
  import { startStoryblokBridge } from '$lib/storyblok';

  import { getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import { Tag } from '@significa/svelte-ui';
  import type { PageData } from './$types';

  export let data: PageData;

  startStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
</script>

{#key data.story.uuid}
  <ColumnContainer>
    <header>
      {#if data.story.first_published_at}
        <p class="published-date">{formatDate(new Date(data.story.first_published_at))}</p>
      {/if}
      <h1>{data.story.name}</h1>
      {#if data.story.tag_list.length}
        <div class="tags">
          {#each data.story.tag_list as tag}
            <Tag href="/blog?t={encodeURIComponent(tag)}" label={tag} />
          {/each}
        </div>
      {/if}
      {#if data.story.content.intro}
        <p class="intro">{data.story.content.intro}</p>
      {/if}
    </header>
    {#if data.story.content.cover?.filename}
      {@const { alt, src, width, height } = getImageAttributes(data.story.content.cover, {
        size: [1440, 0]
      })}
      <img data-column-width="full" class="cover" {src} {alt} {width} {height} />
    {/if}
    {#if data.story.content.body}
      <div class="body">
        <RichText class="rich-text" doc={data.story.content.body} />
      </div>
    {/if}
  </ColumnContainer>
{/key}

<style lang="postcss">
  header {
    margin-top: 32px;
    margin-bottom: 40px;
  }

  .published-date {
    font-size: var(--font-size-md);
    line-height: var(--line-height-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-foreground-secondary);
  }

  h1 {
    font-size: var(--font-size-5xl);
    line-height: var(--line-height-5xl);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-tight);

    margin: 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    margin-top: 20px;
  }

  .intro {
    margin-top: 36px;

    font-size: var(--font-size-2xl);
    line-height: var(--line-height-2xl);
    font-weight: var(--font-weight-medium);
  }

  .cover {
    display: block;
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-md);
  }

  .body {
    display: contents;

    &:before,
    &:after {
      content: '';
      display: block;
      grid-column: 1 / -1;
      height: 80px;
    }
  }
</style>
