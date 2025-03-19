<script lang="ts">
  import type { CtaCardStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import CtaLight from '$components/illustrations/assets/cta-card-light.webp';
  import CtaDark from '$components/illustrations/assets/cta-card-dark.webp';
  import { theme } from '$lib/stores/theme';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  import { storyblokEditable } from '$lib/actions/storyblok-editable';

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

<section
  use:storyblokEditable={block}
  class="container mx-auto my-16 px-container @container md:mt-10 lg:my-24"
>
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
      <p class="text-xl font-semibold md:text-2xl">{block.title}</p>
      <p class="max-w-md pt-1 text-xl font-medium text-foreground-secondary md:text-xl/6">
        {block.description}
      </p>
      <div class="mt-8 flex flex-wrap gap-2">
        {#if block.link_text}
          {@const { href, target, rel } = getAnchorFromCmsLink(block.link)}

          <Button
            {...block.link}
            {rel}
            {target}
            as="a"
            href={href ? href : '#estimation'}
            size="md"
            class="scroll-b w-fit"
          >
            {block.link_text}
          </Button>
        {/if}
        {#if block.secondary_link_text}
          {@const { href } = getAnchorFromCmsLink(block.secondary_link)}
          <Button
            {...block.secondary_link}
            variant="secondary"
            as="a"
            {href}
            size="md"
            class="scroll-b w-fit"
          >
            {block.secondary_link_text}
          </Button>
        {/if}
      </div>
    </div>
    <div
      class="ml-16 hidden flex-1 flex-col justify-end bg-cover bg-center bg-no-repeat lg:flex"
      style="background-image: url({src});"
    />
  </div>
</section>
