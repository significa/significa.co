<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { getFileExtension } from '$lib/utils/strings';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { Icon, Link } from '@significa/svelte-ui';
  import Reel from './home/reel.svelte';
  import Square from './services/illustrations/square.svelte';
  import Hand from './services/illustrations/hand.svelte';
  import Duck from './services/illustrations/duck.svelte';
  import Testimonials from '$components/testimonials.svelte';
  import { theme } from '$lib/stores/theme';
  import PreFooter from '$components/pre-footer.svelte';

  export let data: ServicesPageStoryblok;
</script>

<Seo />
<main>
  <!-- Services -->
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto flex px-container pt-8 lg:pt-12">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">{data.awards_title}</h3>
        <p class="text-5xl">{data.awards_description}</p>
      </div>
    </div>
  </section>

  <!-- Awards -->
  {#if data.awards?.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto justify-between gap-12 px-container lg:flex ">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1">
            <ul>
              {#each data.awards as award}
                {@const { href, target, rel } = getAnchorFromCmsLink(award.link)}
                <li
                  class="flex flex-col-reverse items-center justify-between border-b bg-gradient-to-r py-5 elevated-links first:border-t hover:from-transparent hover:via-foreground-tertiary/10 hover:to-transparent hover:transition-colors lg:flex-row"
                >
                  <div class="flex w-full items-center">
                    {#if award.image?.filename}
                      {@const { alt, src, width, height } = getImageAttributes(award.image, {
                        size: [120, 0]
                      })}
                      <img
                        class="mr-2 h-auto w-14 rounded-xs bg-background-offset"
                        {src}
                        {alt}
                        {width}
                        {height}
                      />
                    {/if}
                    <div class="ml-4 flex-col">
                      <p class="text-base font-semibold text-foreground-secondary">
                        {award.label}
                      </p>
                      <p class="text-base font-semibold">{award.name}</p>
                    </div>
                  </div>
                  <div class="mb-8 w-full lg:mb-0">
                    <p class="text-3xl font-semibold">{award.project}</p>
                  </div>
                  <div class="w-full">
                    <Link {href} {target} {rel} class="elevated-link" />
                    <div class="hidden flex-1 justify-end text-foreground-tertiary xl:flex">
                      <Icon icon="arrow-right" />
                    </div>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Showreel -->
  <div class="container mx-auto mt-10 px-container md:mt-20">
    {#if data.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(data.showreel.filename))}
      <Reel src={data.showreel.filename} play_label={data.showreel_button_label} />
    {/if}
  </div>

  <!-- Services -->
  <section class="mt-10  md:mt-16 lg:mb-16">
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl">
        <h3 class="mb-2 text-5xl">{data.services_title}</h3>
        <p class="text-2xl text-foreground-secondary">{data.services_description}</p>
      </div>
    </div>
  </section>

  <section>
    <div class=" relative flex ">
      <Square class="absolute -bottom-10 left-[20%] hidden drop-shadow-md lg:block" />
      <Hand class="absolute -top-[76px] left-[54%] hidden drop-shadow-md md:-top-[60px] lg:block" />
      <Duck class="absolute -bottom-14 right-[20%] hidden drop-shadow-md md:right-[10%] lg:block" />
      {#if data.services}
        <div class="w-full justify-between lg:border-b lg:border-t ">
          <div class="container mx-auto grid grid-cols-1 px-container  md:grid-cols-3 ">
            {#each data.services as service}
              <div class="flex flex-col lg:border-r lg:p-8 lg:first:pl-0 lg:last:border-r-0">
                <p class="mb-2 mt-11 text-3xl font-semibold lg:mt-0">{service.title}</p>
                {#if service.entry}
                  {#each service.entry as entry}
                    <div class="flex flex-col">
                      <p class="mt-8 text-xl font-semibold">{entry.title}</p>
                      {#if entry.list}
                        {#each entry.list as item}
                          <div class="flex flex-col">
                            <p class="mt-3 text-xl text-foreground-secondary">{item.label}</p>
                          </div>
                        {/each}
                      {/if}
                    </div>
                  {/each}
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Deliverables -->

  <section class="mt-10 pb-4 md:mt-14 lg:mt-28">
    <div
      class="container mx-auto mb-6 flex flex-col gap-6 px-container pt-8 lg:mb-12 lg:pt-12 xl:flex-row xl:gap-4"
    >
      <div class="mb-8 mr-52 xl:sticky xl:top-8 xl:max-w-xl xl:self-start">
        <h3 class="text-5xl">{data.deliverables_title}</h3>
      </div>
      {#if data.deliverables}
        <div class="grid grid-cols-1 gap-x-40 gap-y-16 md:grid-cols-2">
          {#each data.deliverables as deliverables}
            <div class="flex flex-col items-start xl:max-w-xs">
              {#if deliverables.icon?.filename}
                {@const { src, alt } = getImageAttributes(deliverables.icon)}
                <img {src} {alt} class="max-h-12 object-contain drop-shadow-md" />
              {/if}
              <div class="mt-4 text-lg font-semibold">{deliverables.title}</div>
              <div class="text-lg font-semibold text-foreground-secondary">
                {deliverables.description}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <!-- Testimonials -->
  <Testimonials
    firstTitle={data.testimonials_title1}
    secondTitle={data.testimonials_title2}
    testimonials={data.testimonials}
    ctaLabel={data.testimonials_cta_label}
    ctaLink={data.testimonials_cta_link}
  />

  <!-- Clients -->
  <section class=" container mx-auto px-container pb-16 pt-20 lg:pb-20 lg:pt-40">
    <h3 class="text-center text-2xl text-foreground-secondary">{data.clients_title}</h3>
    {#if data.clients}
      <div class="flex flex-wrap justify-center gap-12 p-6">
        {#each data.clients as client}
          {#if client.light_mode?.filename && $theme === 'light'}
            {@const { src, alt } = getImageAttributes(client.light_mode)}
            <img {src} {alt} class="max-h-9 object-contain" />
          {/if}

          {#if client.dark_mode?.filename && $theme === 'dark'}
            {@const { src, alt } = getImageAttributes(client.dark_mode)}
            <img {src} {alt} class="max-h-9 object-contain" />
          {/if}
        {/each}
      </div>
    {/if}
  </section>

  <div class="mb-12">
    <PreFooter />
  </div>
</main>
