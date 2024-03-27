<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { PartnersStoryblok } from '$types/bloks';

  export let block: PartnersStoryblok;
</script>

<section
  use:storyblokEditable={block}
  class="py-20 mx-auto container px-container flex flex-col items-center"
>
  <p class="text-xs text-foreground-secondary">{block.title}</p>
  {#if block.partners}
    <div class="flex flex-wrap justify-center gap-8 mt-2">
      {#each block.partners as partner}
        {#if partner.light_mode?.filename && $theme === 'light'}
          {@const { src, alt, width, height } = getImageAttributes(partner.light_mode)}
          <img {src} {alt} {width} {height} class="h-auto max-h-9 w-auto object-contain" />
        {/if}

        {#if partner.dark_mode?.filename && $theme === 'dark'}
          {@const { src, alt, width, height } = getImageAttributes(partner.dark_mode)}
          <img {src} {alt} {width} {height} class="h-auto max-h-9 w-auto object-contain" />
        {/if}
      {/each}
    </div>
  {/if}
</section>
