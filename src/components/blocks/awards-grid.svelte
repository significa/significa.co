<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';

  // Block comes from ACF flexible content
  export let block: any;

  // Group WordPress awards by recognition
  const awardsArray = Object.values(
    ($page.data.awards || []).reduce<Record<string, any[]>>(
      (acc, currentValue) => {
        // WordPress: recognition is in ACF
        const recognitionId = currentValue.acf?.recognition?.ID || currentValue.acf?.recognition;
        let groupKey = recognitionId ? String(recognitionId) : 'unknown';

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
        {#if award[0]?.acf?.recognition}
          {@const recognition = award[0].acf.recognition}
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
            {#if recognition.image?.url}
              <img
                class="absolute left-10 h-auto w-14 rounded-md border-2 border-background bg-background-offset"
                src={recognition.image.url}
                alt="award"
              />
            {/if}
            <div class="mt-3 flex flex-col md:ml-3 md:mt-0">
              <p class="text-xs font-medium text-foreground-secondary">{t('recognitions.award')}</p>
              <p class="text-base font-medium">{recognition.title || ''}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
    {#if block.description}
      <h4 class="mt-12 flex items-center text-4xl font-semibold text-foreground-secondary">
        {block.description}
      </h4>
    {/if}
  </section>
</div>
