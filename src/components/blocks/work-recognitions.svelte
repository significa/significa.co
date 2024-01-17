<script lang="ts">
  import type { WorkRecognitionsStoryblok } from '$types/bloks';

  import { page } from '$app/stores';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import SmallHighlights from '$components/pages/home/small-highlights.svelte';
  import { t } from '$lib/i18n';

  export let block: WorkRecognitionsStoryblok;

  const awardsArray = Object.values(
    $page.data.awards.reduce((acc, currentValue) => {
      let groupKey = currentValue.content.recognition.name;
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(currentValue);
      return acc;
    }, {})
  );
</script>

<section class="container mx-auto px-container @container flex flex-col max-w-[1056px] pt-32">
  <h3 class="text-5xl font-semibold">{block.title}</h3>
</section>

<div class="container mx-auto px-container max-w-[1056px]">
  <section use:drawerLinks class="mt-10 mb-8 md:mt-14 lg:mt-20">
    <h4 class="text-lg font-semibold text-foreground-secondary mb-6">
      {block.small_highlights_title}
    </h4>
    <SmallHighlights highlights={block.small_highlights} class="xl:grid-cols-3" />
  </section>
</div>

<div class="container mx-auto px-container max-w-[1056px]">
  <section use:drawerLinks class="mt-10 mb-8 md:mt-10 lg:mt-12 lg:mb-40">
    <h4 class="text-lg font-semibold text-foreground-secondary mb-6">
      {block.awards_title}
    </h4>
    <div class="grid grid-cols-4 gap-6">
      {#each awardsArray as award}
        <div class="flex w-full items-center relative">
          <div
            class="flex bg-background-panel border-background-offset border h-11 w-[92px] rounded-sm items-center"
          >
            <p class="text-sm font-medium text-foreground-secondary ml-3.5 mr-3.5">
              {award.length}
            </p>
          </div>
          <img
            class="h-auto w-14 rounded-md bg-background-offset border-2 border-background absolute left-10"
            src={award[0].content.recognition.content.image?.filename}
            alt="award"
          />
          <div class="flex flex-col ml-3">
            <p class="text-xs font-medium text-foreground-secondary">{t('recognitions.award')}</p>
            <p class="text-base font-medium">{award[0].content.recognition.content.title}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
