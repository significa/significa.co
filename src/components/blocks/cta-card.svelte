<script lang="ts">
  import type { CtaCardStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import CtaLight from '$components/illustrations/assets/cta-card-light.webp';
  import CtaDark from '$components/illustrations/assets/cta-card-dark.webp';
  import { theme } from '$lib/stores/theme';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  export let block: CtaCardStoryblok;

  $: src =
    $theme === 'dark'
      ? block.theme === 'in-theme'
        ? CtaLight
        : CtaDark
      : block.theme === 'contrast'
        ? CtaLight
        : CtaDark;
</script>

<section class="container mx-auto px-container @container my-16 md:mt-10 lg:my-24">
  <div
    data-theme={$theme === 'dark'
      ? block.theme === 'in-theme'
        ? 'dark'
        : 'light'
      : block.theme === 'contrast'
        ? 'dark'
        : 'light'}
    class="flex overflow-hidden rounded-lg border bg-background"
  >
    <div class="flex flex-col p-3 md:p-8">
      <p class="text-xl md:text-2xl font-semibold">{block.title}</p>
      <p class="text-xl md:text-xl/6 font-medium text-foreground-secondary max-w-md pt-1">
        {block.description}
      </p>
      <div class="flex gap-2 flex-wrap mt-8">
        {#if block.link_text}
          {@const { href, target } = getAnchorFromCmsLink(block.link)}
          <Button
            {target}
            as="a"
            href={href ? href : '#estimation'}
            size="md"
            class="w-fit scroll-b">{block.link_text}</Button
          >
        {/if}
        {#if block.secondary_link_text}
          {@const { href } = getAnchorFromCmsLink(block.secondary_link)}
          <Button variant="secondary" as="a" {href} size="md" class="w-fit scroll-b"
            >{block.secondary_link_text}</Button
          >
        {/if}
      </div>
    </div>
    <div
      class="hidden flex-1 flex-col justify-end ml-16 bg-no-repeat bg-cover bg-center lg:flex"
      style="background-image: url({src});"
    />
  </div>
</section>
