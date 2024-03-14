<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { TestimonialsStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import RichTextTestimonial from '$components/blocks/rich-text-testimonial.svelte';
  import BalloonRound from '../illustrations/stickers/balloon-round.svelte';
  import BalloonRectangle from '../illustrations/stickers/balloon-rectangle.svelte';
  import Combo from '../illustrations/stickers/combo.svelte';
  import clsx from 'clsx';
  import People from '../illustrations/stickers/people.svelte';
  import FriedEgg from '../illustrations/stickers/fried-egg.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  export let block: TestimonialsStoryblok;

  let scroll: number;
  let testimonialsSection: HTMLElement;
  export let hasBorder: boolean | undefined = true;
  $: value = Math.max(scroll - testimonialsSection?.offsetTop, 0);

  const speedFactors = [0, -0.2, 0.1, -0.13, 0.02];
  const alignments = ['start', 'end', 'start', 'end', 'start'];
</script>

<svelte:window bind:scrollY={scroll} />

<section
  use:storyblokEditable={block}
  class={clsx(hasBorder && 'border-t')}
  bind:this={testimonialsSection}
>
  <div class="container mx-auto px-container pt-16 lg:pt-20">
    <div class="mx-auto flex max-w-xl flex-col items-center">
      {#if block.testimonials_title1}
        <svelte:element this={block.size} class="text-center text-5xl text-foreground-secondary"
          >{block.testimonials_title1}</svelte:element
        >
      {/if}
      {#if block.testimonials_title2}
        <p class="text-center text-5xl">{block.testimonials_title2}</p>
      {/if}
      {#if block.testimonials_cta_link}
        {@const { href } = getAnchorFromCmsLink(block.testimonials_cta_link)}
        <Button as="a" {href} arrow size="md" class="mx-auto mt-6">
          {block.testimonials_cta_label}
        </Button>
      {/if}
    </div>

    <div class="hidden lg:block">
      {#if block.testimonials}
        {#each block.testimonials.slice(0, 5) as testimonial, i}
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
                {#if block.variant === 'one'}
                  <BalloonRectangle
                    class="hidden shrink-0 -translate-y-2 self-end drop-shadow-md lg:block"
                  />
                {:else if block.variant === 'two'}
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
              {#if i === 2 && block.variant === 'two'}
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
        <Combo variant={block.variant} />
      </div>

      {#if block.testimonials}
        <div class="mt-10 flex flex-col gap-12 [&>*]:p-0">
          {#each block.testimonials.slice(0, 5) as testimonial}
            <RichTextTestimonial block={testimonial} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
