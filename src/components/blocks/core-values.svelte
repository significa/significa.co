<script lang="ts">
  import ValueIllustrations from '$components/pages/about/value-illustrations.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { CoreValuesStoryblok } from '$types/bloks';

  export let block: CoreValuesStoryblok;
</script>

<section class="border-t">
  <div
    use:storyblokEditable={block}
    class="container mx-auto flex flex-col gap-8 px-container pt-8 lg:flex-row lg:justify-between lg:pt-0"
  >
    <div class="flex flex-col justify-between gap-6 lg:max-w-xl lg:py-12">
      <div>
        <h2 class="text-5xl text-foreground-secondary">{block.values_title1}</h2>
        <p class="text-5xl">{block.values_title2}</p>
      </div>

      <p class="text-2xl text-foreground-secondary lg:max-w-md">{block.values_description}</p>
    </div>

    {#if block.values}
      <div class="lg:max-w-xl">
        {#each block.values as value}
          <div
            class="flex flex-col items-start gap-4 border-t py-8 first:border-none lg:flex-row lg:items-center lg:gap-8 lg:py-12"
          >
            <ValueIllustrations
              variant={value.illustration}
              class="block shrink-0 drop-shadow-md"
            />
            <div>
              <h3 class="text-2xl font-semibold">{value.title}</h3>
              <p class="text-2xl text-foreground-secondary">{value.description}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>
