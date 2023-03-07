<script lang="ts">
  import type { RichtextTestimonialStoryblok } from '$types/bloks';
  import clsx from 'clsx';
  import Person from '$components/person.svelte';

  export let block: RichtextTestimonialStoryblok;
</script>

<div class={clsx('not-rich-text py-2 px-4 md:py-4 md:px-8 lg:py-10 lg:px-16', $$restProps.class)}>
  {#if block.testimonial}
    <p class="text-2xl font-semibold leading-tight">
      <span class="bg-border">{block.testimonial}</span>
    </p>
  {/if}
  <Person class="mt-6" name={block.name} position={block.position} photo={block.photo} />
</div>
