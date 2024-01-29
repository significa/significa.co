<script lang="ts">
  import type { CtaCardStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import CtaLight from '$components/illustrations/assets/cta-card-light.webp';
  import CtaDark from '$components/illustrations/assets/cta-card-dark.webp';
  import { theme } from '$lib/stores/theme';

  export let block: CtaCardStoryblok;

  $: src = $theme === 'dark' ? CtaLight : CtaDark;
</script>

<section class="container mx-auto px-container @container mt-8 md:mt-10 lg:mt-12">
  <div class="flex overflow-hidden rounded-lg border bg-background-offset/80">
    <div class="flex flex-col p-8">
      <p class="text-2xl font-semibold">{block.title}</p>
      <p class="text-2xl font-semibold text-foreground-secondary max-w-md">
        {block.description}
      </p>
      {#if block.link_text}
        <Button as="a" href="#estimation" size="md" class="w-fit mt-8 scroll-b"
          >{block.link_text}</Button
        >
      {/if}
    </div>
    <div
      class="hidden flex-1 flex-col justify-end ml-16 bg-no-repeat bg-cover bg-center lg:flex"
      style="background-image: url({src});"
    />
  </div>
</section>
