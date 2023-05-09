<script lang="ts">
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { device } from '$lib/stores/device';
  import { t } from '$lib/i18n';
  import Seo from '$components/seo.svelte';
  import Canvas from './careers/canvas.svelte';
  import Images from '../images.svelte';
  import BenefitsIcons from './careers/benefits-icons.svelte';
  import { Button, Link } from '@significa/svelte-ui';
  import { bodyLock } from '@significa/svelte-ui/actions';
  import type { CareersPageStoryblok } from '$types/bloks';
  import type { TeamMemberPage } from '$lib/content';
  import DrawYourSegg from '$components/draw-your-segg/draw-your-segg.svelte';

  export let data: CareersPageStoryblok;
  export let teamMembers: TeamMemberPage[] | undefined;

  let canvasFullscreen: boolean;
</script>

<Seo />
<main>
  <section class="relative mx-auto">
    <Canvas
      withMouseDragScroll
      title={data.page_title}
      height={data.canvas_height}
      width={data.canvas_width}
      items={data.canvas_items}
      {teamMembers}
      style="height: min({data.canvas_height}px ,calc(100vh - 76px));"
    />
    <div
      class="absolute left-0 right-0 top-0 h-16"
      style="background-image: linear-gradient(180deg, hsl(var(--color-background)) 0%, transparent 100%);"
    />

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
            <ul>
              {#each $page.data.careers as career}
                <li
                  class="border-b bg-gradient-to-r first:border-t hover:from-transparent hover:via-foreground-tertiary/10 hover:to-transparent hover:transition-colors"
                >
                  <a
                    class="flex w-full items-center justify-between py-7 text-2xl font-semibold transition-colors hover:text-foreground-secondary"
                    href={career.full_slug}
                  >
                    <span>{career.name}</span>
                    <Button variant="secondary" arrow />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
          <div class="mt-12 text-sm">
            <p class="leading-none text-foreground-secondary">{t('careers.footer.title')}</p>
            <Link class="mt-0.5 inline-flex" href="mailto:{t('careers.footer.email')}"
              >{t('careers.footer.description')}</Link
            >
          </div>
        </div>
      </div>
    </section>
  {/if}

  <Images images={data.images} class="py-8 md:py-20 lg:pb-12 lg:pt-24" />

  <!-- Benefits -->

  <section class="mt-10 border-b md:mt-14 lg:mt-20">
    <div
      class="container mx-auto mb-6 flex flex-col justify-between gap-6 px-container pt-8 lg:mb-12 lg:pt-12 xl:flex-row xl:gap-4"
    >
      <div class="xl:sticky xl:top-8 xl:max-w-xl xl:self-start">
        <h3 class="text-5xl text-foreground-secondary">{data.benefits_title}</h3>
        <p class="text-5xl">{data.benefits_description}</p>
      </div>

      {#if data.benefits}
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {#each data.benefits as benefits, index}
            <div
              class="flex flex-col xl:max-w-xs"
              style="margin-top: {index % 2 !== 0 ? '26px' : '0px'}"
            >
              <BenefitsIcons icon={benefits.icon || 'book'} class="mb-2" />
              <div class="text-lg font-semibold">{benefits.title}</div>
              <div class="text-lg font-semibold text-foreground-secondary">
                {benefits.description}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>
</main>

{#if $device === 'touch' && canvasFullscreen}
  <div use:bodyLock class="fixed inset-0 z-50 bg-black/50" transition:fade={{ duration: 200 }}>
    <div class="absolute inset-2 overflow-hidden rounded-md bg-background shadow-xl lg:inset-4">
      <Canvas
        title={data.page_title}
        height={data.canvas_height}
        width={data.canvas_width}
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
