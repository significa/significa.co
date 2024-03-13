<script lang="ts">
  import PhysicsSection from '$components/physics-section.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { PhysicsStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let block: PhysicsStoryblok;
</script>

<section
  class={clsx(block.variant === 'section' && 'mt-16 border-y lg:mt-20')}
  use:storyblokEditable={block}
>
  {#if block.variant === 'hero'}
    <div class="container relative isolate mx-auto">
      <div class="absolute top-0 z-10 px-container pt-10 md:pt-14 lg:pt-20">
        <h1 class="max-w-2xl text-7xl">{block.hero_title}</h1>
      </div>
    </div>
  {/if}

  {#if block.variant === 'section'}
    <div class="container mx-auto px-container">
      <div class="md:flex">
        <div class="flex-1 pt-10 md:pt-14 lg:pt-20">
          <h3 class="text-5xl text-foreground-secondary">{block.section_title1}</h3>
          <p class="text-5xl">{block.section_title2}</p>

          <p class="mt-4 max-w-md text-2xl text-foreground-secondary">
            {block.section_description}
          </p>
          {#if block.cta_link && block.cta_label}
            {@const { href } = getAnchorFromCmsLink(block.cta_link)}
            <Button class="mt-12" variant="secondary" as="a" {href} arrow>{block.cta_label}</Button>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <div
    class={clsx(
      'container mx-auto',
      block.variant === 'section' ? 'pb-10 md:pb-14 lg:-mb-px lg:pb-px' : 'relative isolate'
    )}
  >
    <PhysicsSection
      style={block.variant === 'hero' && 'height: min(calc(90vh - var(--topnav-height)), 830px);'}
      class={block.variant === 'section' && 'lg:h-[400px]'}
      items={block.physics_blocks}
    />
  </div>
</section>
