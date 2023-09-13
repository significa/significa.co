<script lang="ts">
  import { device } from '$lib/stores/device';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { HomePageStoryblok } from '$types/bloks';
  import { Button } from '@significa/svelte-ui';
  import ServicesIllustrationDark from './assets/pendulum-static-dark.webp';
  import ServicesIllustrationLight from './assets/pendulum-static-light.webp';
  import Newton from './newton.svelte';
  import { TrackingEvent, track } from '$lib/track';
  import { page } from '$app/stores';

  export let data: HomePageStoryblok;
</script>

<section
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
        <span class="text-foreground-secondary">{data.services_title1}</span> <br />
        {data.services_title2}
      </h3>
      <p class="mb-8 text-2xl text-foreground-secondary">{data.services_description}</p>
      {#if data.services_cta_label && data.services_cta_link}
        {@const { href } = getAnchorFromCmsLink(data.services_cta_link)}
        <Button
          as="a"
          arrow
          variant="secondary"
          {href}
          on:click={() => {
            track(TrackingEvent.CTA_CLICK, {
              props: { to: href, path: $page.url.pathname, section: data.services_title1 }
            });
          }}>{data.services_cta_label}</Button
        >
      {/if}
    </div>
  </div>
</section>
