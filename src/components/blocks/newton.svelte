<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import { device } from '$lib/stores/device';
  import type { NewtonStoryblok } from '$types/bloks';
  import ServicesIllustrationDark from '../pages/home/assets/pendulum-static-dark.webp';
  import ServicesIllustrationLight from '../pages/home/assets/pendulum-static-light.webp';
  import Newton from '../pages/home/newton.svelte';
  import { Button } from '@significa/svelte-ui';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';

  export let block: NewtonStoryblok;
</script>

<section
  use:storyblokEditable={block}
  class="flex flex-col-reverse lg:container lg:mx-auto lg:grid lg:grid-cols-[50%_50%] lg:px-container"
>
  <div
    class="container flex justify-center px-container lg:max-w-none lg:border-r lg:px-0 lg:pr-12"
  >
    {#if $device === 'touch'}
      <img
        src={ServicesIllustrationLight}
        alt=""
        class="mb-12 max-h-[400px] object-contain object-top dark:hidden lg:mb-0"
      />
      <img
        src={ServicesIllustrationDark}
        alt=""
        class="mb-12 max-h-[400px] object-contain object-top light:hidden lg:mb-0"
      />
    {:else}
      <Newton />
    {/if}
  </div>
  <div
    class="container grid place-items-center border-b px-container lg:max-w-none lg:border-none lg:px-0"
  >
    <div class="py-14 lg:max-w-2xl lg:p-12">
      <h3 class="mb-6 text-5xl">
        <span class="text-foreground-secondary">{block.title1}</span> <br />
        {block.title2}
      </h3>
      <p class="mb-8 text-2xl text-foreground-secondary">{block.description}</p>
      {#if block.cta_label && block.cta_link}
        {@const { href } = getAnchorFromCmsLink(block.cta_link)}
        <Button as="a" arrow variant="secondary" {href}>{block.cta_label}</Button>
      {/if}
    </div>
  </div>
</section>
