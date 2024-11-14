<script lang="ts">
  import { page } from '$app/stores';
  import type { OpenPositionsStoryblok } from '$types/bloks';

  import { Button, Link } from '@significa/svelte-ui';

  import { t } from '$lib/i18n';
  import { theme } from '$lib/stores/theme';
  import { sanitizeSlug } from '$lib/utils/paths';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';

  import CareersAssetLight from '$components/illustrations/assets/careers-light.webp';
  import CareersAssetDark from '$components/illustrations/assets/careers-dark.webp';

  export let block: OpenPositionsStoryblok;

  $: src = $theme === 'dark' ? CareersAssetDark : CareersAssetLight;
</script>

<section use:storyblokEditable={block} class="mt-10 border-t md:mt-14 lg:mt-20">
  <div class="container mx-auto flex px-container pt-8 lg:pt-12">
    <div class="xl:max-w-xl">
      <h3 class="text-5xl text-foreground-secondary">{block.open_positions_title}</h3>
      <p class="text-5xl">{block.open_positions_description}</p>
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
              {@const href = sanitizeSlug(career.full_slug)}
              <li class="border-b first:border-t">
                <a
                  class="flex w-full items-center justify-between py-7 text-2xl font-semibold transition-colors hover:text-foreground-secondary"
                  {href}
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
