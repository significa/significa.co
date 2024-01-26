<script lang="ts">
  import type { ClientLogoStoryblok } from '$types/bloks';
  import { theme } from '$lib/stores/theme';
  import { getImageAttributes } from '$lib/utils/cms';

  export let clients: ClientLogoStoryblok[];
</script>

<div class="flex flex-wrap justify-center gap-12 p-6">
  {#each clients as client}
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
