<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { VIDEO_EXTENSIONS } from '$lib/constants';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import { formatDate } from '$lib/utils/dates';
  import { getFileExtension } from '$lib/utils/strings';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { Icon, Link } from '@significa/svelte-ui';
  import Reel from './home/reel.svelte';
  import Square from './services/illustrations/square.svelte';
  import Hand from './services/illustrations/hand.svelte';
  import Duck from './services/illustrations/duck.svelte';
  import Testimonials from '$components/testimonials.svelte';

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
  <div class="container mx-auto px-container">
    {#if data.showreel?.filename && VIDEO_EXTENSIONS.includes(getFileExtension(data.showreel.filename))}
      <Reel src={data.showreel.filename} play_label={data.showreel_button_label} />
    {/if}
  </div>

  <!-- Services -->
  <section class="mt-10  md:mt-14 lg:mb-8 ">
    <div class="container mx-auto flex px-container pt-8 lg:pt-12">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">{data.services_title}</h3>
        <p class="text-xl">{data.services_description}</p>
      </div>
    </div>
  </section>

  <section>
    <div class="container relative mx-auto flex px-container">
      <Square class="absolute -bottom-10 left-[20%] hidden drop-shadow-md lg:block" />
      <Hand class="absolute -top-[76px] left-[54%] hidden drop-shadow-md lg:block" />
      <Duck class="absolute -bottom-10 right-[5%] hidden drop-shadow-md lg:block" />
      {#if data.services}
        <div class="grid w-full grid-cols-1 justify-between md:grid-cols-3 lg:border-b lg:border-t">
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
  <div class="pt-16 lg:pt-20" />
</main>
