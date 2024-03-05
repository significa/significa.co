<script lang="ts">
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { t } from '$lib/i18n';
  import { getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { ProjectStoryblok } from '$types/bloks';
  import { Button, CircleButton } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import clsx from 'clsx';
  import Recognitions from './recognitions.svelte';
  import type { ProjectPage } from '$lib/content';
  import { page } from '$app/stores';

  export let project: ISbStoryData<ProjectStoryblok> | ProjectPage;
  export let variant: 'featured' | 'default' = 'default';
  export let as: 'h2' | 'h3' = 'h3';

  let index = 0;
  let video: HTMLVideoElement;

  const onMouseEnter = () => {
    if (video) video.play();
  };

  const onMouseLeave = () => {
    if (video) video.pause();
  };

  $: recognitions = $page.data.awards.filter((aw) => aw.content.project.id === project.id);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  class="group border-b py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10"
>
  <div class={clsx('container mx-auto px-container', variant === 'default' && '@5xl:flex')}>
    <div
      class={clsx(
        variant === 'featured' && 'items-end justify-between @5xl:flex',
        variant === 'default' && 'flex flex-1 flex-col items-start justify-between'
      )}
    >
      <div class="mr-6">
        <a class="elevated-link" href={`/projects/${project.slug}`}>
          <svelte:element this={as} class="text-5xl text-foreground-secondary">
            {project.name}
          </svelte:element>
          <p class={clsx('text-5xl', variant === 'default' ? 'max-w-lg' : 'max-w-3xl')}>
            {project.content.tagline}
          </p>
        </a>
        {#if recognitions?.length}
          <div
            class={clsx(
              'mt-6 grid grid-cols-2 grid-rows-3 grid-flow-col gap-4',
              variant === 'featured' && '@5xl:grid-rows-1'
            )}
          >
            <Recognitions as={as === 'h2' ? 'h3' : 'h4'} {recognitions} />
          </div>
        {/if}
      </div>
      <Button as="a" href={`/projects/${project.slug}`} class="mt-6" variant="secondary" arrow
        >{t('view-project')}</Button
      >
    </div>

    {#if variant === 'featured'}
      {#if project.content.reel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(project.content.reel.filename))}
        <video
          bind:this={video}
          class="pointer-events-none mt-8 aspect-video h-auto w-full rounded-md bg-background-offset"
          muted
          playsinline
          autoplay
          loop
          src={project.content.reel.filename}
        />
      {:else if project.content.cover?.filename}
        {@const { src, alt, width, height } = getImageAttributes(project.content.cover, {
          size: [1440 * 2, 0]
        })}
        <img
          class="mt-8 h-auto w-full rounded-md bg-background-offset"
          {src}
          {alt}
          {width}
          {height}
        />
      {/if}
    {/if}

    {#if variant === 'default' && project.content.thumbnail.length}
      {@const image = project.content.thumbnail[index]}
      {#if image?.filename}
        {@const { src, alt, width, height } = getImageAttributes(image, {
          size: [720 * 2, 540 * 2]
        })}
        <div class="pointer-events-none relative mt-8 aspect-[4/3] flex-1 @5xl:mt-0">
          <img
            class="h-full w-full rounded-md bg-background-offset object-cover"
            {src}
            {alt}
            {width}
            {height}
          />
          {#if project.content.thumbnail.length > 1}
            <CircleButton
              alt="Previous image"
              data-theme="light"
              class="pointer-events-auto absolute left-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              on:mouseenter={() => {
                // preload image
                const nextIndex = index === 0 ? project.content.thumbnail.length - 1 : index - 1;
                const nextImage = project.content.thumbnail[nextIndex];
                if (nextImage?.filename) {
                  const img = new Image();
                  img.src = getImageAttributes(nextImage, {
                    size: [720 * 2, 540 * 2]
                  }).src;
                }
              }}
              on:click={() => {
                index = index === 0 ? project.content.thumbnail.length - 1 : index - 1;
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
                const nextIndex = index === project.content.thumbnail.length - 1 ? 0 : index + 1;
                const nextImage = project.content.thumbnail[nextIndex];
                if (nextImage?.filename) {
                  const img = new Image();
                  img.src = getImageAttributes(nextImage, {
                    size: [720 * 2, 540 * 2]
                  }).src;
                }
              }}
              on:click={() => {
                index = index === project.content.thumbnail.length - 1 ? 0 : index + 1;
              }}
              icon="arrow-right"
              aria-label={t('a11y.gallery-right')}
            />
          {/if}
        </div>
      {/if}
    {/if}
  </div>
</div>
