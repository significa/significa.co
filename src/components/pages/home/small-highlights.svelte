<script lang="ts">
  import { sanitizeSlug } from '$lib/utils/paths';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';

  export let highlights: HomePageStoryblok['small_highlights'] = [];
</script>

<div class="-mx-2 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  {#each highlights || [] as highlight}
    <a
      href={sanitizeSlug(highlight.full_slug)}
      class="flex gap-4 rounded-2xl p-2 hover:bg-background-offset"
    >
      <!-- Image -->
      <div class="flex-shrink-0">
        {#if highlight.content.thumbnail?.length && highlight.content.thumbnail[0]?.filename}
          {@const { src, alt } = getImageAttributes(highlight.content.thumbnail[0], {
            size: [200, 160]
          })}
          <img
            class="h-18 w-24 rounded-lg bg-background-offset object-cover object-center"
            {src}
            {alt}
          />
        {:else if highlight.content.cover?.filename}
          {@const { src, alt } = getImageAttributes(highlight.content.cover, {
            size: [200, 160]
          })}
          <img
            class="h-18 w-24 rounded-lg bg-background-offset object-cover object-center"
            {src}
            {alt}
          />
        {/if}
      </div>

      <div class="flex flex-col py-1">
        <div class="flex-1">
          <h3 class="line-clamp-2 max-w-sm text-lg/tight font-medium">
            {#if highlight.content.component === 'handbook' || highlight.content.component === 'project'}
              {highlight.name}{highlight.content.tagline ? ` — ${highlight.content.tagline}` : ''}
            {:else}
              {highlight.name}
            {/if}
          </h3>
        </div>
        <p class="text-sm text-foreground-secondary">
          {#if highlight.content.component === 'blog-post'}
            From our blog
          {:else if highlight.content.component === 'handbook'}
            From the handbook
          {:else if highlight.content.component === 'career'}
            Career opening
          {:else if highlight.content.component === 'project'}
            From our projects
          {/if}
        </p>
      </div>
    </a>
  {/each}
</div>
