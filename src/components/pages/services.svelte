<script lang="ts">
  import Seo from '$components/seo.svelte';
  import Square from './services/illustrations/square.svelte';
  import Hand from './services/illustrations/hand.svelte';
  import Duck from './services/illustrations/duck.svelte';
  import Timeline from './services/timeline.svelte';
  import { getImageAttributes } from '$lib/utils/cms';
  import type { PageStoryblok, ServicesPageStoryblok } from '$types/bloks';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import { page } from '$app/stores';
  import AwardsEntry from '$components/awards-entry.svelte';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';

  export let data: ServicesPageStoryblok;
  export let blocks: PageStoryblok['blocks'];
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
  {#if $page.data.awards.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="justify-between gap-12 lg:flex">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1">
            <ul use:drawerLinks>
              {#each $page.data.awards as award}
                {@const href = award.content.project.full_slug}
                <li
                  class={clsx(
                    'block border-b first:border-t',
                    href ? 'transition-colors hover:bg-foreground-tertiary/10' : ''
                  )}
                >
                  <a
                    {href}
                    class="container mx-auto flex flex-col justify-between px-container py-5 lg:flex-row"
                  >
                    <AwardsEntry
                      linkHref={href}
                      image={award.content.recognition.content.image}
                      label={award.content.recognition.content.label}
                      name={award.content.recognition.content.title}
                      year={award.content.year}
                      project={award.content.project.name}
                    ></AwardsEntry>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- Services -->
  <!-- TODO: Remove this code since it's repeated on services.svelte (block) as soon as we change the pages to blocks -->
  <section class="mt-14 md:mt-24 lg:mb-12">
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
              class="absolute -top-[--topnav-height] left-[54%] hidden drop-shadow-md md:-top-[60px] lg:block"
            />
            <Duck
              class="absolute -bottom-14 right-[20%] hidden drop-shadow-md md:right-[7%] lg:block"
            />
            {#each data.services as service}
              <div
                class="flex flex-col border-t last:border-b md:border-t-0 md:last:border-b-0 lg:border-r lg:p-8 lg:last:border-r-0 lg:first-of-type:pl-0"
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
              <div class="mt-4 text-2xl font-semibold">{deliverables.title}</div>
              <div class="text-2xl font-semibold text-foreground-secondary">
                {deliverables.description}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
