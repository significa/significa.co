<script lang="ts">
  import { Button, Link } from '@significa/svelte-ui';
  import Seo from '$components/seo.svelte';
  import Testimonials from '$components/testimonials.svelte';
  import PreFooter from '$components/pre-footer.svelte';
  import Square from './services/illustrations/square.svelte';
  import Hand from './services/illustrations/hand.svelte';
  import Duck from './services/illustrations/duck.svelte';
  import Timeline from './services/timeline.svelte';
  import { theme } from '$lib/stores/theme';
  import { getAnchorFromCmsLink, getImageAttributes } from '$lib/utils/cms';
  import type { ServicesPageStoryblok } from '$types/bloks';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import { TrackingEvent, track } from '$lib/track';
  import { page } from '$app/stores';

  export let data: ServicesPageStoryblok;
</script>

<Seo />
<main>
  <section class="overflow-clip">
    <div class="container mx-auto mt-10 px-container md:mt-14 lg:mt-20">
      <h1 class="mb-2 text-3xl font-semibold text-foreground-secondary">{data.page_title1}</h1>
      <h2 class="max-w-6xl text-7xl">{data.page_title2}</h2>
    </div>

    <!-- Timeline -->
    {#if data.timeline}
      <Timeline timeline={data.timeline} class="mt-20" />
    {/if}
  </section>

  <section class="mt-10 md:mt-14">
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">{data.awards_title}</h3>
        <p class="text-5xl">{data.awards_description}</p>
      </div>
    </div>
  </section>

  <!-- Awards -->
  {#if data.awards?.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class=" justify-between gap-12 lg:flex">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1" use:drawerLinks>
            <ul>
              {#each data.awards as award}
                {@const { href, target, rel } = getAnchorFromCmsLink(award.link)}
                <div class="border-b first:border-t">
                  <li
                    class={clsx(
                      'container mx-auto  flex flex-col justify-between px-container py-5 lg:flex-row',
                      href
                        ? 'bg-gradient-to-r elevated-links hover:from-transparent hover:via-foreground-tertiary/10 hover:to-transparent hover:transition-colors'
                        : ''
                    )}
                  >
                    <div class="flex w-full flex-col-reverse items-center lg:flex-row">
                      <div class="mb-4 flex w-full items-center lg:mb-0">
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
                    </div>
                    <div class="w-1/3">
                      {#if href}
                        <div class="flex-1 justify-end text-foreground-tertiary xl:flex">
                          {#if award.link_text}
                            <Button as="a" {href} variant="secondary" arrow>
                              {award.link_text}
                            </Button>
                          {:else}
                            <Button as="a" {href} variant="secondary" arrow />
                          {/if}
                        </div>
                      {/if}
                      <Link
                        {href}
                        {target}
                        {rel}
                        class="elevated-link"
                        on:click={() => {
                          track(TrackingEvent.SERVICES_AWARD_CLICK, {
                            props: {
                              to: href,
                              path: $page.url.pathname
                            }
                          });
                        }}
                      />
                    </div>
                  </li>
                </div>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Services -->
  <section class="mt-10 md:mt-16 lg:mb-16">
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl">
        <h3 class="text-5xl text-foreground-secondary">{data.services_title}</h3>
        <h3 class="mb-2 text-5xl">{data.services_subtitle}</h3>
        <p class="text-2xl text-foreground-secondary">{data.services_description}</p>
      </div>
    </div>
  </section>

  <section>
    <div class="flex">
      {#if data.services}
        <div class="w-full justify-between lg:border-b lg:border-t">
          <div class="container relative mx-auto grid grid-cols-1 px-container md:grid-cols-3">
            <Square class="absolute -bottom-10 left-[20%] hidden drop-shadow-md lg:block" />
            <Hand
              class="absolute -top-[76px] left-[54%] hidden drop-shadow-md md:-top-[60px] lg:block"
            />
            <Duck
              class="absolute -bottom-14 right-[20%] hidden drop-shadow-md md:right-[7%] lg:block"
            />
            {#each data.services as service}
              <div
                class="flex flex-col lg:border-r lg:p-8 lg:last:border-r-0 lg:first-of-type:pl-0"
              >
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
        <h3 class="text-5xl text-foreground-secondary">{data.deliverables_title}</h3>
        <h3 class="text-5xl">{data.deliverables_subtitle}</h3>
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
