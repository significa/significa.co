<script lang="ts">
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import ServicesIllustration from './assets/pendulum-placeholder.png';

  export let data: HomePageStoryblok;
</script>

<section
  class="flex flex-col-reverse lg:container lg:mx-auto lg:grid lg:grid-cols-[50%_50%] lg:px-container"
>
  <div
    class="container flex justify-center px-container lg:h-[640px] lg:max-w-none lg:border-r lg:px-0 lg:pr-12"
  >
    <!-- TODO: Pendulum physics -->
    <img
      src={ServicesIllustration}
      alt=""
      class="mb-12 max-h-[400px] object-contain object-top drop-shadow-md lg:mb-0"
    />
  </div>
  <div
    class="container grid place-items-center border-b px-container lg:max-w-none lg:border-none lg:px-0"
  >
    <div class="py-14 lg:max-w-lg lg:p-8">
      <h3 class="mb-6 text-5xl">
        {data.services_title1} <br />
        <span class="text-foreground-secondary">{data.services_title2}</span>
      </h3>
      <p class="mb-8 text-2xl text-foreground-secondary">{data.services_description}</p>
      {#if data.services_cta_label && data.services_cta_link}
        {@const { href } = getAnchorFromCmsLink(data.services_cta_link)}
        <Button as="a" arrow variant="secondary" {href}>{data.services_cta_label}</Button>
      {/if}
    </div>
  </div>
</section>
