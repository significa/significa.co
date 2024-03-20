<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { device } from '$lib/stores/device';
  import { t } from '$lib/i18n';
  import Seo from '$components/seo.svelte';
  import Canvas from './careers/canvas.svelte';
  import Images from '../images.svelte';
  import { Button, Link } from '@significa/svelte-ui';
  import { bodyLock } from '@significa/svelte-ui/actions';
  import type { CareersPageStoryblok, PageStoryblok } from '$types/bloks';
  import type { TeamMemberPage } from '$lib/content';
  import DrawYourSegg from '$components/draw-your-segg/draw-your-segg.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import CareersAssetLight from '$components/illustrations/assets/careers-light.webp';
  import CareersAssetDark from '$components/illustrations/assets/careers-dark.webp';
  import { theme } from '$lib/stores/theme';
  import DynamicBlock from '$components/blocks/dynamic-block.svelte';
  export let blocks: PageStoryblok['blocks'];

  export let data: CareersPageStoryblok;
  export let teamMembers: TeamMemberPage[] | undefined;

  let canvasFullscreen: boolean;

  $: src = $theme === 'dark' ? CareersAssetDark : CareersAssetLight;
</script>

<Seo />
<main>
  <section class="relative mx-auto overflow-hidden">
    <Canvas
      withMouseDragScroll
      title={data.page_title}
      height={Number(data.canvas_height)}
      width={Number(data.canvas_width)}
      items={data.canvas_items}
      hideMap={$device === 'touch'}
      {teamMembers}
      style="height: min({data.canvas_height}px, calc(90vh - var(--topnav-height)));"
    />
    <div class="absolute left-0 right-0 top-0 h-16 border-t" />

    {#if $device === 'touch'}
      <Button
        on:click={() => {
          canvasFullscreen = true;
        }}
        variant="secondary"
        size="lg"
        icon="expand"
        class="absolute bottom-4 right-4 bg-background"
      />
    {/if}
  </section>

  <!-- What define us -->
  <section class="border-t">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:flex-row lg:gap-4 lg:py-12"
    >
      <div class="lg:max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">{data.careers_title1}</h3>
        <p class="text-5xl">{data.careers_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary lg:max-w-xl">
        {data.careers_description}
      </p>
    </div>

    <div
      class="container mx-auto flex items-center justify-center px-container pt-4 md:mt-6 lg:mt-10"
    >
      <DrawYourSegg />
    </div>
  </section>

  <!-- Open positions -->
  <section class="mt-10 border-t md:mt-14 lg:mt-20">
    <div class="container mx-auto flex px-container pt-8 lg:pt-12">
      <div class="xl:max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">{data.open_positions_title}</h3>
        <p class="text-5xl">{data.open_positions_description}</p>
      </div>
    </div>
  </section>

  {#if $page.data.careers.length}
    <section class="mt-10 md:mt-14 lg:mt-20">
      <div class="container mx-auto justify-between gap-12 px-container lg:flex">
        <div class="flex flex-1 flex-col items-start">
          <div class="w-full flex-1">
            <ul use:drawerLinks>
              {#each $page.data.careers as career}
                <li class="border-b first:border-t">
                  <a
                    class="flex w-full items-center justify-between py-7 text-2xl font-semibold transition-colors hover:text-foreground-secondary"
                    href={career.full_slug}
                  >
                    <span>{career.name}</span>
                    <Button size="sm" variant="secondary" arrow />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
          <div class="mt-12 text-sm">
            <p class="leading-none text-foreground-secondary">{t('careers.footer.title')}</p>
            <Link
              class="mt-0.5 inline-flex underline md:no-underline"
              href="mailto:{t('careers.footer.email')}">{t('careers.footer.description')}</Link
            >
          </div>
        </div>
      </div>
    </section>
  {:else}
    <section class="container mx-auto px-container @container mt-8 md:mt-10 lg:mt-12">
      <div class="flex overflow-hidden rounded-lg border bg-background-offset/80">
        <div class="flex flex-col p-8">
          <p class="text-2xl font-semibold">{t('careers.footer.no.positions')}</p>
          <p class="text-2xl font-semibold text-foreground-secondary max-w-md">
            {t('careers.footer.no.positions.description')}
          </p>
          <Button as="a" href="mailto:{t('careers.footer.email')}" size="lg" class="w-fit mt-8"
            >{t('careers.footer.description')}</Button
          >
        </div>
        <div
          class="hidden flex-1 flex-col justify-end ml-16 bg-no-repeat bg-cover bg-center lg:flex"
          style="background-image: url({src});"
        />
      </div>
    </section>
  {/if}

  <Images images={data.images} class="py-8 md:py-20 lg:pb-12 lg:pt-24" />

  {#if blocks}
    {#each blocks as block}
      <DynamicBlock {block} />
    {/each}
  {/if}
</main>

{#if $device === 'touch' && canvasFullscreen}
  <div
    use:bodyLock
    class="fixed inset-0 z-50 bg-black/50"
    transition:fade|global={{ duration: 200 }}
  >
    <div class="absolute inset-2 overflow-hidden rounded-md bg-background shadow-xl lg:inset-4">
      <Canvas
        title={data.page_title}
        height={Number(data.canvas_height)}
        width={Number(data.canvas_width)}
        items={data.canvas_items}
        {teamMembers}
        class="h-full"
      />

      <Button
        on:click={() => {
          canvasFullscreen = false;
        }}
        variant="secondary"
        size="lg"
        icon="close"
        class="absolute right-4 top-4 bg-background"
      />
    </div>
  </div>
{/if}
