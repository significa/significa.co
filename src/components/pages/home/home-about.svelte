<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';

  export let page: HomePageStoryblok;
</script>

<div class="container mx-auto px-container">
  <div class="md:flex">
    <div class="flex-1 py-10 md:border-r md:py-14 lg:py-20">
      <h3 class="max-w-sm text-4xl text-foreground-secondary">{page.about_title1}</h3>
      <p class="max-w-sm text-4xl">{page.about_title2}</p>

      <p class="mt-20 max-w-sm text-xl font-medium text-foreground-secondary">
        {page.about_description}
      </p>
      {#if page.about_link?.[0]}
        {@const { href, target, rel } = getAnchorFromCmsLink(page.about_link[0].link)}
        <Button class="mt-6" variant="secondary" as="a" {href} {target} {rel} arrow
          >{page.about_link[0].label}</Button
        >
      {/if}
    </div>
    <!-- TODO: physics -->
    <div class="flex-1">PHYSICS HERE</div>
  </div>
</div>
<div>
  {#each page.about_links || [] as link}
    {@const { href, target, rel } = getAnchorFromCmsLink(link.link)}
    <div class="border-t transition-colors elevated-links hover:bg-foreground-tertiary/10">
      <div class="container mx-auto flex items-center justify-between px-container">
        <a class="py-6 text-2xl font-medium elevated-link" {href} {target} {rel}>{link.label}</a>
        <Button as="a" variant="secondary" size="sm" {href} arrow />
      </div>
    </div>
  {/each}
</div>
