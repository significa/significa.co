<script lang="ts">
  import RichText from '$components/rich-text.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { intersectionObserver } from '$lib/actions/intersection-observer';
  import type { HandbookPage } from '$lib/storyblok';
  import { getImageAttributes } from '$lib/utils/cms';
  import { slugify } from '$lib/utils/paths';
  import { RichTextResolver } from '@storyblok/js';
  import clsx from 'clsx';

  export let story: HandbookPage;

  const resolver = new RichTextResolver();

  let active: string | undefined;
  const onIntersect = () => {
    const headings = document.querySelectorAll('h2[id], h3[id]');

    /** active heading is the first heading in the viewport OR the last heading above the viewport */
    const activeHeading =
      Array.from(headings).find((heading) => {
        const { top } = heading.getBoundingClientRect();
        return top > 0 && top < window.innerHeight;
      }) ||
      Array.from(headings)
        .reverse()
        .find((heading) => {
          const { top } = heading.getBoundingClientRect();
          return top < 0;
        });

    active = activeHeading?.id;
  };
</script>

<div class="flex items-start">
  <div class="flex-1">
    <header class="container my-10 mx-auto max-w-2xl md:my-14 lg:my-20">
      <h1 class="text-5xl">{story.name}</h1>
      <p class="mt-4 max-w-2xl text-2xl">{story.content.intro}</p>
    </header>

    {#if story.content.cover?.filename}
      {@const { alt, src, width, height } = getImageAttributes(story.content.cover, {
        size: [1440, 0]
      })}
      <div class="container mx-auto mt-10 max-w-4xl">
        <img class="w-full rounded-lg" {src} {alt} {width} {height} />
      </div>
    {/if}

    <div class="container mx-auto max-w-2xl">
      {#if story.content.body}
        <div
          use:drawerLinks
          use:intersectionObserver={{
            querySelectorAll: 'h2[id], h3[id]',
            callback: onIntersect,
            options: { threshold: [1] }
          }}
        >
          <RichText
            class="my-10 md:my-14 lg:my-20"
            doc={story.content.body}
            getAttributes={(section) => {
              if (section.type === 'heading') {
                const heading = resolver.render(section);
                return { id: slugify(heading) };
              }

              return {};
            }}
          />
        </div>
      {/if}
    </div>
  </div>

  <aside class="sticky top-10 mt-10 h-auto w-60">
    <h4 class="mb-4 text-xs uppercase tracking-wider text-foreground-secondary">On this page</h4>
    {#if story.content.body?.type === 'doc' && story.content.body?.content?.length}
      {#each story.content.body.content as section}
        {#if section.type === 'heading' && section.content?.length && section.attrs?.level <= 3}
          {@const content = resolver.render(section)}
          {@const id = slugify(content)}
          <a
            href={'#' + id}
            class={clsx(
              'block border-l border-border py-1 px-3 text-sm',
              active === id
                ? 'border-l-2 border-foreground text-foreground'
                : 'text-foreground-secondary',
              section.attrs?.level === 3 ? 'pl-6' : 'pl-3'
            )}><span class={clsx('block', active === id && '-ml-px')}>{@html content}</span></a
          >
        {/if}
      {/each}
    {/if}
  </aside>
</div>
