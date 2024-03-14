<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { DeliverablesStoryblok } from '$types/bloks';

  export let block: DeliverablesStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 pb-4 md:mt-14 lg:mt-28">
  <div
    class="container mx-auto mb-6 flex flex-col gap-6 px-container pt-8 lg:mb-12 lg:pt-12 xl:flex-row xl:gap-4"
  >
    <div class="mb-8 mr-52 xl:sticky xl:top-8 xl:max-w-xl xl:self-start">
      <h3 class="text-5xl text-foreground-secondary">{block.title}</h3>
      <h3 class="text-5xl">{block.subtitle}</h3>
    </div>
    {#if block.deliverables}
      <div class="grid grid-cols-1 gap-x-40 gap-y-16 md:grid-cols-2">
        {#each block.deliverables as deliverables}
          <div class="flex flex-col items-start xl:max-w-xs">
            {#if deliverables.icon?.filename}
              {@const { src, alt } = getImageAttributes(deliverables.icon)}
              <img {src} {alt} class="max-h-12 object-contain drop-shadow-md" />
            {/if}
            <div class="mt-4 text-2xl font-semibold">{deliverables.deliverable}</div>
            <div class="text-2xl font-semibold text-foreground-secondary">
              {deliverables.description}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
