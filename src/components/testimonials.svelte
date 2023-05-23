<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { MultilinkStoryblok, RichtextTestimonialStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import RichTextTestimonial from '$components/blocks/rich-text-testimonial.svelte';
  import BalloonRound from './illustrations/stickers/balloon-round.svelte';
  import BalloonRectangle from './illustrations/stickers/balloon-rectangle.svelte';
  import Combo from './illustrations/stickers/combo.svelte';
  import clsx from 'clsx';
  import People from './illustrations/stickers/people.svelte';
  import FriedEgg from './illustrations/stickers/fried-egg.svelte';
  import { TrackingEvent, track } from '$lib/track';
  import { page } from '$app/stores';
  import { drawer } from '$lib/stores/drawer';

  export let variant: 'one' | 'two' = 'one';
  export let as: 'h2' | 'h3' = 'h3';
  export let firstTitle: string | undefined = undefined;
  export let secondTitle: string | undefined = undefined;
  export let ctaLink: MultilinkStoryblok | undefined = undefined;
  export let ctaLabel: string | undefined = undefined;
  export let testimonials: RichtextTestimonialStoryblok[] | undefined = undefined;

  let scroll: number;
  let testimonialsSection: HTMLElement;
  $: value = Math.max(scroll - testimonialsSection?.offsetTop, 0);

  const speedFactors = [0, -0.2, 0.1, -0.13, 0.02];
  const alignments = ['start', 'end', 'start', 'end', 'start'];
</script>

<svelte:window bind:scrollY={scroll} />

<section class="border-t" bind:this={testimonialsSection}>
  <div class="container mx-auto px-container pt-16 lg:pt-20">
    <div class="mx-auto flex max-w-xl flex-col items-center">
      <svelte:element this={as} class="text-center text-5xl text-foreground-secondary"
        >{firstTitle}</svelte:element
      >
      <p class="text-center text-5xl">{secondTitle}</p>

      {#if ctaLink}
        {@const { href } = getAnchorFromCmsLink(ctaLink)}
        <Button
          as="a"
          {href}
          on:click={() => {
            track(TrackingEvent.CTA_CLICK, {
              props: { to: href, path: $drawer || $page.url.pathname, section: firstTitle }
            });
          }}
          arrow
          size="md"
          class="mx-auto mt-6"
        >
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
                <BalloonRound
                  class="mr-12 hidden shrink-0 -translate-y-20 self-start drop-shadow-md lg:block"
                />
              {/if}
              {#if i === 2}
                {#if variant === 'one'}
                  <BalloonRectangle
                    class="hidden shrink-0 -translate-y-2 self-end drop-shadow-md lg:block"
                  />
                {:else if variant === 'two'}
                  <People
                    class="ml-20 hidden shrink-0 -translate-y-2 self-end drop-shadow-md lg:block 2xl:mr-20"
                  />
                {/if}
              {/if}
              <div style:transform="translateY({-value * speedFactors[i]}px)">
                <RichTextTestimonial
                  block={testimonial}
                  class={clsx(
                    'max-w-lg 2xl:max-w-xl',
                    i === 3 && 'xl:-translate-x-[20%]',
                    i === 4 && 'xl:translate-x-[20%]'
                  )}
                />
              </div>
              {#if i === 2 && variant === 'two'}
                <FriedEgg
                  class="-ml-20 hidden shrink-0 -translate-y-2 self-end drop-shadow-md 2xl:block"
                  style="transform: translateY({-value * -0.07}px)"
                />
              {/if}
            </div>
          </div>
        {/each}
      {/if}
    </div>

    <div class="lg:hidden">
      <div class="mt-10 flex justify-center px-4">
        <Combo {variant} />
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
