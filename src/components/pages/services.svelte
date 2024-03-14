<script lang="ts">
  import Seo from '$components/seo.svelte';
  import Timeline from './services/timeline.svelte';

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

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>
