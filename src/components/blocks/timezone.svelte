<script lang="ts">
  import Clock from '$components/clock.svelte';
  import { RichTextResolver } from '@storyblok/js';
  import clsx from 'clsx';
  import type { TimezoneStoryblok } from '$types/bloks';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: TimezoneStoryblok;
  const resolver = new RichTextResolver();
</script>

<div use:storyblokEditable={block} class="border-y">
  <div class={clsx('container mx-auto px-container', 'lg:flex lg:items-center')}>
    <!-- Clock -->
    <div class="lg:flex-1 lg:border-r">
      <div class={clsx('pt-12', 'md:pt-20', 'lg:pb-20')}>
        <Clock
          class={clsx(
            'mx-auto w-full px-10',
            'xs:w-96',
            'xl:w-[420px] xl:px-0',
            '2xl:mx-0 2xl:w-[564px]'
          )}
        />
      </div>
    </div>

    <!-- Text -->
    <div
      class={clsx(
        'mt-8 pb-12',
        'md:mt-12 md:pb-20',
        'lg:mt-0 lg:flex lg:flex-1 lg:justify-end lg:pb-0 lg:pl-12'
      )}
    >
      <!-- eslint-disable svelte/no-at-html-tags -->
      <div
        class={clsx(
          'text-xl text-foreground-secondary',
          'xs:text-2xl',
          'lg:max-w-xl',
          'xl:text-3xl',
          '2xl:text-4xl 2xl:font-normal',
          '[&_b]:font-normal [&_b]:text-foreground'
        )}
      >
        {@html resolver.render(block.text)}
      </div>
    </div>
  </div>
</div>
