<script lang="ts">
  import Heading from '$components/heading.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { AboutGridStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';

  export let block: AboutGridStoryblok;
</script>

<div use:storyblokEditable={block} class="border-y" use:drawerLinks>
  <div class="container mx-auto lg:flex">
    {#each block.about_links || [] as link}
      {@const { href } = getAnchorFromCmsLink(link.link)}
      <div
        class="flex flex-1 flex-col items-start justify-between border-t p-container transition-colors first:border-t-0 last:border-r-0 lg:border-r lg:border-t-0"
      >
        <div class="flex-1">
          <Heading offset={0} visual={3} class="text-2xl font-medium">{link.title}</Heading>
          <p class="mt-2 text-xl/tight font-medium text-foreground-secondary">
            {link.description}
          </p>
        </div>
        <Button class="mt-8 lg:mt-12 xl:mt-20" as="a" variant="secondary" {href} arrow
          >{link.link_label}</Button
        >
      </div>
    {/each}
  </div>
</div>
