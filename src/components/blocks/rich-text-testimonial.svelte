<script lang="ts">
  import type { RichtextTestimonialStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import Person from '$components/person.svelte';

  export let variant: 'default' | 'motion' = 'motion';
  export let block: RichtextTestimonialStoryblok;
</script>

<div
  class={clsx(
    variant === 'motion' ? 'px-4 py-2 md:px-8 md:py-4 lg:px-16 lg:py-10' : '',
    'not-rich-text',
    $$restProps.class
  )}
>
  {#if block.testimonial}
    <p class="py-4 text-2xl/7 font-semibold md:py-0">
      <span class={clsx(variant === 'motion' ? 'bg-border' : '')}
        >&ldquo;{block.testimonial}&rdquo;</span
      >
    </p>
  {/if}
  <Person class="mt-6" name={block.name} position={block.position} photo={block?.photo} />
</div>
