<script lang="ts">
  import { t } from '$lib/i18n';
  import type { ProjectPage } from '$lib/storyblok';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ProjectStoryblok } from '$types/bloks';
  import { Button, CircleButton } from '@significa/svelte-ui';
  import type { ISbStoryData } from '@storyblok/js';
  import clsx from 'clsx';
  import Recognitions from './recognitions.svelte';

  export let project: ISbStoryData<ProjectStoryblok> | ProjectPage;
  export let variant: 'featured' | 'default' = 'default';

  let index = 0;
</script>

<div
  class="group border-b border-border py-12 transition-colors elevated-links @container first:border-t hover:bg-foreground-tertiary/10"
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
          <h3 class="text-5xl text-foreground-secondary">
            {project.name}
          </h3>
          <p class={clsx('text-5xl', variant === 'default' ? 'max-w-lg' : 'max-w-3xl')}>
            {project.content.tagline}
          </p>
        </a>
        {#if project.content.recognitions?.length}
          <div class="mt-6">
            <Recognitions recognitions={project.content.recognitions} />
          </div>
        {/if}
      </div>
      <Button as="a" href={`/projects/${project.slug}`} class="mt-6" variant="secondary" arrow
        >{t('view-project')}</Button
      >
    </div>

    {#if variant === 'featured' && project.content.cover?.filename}
      {@const { src, alt, width, height } = getImageAttributes(project.content.cover)}
      <img
        class="mt-8 h-auto w-full rounded-md bg-background-offset"
        {src}
        {alt}
        {width}
        {height}
      />
    {/if}

    {#if variant === 'default' && project.content.thumbnail.length}
      {@const image = project.content.thumbnail[index]}
      {#if image?.filename}
        {@const { src, alt, width, height } = getImageAttributes(image)}
        <div class="relative mt-8 aspect-[4/3] flex-1 @5xl:mt-0">
          <img
            class="h-full w-full rounded-md bg-background-offset object-cover"
            {src}
            {alt}
            {width}
            {height}
          />
          {#if project.content.thumbnail.length > 1}
            <CircleButton
              class="absolute top-1/2 left-2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              on:click={() => {
                if (index === 0) {
                  index = project.content.thumbnail.length - 1;
                } else {
                  index -= 1;
                }
              }}
              icon="arrow-left"
            />
            <CircleButton
              class="absolute top-1/2 right-2 z-10 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 [@media(hover:none)]:opacity-100"
              on:click={() => {
                if (index === project.content.thumbnail.length - 1) {
                  index = 0;
                } else {
                  index += 1;
                }
              }}
              icon="arrow-right"
            />
          {/if}
        </div>
      {/if}
    {/if}
  </div>
</div>
