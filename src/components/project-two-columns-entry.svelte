<script lang="ts">
  import { t } from '$lib/i18n';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { ProjectDetailedEntryStoryblok } from '$types/bloks';
  import { Button, CircleButton } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let project: ProjectDetailedEntryStoryblok;
  export let as: 'h2' | 'h3' = 'h3';

  let index = 0;
</script>

<div class="group py-8 transition-colors elevated-links @container">
  {#if project.thumbnail.length}
    {@const image = project.thumbnail[index]}
    {#if image?.filename}
      {@const { src, alt, width, height } = getImageAttributes(image, {
        size: [720 * 2, 540 * 2]
      })}
      <div class="pointer-events-none relative aspect-[4/3] flex-1 @5xl:mt-0">
        <img
          class="h-full w-full rounded-md bg-background-offset object-cover"
          {src}
          {alt}
          {width}
          {height}
        />
        {#if project.thumbnail.length > 1}
          <CircleButton
            alt="Previous image"
            data-theme="light"
            class="pointer-events-auto absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            on:mouseenter={() => {
              // preload image
              const nextIndex = index === 0 ? project.thumbnail.length - 1 : index - 1;
              const nextImage = project.thumbnail[nextIndex];
              if (nextImage?.filename) {
                const img = new Image();
                img.src = getImageAttributes(nextImage, {
                  size: [720 * 2, 540 * 2]
                }).src;
              }
            }}
            on:click={() => {
              index = index === 0 ? project.thumbnail.length - 1 : index - 1;
            }}
            icon="arrow-left"
            aria-label={t('a11y.gallery-left')}
          />
          <CircleButton
            alt="Next image"
            data-theme="light"
            class="pointer-events-auto absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            on:mouseenter={() => {
              // preload image
              const nextIndex = index === project.thumbnail.length - 1 ? 0 : index + 1;
              const nextImage = project.thumbnail[nextIndex];
              if (nextImage?.filename) {
                const img = new Image();
                img.src = getImageAttributes(nextImage, {
                  size: [720 * 2, 540 * 2]
                }).src;
              }
            }}
            on:click={() => {
              index = index === project.thumbnail.length - 1 ? 0 : index + 1;
            }}
            icon="arrow-right"
            aria-label={t('a11y.gallery-right')}
          />
        {/if}
      </div>
    {/if}
  {/if}
  <div class={clsx('flex flex-1 flex-col items-start justify-between')}>
    <div class="pt-8 pb-6">
      <svelte:element this={as} class="text-4xl font-semibold text-foreground-secondary">
        {project.name}
      </svelte:element>
      <p class={clsx('text-4xl')}>
        {project.tagline}
      </p>
    </div>
    {#if project.link_text}
      {@const { href, target } = getAnchorFromCmsLink(project.link)}
      <Button {target} as="a" {href} variant="secondary" arrow>{project.link_text}</Button>
    {/if}
  </div>
</div>
