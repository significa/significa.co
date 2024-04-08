<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { ClientStoryblok } from '$types/bloks';

  export let block: ClientStoryblok;
</script>

<section use:storyblokEditable={block} class="container mx-auto px-container mb-16 mt-20 lg:my-20">
  <h3 class="text-center text-lg text-foreground-secondary">{block.clients_title}</h3>
  {#if block.clients}
    <div class="flex flex-wrap justify-center gap-12 p-6">
      {#each block.clients as client}
        {#if client.light_mode?.filename && $theme === 'light'}
          {@const { src, alt, width, height } = getImageAttributes(client.light_mode)}
          <img {src} {alt} {width} {height} class="h-auto max-h-9 w-auto object-contain" />
        {/if}

        {#if client.dark_mode?.filename && $theme === 'dark'}
          {@const { src, alt, width, height } = getImageAttributes(client.dark_mode)}
          <img {src} {alt} {width} {height} class="h-auto max-h-9 w-auto object-contain" />
        {/if}
      {/each}
    </div>
  {/if}
</section>
