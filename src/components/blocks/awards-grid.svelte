<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import type { AwardsGridStoryblok, RecognitionEntryStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let block: AwardsGridStoryblok;

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
</script>

<div class="container mx-auto px-container flex justify-center">
  <section class="my-12 md:mt-20 md:mb-12 max-w-[740px]">
    <div class="grid-cols-2 grid gap-4 md:gap-6 md:grid-cols-3">
      {#each awardsArray as award}
        <div
          class="flex w-full max-w-fit items-start md:items-center relative flex-col md:flex-row"
        >
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
          <div class="flex flex-col mt-3 md:mt-0 md:ml-3">
            <p class="text-xs font-medium text-foreground-secondary">{t('recognitions.award')}</p>
            <p class="text-base font-medium">{award[0].content.recognition.content.title}</p>
          </div>
        </div>
      {/each}
    </div>
    {#if block.description}
      <h4 class="text-4xl font-semibold text-foreground-secondary mt-12 flex items-center">
        {block.description}
      </h4>
    {/if}
  </section>
</div>
