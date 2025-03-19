<script lang="ts">
  import type { RecognitionEntryStoryblok, WorkRecognitionsStoryblok } from '$types/bloks';

  import { page } from '$app/stores';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import { t } from '$lib/i18n';
  import type { ISbStoryData } from '@storyblok/js';
  import EggChicken from '../illustrations/assets/egg-chicken.webp';
  import SeggChicken from '../illustrations/assets/segg-chicken.webp';
  import BG from '../illustrations/assets/bg-work-recognitions.webp';
  import BGWhite from '../illustrations/assets/bg-work-recognitions-white.webp';
  import { theme } from '$lib/stores/theme';

  export let block: WorkRecognitionsStoryblok;

  const awardsArray = Object.values(
    $page.data.awards.reduce<Record<string, ISbStoryData<RecognitionEntryStoryblok>[]>>(
      (acc, currentValue) => {
        let groupKey = currentValue.content.recognition.name;
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
      },
      {}
    )
  );

  $: src = $theme === 'dark' ? BG : BGWhite;
</script>

<div style="background-image: url({src});">
  <section
    class="container relative mx-auto flex max-w-[1056px] flex-col px-container pt-16 @container xl:pt-32"
  >
    <img src={EggChicken} class="absolute -bottom-80 -right-56 block drop-shadow-md" alt="" />
    <img src={SeggChicken} class="absolute -left-72 top-12 block w-[20%] drop-shadow-md" alt="" />
    <h3 class="text-5xl font-semibold">{block.title}</h3>
  </section>

  <div class="container mx-auto max-w-[1056px] px-container">
    <section use:drawerLinks class="mb-8 mt-10 md:mt-14 lg:mt-20">
      <h4 class="mb-6 text-lg font-semibold text-foreground-secondary">
        {block.small_highlights_title}
      </h4>
      <SmallHighlights highlights={block.small_highlights} class="xl:grid-cols-3" />
    </section>
  </div>

  <div class="container mx-auto max-w-[1056px] px-container">
    <section use:drawerLinks class="mb-8 mt-10 md:mt-10 lg:mb-40 lg:mt-12">
      <h4 class="mb-6 text-lg font-semibold text-foreground-secondary">
        {block.awards_title}
      </h4>
      <div class="grid grid-cols-3 gap-4 md:gap-6">
        {#each awardsArray as award}
          <div
            class="relative flex w-full max-w-fit flex-col items-start md:flex-row md:items-center"
          >
            <div
              class="flex h-11 w-[92px] items-center rounded-sm border border-background-offset bg-background-panel"
            >
              <p class="ml-3.5 mr-3.5 text-sm font-medium text-foreground-secondary">
                {award.length}
              </p>
            </div>
            <img
              class="absolute left-10 h-auto w-14 rounded-md border-2 border-background bg-background-offset"
              src={award[0].content.recognition.content.image?.filename}
              alt="award"
            />
            <div class="mt-3 flex flex-col md:ml-3 md:mt-0">
              <p class="text-xs font-medium text-foreground-secondary">{t('recognitions.award')}</p>
              <p class="text-base font-medium">{award[0].content.recognition.content.title}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
