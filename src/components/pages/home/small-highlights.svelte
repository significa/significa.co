<script lang="ts">
  import { sanitizeSlug } from '$lib/utils/paths';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';
  import { twMerge } from 'tailwind-merge';

  export let highlights: HomePageStoryblok['small_highlights'] = [];
  let hover: HTMLDivElement;

  let className: string | undefined = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={twMerge('relative -mx-2 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4', className)}
  on:mouseleave={() => {
    hover.style.opacity = '0';
    hover.style.transform = 'scale(0)';
  }}
>
  <div
    aria-hidden="true"
    class="absolute -z-10 rounded-xl bg-background-offset transition-all ease-smooth"
    bind:this={hover}
  />
  {#each highlights || [] as highlight}
    <a
      href={sanitizeSlug(highlight.full_slug)}
      class="flex gap-4 rounded-xl p-2"
      on:focus={() => {
        // noop
      }}
      on:mouseenter={(e) => {
        hover.style.opacity = '1';
        hover.style.transform = 'scale(1)';
        hover.style.left = `${e.currentTarget.offsetLeft}px`;
        hover.style.top = `${e.currentTarget.offsetTop}px`;
        hover.style.width = `${e.currentTarget.offsetWidth}px`;
        hover.style.height = `${e.currentTarget.offsetHeight}px`;
      }}
    >
      <!-- Image -->
      {#if highlight.content.thumbnail?.length && highlight.content.thumbnail[0]?.filename}
        {@const { src, alt, width, height } = getImageAttributes(highlight.content.thumbnail[0], {
          size: [200, 160]
        })}
        <img
          class="h-18 w-24 flex-shrink-0 rounded-md bg-foreground-tertiary/10 object-cover object-center"
          {src}
          {alt}
          {width}
          {height}
        />
      {:else if highlight.content.cover?.filename}
        {@const { src, alt, width, height } = getImageAttributes(highlight.content.cover, {
          size: [200, 160]
        })}
        <img
          class="h-18 w-24 flex-shrink-0 rounded-md bg-background-offset object-cover object-center"
          {src}
          {alt}
          {width}
          {height}
        />
      {/if}

      <div class="flex flex-col py-1">
        <div class="flex-1">
          <p class="line-clamp-2 max-w-sm text-lg/tight font-medium">
            {#if highlight.content.component === 'handbook' || highlight.content.component === 'project'}
              {highlight.name}{highlight.content.tagline ? ` ${highlight.content.tagline}` : ''}
            {:else}
              {highlight.name}
            {/if}
          </p>
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
