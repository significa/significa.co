<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { RichtextTestimonialStoryblok } from '$types/bloks';

  export let block: RichtextTestimonialStoryblok;
</script>

<div class="not-rich-text py-2 px-4 md:py-4 md:px-8 lg:py-10 lg:px-16">
  {#if block.testimonial}
    <p class="text-2xl font-semibold leading-tight">
      <span class="bg-border">{block.testimonial}</span>
    </p>
  {/if}
  <div class="mt-6 flex gap-3 items-center">
    {#if block.photo?.filename}
      {@const { src, alt, width, height } = getImageAttributes(block.photo, { size: [100, 100] })}
      <img class="rounded-full w-10 h-10 object-cover object-center" {src} {alt} {width} {height} />
    {/if}
    <div>
      {#if block.name}
        <p class="text-base leading-none font-semibold">{block.name}</p>
      {/if}
      {#if block.position}
        <p class="mt-1.5 text-base leading-none font-semibold text-foreground-secondary">
          {block.position}
        </p>
      {/if}
    </div>
  </div>
</div>
