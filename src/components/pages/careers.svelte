<script lang="ts">
  import Seo from '$components/seo.svelte';
  import type { CareersPageStoryblok } from '$types/bloks';
  import { t } from '$lib/i18n';
  import { page } from '$app/stores';
  import { Button, Link } from '@significa/svelte-ui';
  import Images from '../images.svelte';
  import BenefitsIcons from './careers/benefits-icons.svelte';

  export let data: CareersPageStoryblok;
</script>

<Seo />
<main>
  <section class="container mx-auto px-container py-20">
    <h1 class="text-8xl">
      {data.page_title}
    </h1>
  </section>

  <!-- What define us -->
  <section class="mt-10 border-t md:mt-14 lg:mt-20">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container py-8 lg:py-12 xl:flex-row xl:gap-4"
    >
      <div class="xl:max-w-xl">
        <h3 class="text-5xl text-foreground-secondary">{data.careers_title1}</h3>
        <p class="text-5xl">{data.careers_title2}</p>
      </div>

      <p class="whitespace-pre-line text-2xl text-foreground-secondary xl:max-w-xl">
        {data.careers_description}
      </p>
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
              <!-- hover:bg-foreground-tertiary/10 -->
              {#each $page.data.careers as career}
                <li
                  class="border-b bg-gradient-to-r first:border-t hover:from-transparent hover:via-foreground-tertiary/10 hover:to-transparent"
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

  <Images page={data} />

  <!-- Benefits -->

  <section class="mt-10 md:mt-14 lg:mt-20">
    <div
      class="container mx-auto flex flex-col justify-between gap-6 px-container pt-8 lg:pt-12 xl:flex-row xl:gap-4"
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
              <BenefitsIcons icon={benefits.icon || 'book'} class="mb-6" />
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
