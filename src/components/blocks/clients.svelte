<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { ClientStoryblok } from '$types/bloks';

  export let block: ClientStoryblok;
</script>

<section use:storyblokEditable={block} class="container mx-auto mb-16 mt-20 px-container lg:my-20">
  <h3 class="text-center text-lg text-foreground-secondary">{block.clients_title}</h3>
  {#if block.clients}
    <div class="flex flex-wrap justify-center gap-12 p-6">
      {#each block.clients as client, i}
        {#if client.light_mode?.filename}
          {@const { src, alt, width, height } = getImageAttributes(client.light_mode)}
          {#if block.links && block.links[i]?.link}
            {@const { href, target, rel } = getAnchorFromCmsLink(block.links[i].link)}
            <a {href} {target} {rel}>
              <img
                {src}
                {alt}
                {width}
                {height}
                class="h-auto max-h-9 w-auto object-contain dark:hidden"
              />
            </a>
          {:else}
            <img
              {src}
              {alt}
              {width}
              {height}
              class="h-auto max-h-9 w-auto object-contain dark:hidden"
            />
          {/if}
        {/if}

        {#if client.dark_mode?.filename}
          {@const { src, alt, width, height } = getImageAttributes(client.dark_mode)}
          {#if block.links && block.links[i]?.link}
            {@const { href, target, rel } = getAnchorFromCmsLink(block.links[i].link)}
            <a {rel} {href} {target}>
              <img
                {src}
                {alt}
                {width}
                {height}
                class="hidden h-auto max-h-9 w-auto object-contain dark:block"
              />
            </a>
          {:else}
            <img
              {src}
              {alt}
              {width}
              {height}
              class="hidden h-auto max-h-9 w-auto object-contain dark:block"
            />
          {/if}
        {/if}
      {/each}
    </div>
  {/if}
</section>
