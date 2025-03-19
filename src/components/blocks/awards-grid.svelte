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

<div class="container mx-auto flex justify-center px-container">
  <section class="my-12 max-w-[740px] md:mb-12 md:mt-20">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
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
    {#if block.description}
      <h4 class="mt-12 flex items-center text-4xl font-semibold text-foreground-secondary">
        {block.description}
      </h4>
    {/if}
  </section>
</div>
