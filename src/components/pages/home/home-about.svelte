<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';

  export let data: HomePageStoryblok;
</script>

<div class="container mx-auto px-container">
  <div class="md:flex">
    <div class="flex-1 py-10 md:py-14 lg:py-20">
      <h3 class="text-5xl text-foreground-secondary">{data.about_title1}</h3>
      <p class="text-5xl">{data.about_title2}</p>

      <p class="mt-4 max-w-md text-xl/tight font-medium text-foreground-secondary">
        {data.about_description}
      </p>
      {#if data.about_link?.[0]}
        {@const { href, target, rel } = getAnchorFromCmsLink(data.about_link[0].link)}
        <Button class="mt-12" variant="secondary" as="a" {href} {target} {rel} arrow
          >{data.about_link[0].label}</Button
        >
      {/if}
    </div>
  </div>
</div>

<!-- TODO: physics thingy -->

<div class="border-t">
  <div class="container mx-auto lg:flex">
    {#each data.about_links || [] as link}
      {@const { href } = getAnchorFromCmsLink(link.link)}
      <div
        class="flex flex-1 flex-col items-start justify-between border-t p-container transition-colors first:border-t-0 last:border-r-0 lg:border-r lg:border-t-0"
      >
        <div class="flex-1">
          <h3 class="text-2xl font-medium">{link.title}</h3>
          <p class="mt-2 text-xl/tight font-medium text-foreground-secondary">
            {link.description}
          </p>
        </div>
        <Button class="mt-12 xl:mt-20" as="a" variant="secondary" {href} arrow
          >{link.link_label}</Button
        >
      </div>
    {/each}
  </div>
</div>
