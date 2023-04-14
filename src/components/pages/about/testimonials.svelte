<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { MultilinkStoryblok, RichtextTestimonialStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import RichTextTestimonial from '$components/blocks/rich-text-testimonial.svelte';
  import BalloonRound from './stickers/balloon-round.svelte';
  import BalloonRectangle from './stickers/balloon-rectangle.svelte';
  import Combo from './stickers/combo.svelte';
  import clsx from 'clsx';

  export let firstTitle: string | undefined = undefined;
  export let secondTitle: string | undefined = undefined;
  export let ctaLink: MultilinkStoryblok | undefined = undefined;
  export let ctaLabel: string | undefined = undefined;
  export let testimonials: RichtextTestimonialStoryblok[] | undefined = undefined;

  let scroll: number;
  let testimonialsSection: HTMLElement;
  $: value = Math.max(scroll - testimonialsSection?.offsetTop, 0);

  const speedFactors = [0, -0.2, 0.14, 0.01, -0.04];
  const alignments = ['start', 'end', 'start', 'end', 'start'];
</script>

<svelte:window bind:scrollY={scroll} />

<section class="border-t" bind:this={testimonialsSection}>
  <div class="container mx-auto px-container pt-16 lg:pt-20">
    <div class="mx-auto flex max-w-xl flex-col items-center">
      <h3 class="text-center text-5xl text-foreground-secondary">{firstTitle}</h3>
      <p class="text-center text-5xl">{secondTitle}</p>

      {#if ctaLink}
        {@const { href } = getAnchorFromCmsLink(ctaLink)}
        <Button as="a" {href} arrow size="lg" class="mx-auto mt-6">
          {ctaLabel}
        </Button>
      {/if}
    </div>

    <div class="hidden lg:block">
      {#if testimonials}
        {#each testimonials.slice(0, 5) as testimonial, i}
          <div class="flex w-[100%] flex-col">
            <div
              style:align-self={alignments[i]}
              class={clsx(
                'flex xl:flex-row',
                i === 2 && 'lg:flex-col-reverse',
                i === 1 && 'lg:flex-col'
              )}
            >
              {#if i === 1}
                <BalloonRound class="hidden shrink-0 -translate-y-20 self-start lg:block" />
              {/if}
              {#if i === 2}
                <BalloonRectangle class="hidden shrink-0 -translate-y-2 self-end lg:block" />
              {/if}
              <div style:transform="translateY({-value * speedFactors[i]}px)">
                <RichTextTestimonial
                  block={testimonial}
                  class={clsx(
                    'max-w-lg xl:max-w-xl',
                    i === 3 && 'xl:-translate-x-[20%]',
                    i === 4 && 'xl:translate-x-[20%]'
                  )}
                />
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <div class="lg:hidden">
      <div class="mt-10 flex justify-center px-4">
        <Combo />
      </div>

      {#if testimonials}
        <div class="mt-10 flex flex-col gap-12 [&>*]:p-0">
          {#each testimonials.slice(0, 5) as testimonial}
            <RichTextTestimonial block={testimonial} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
