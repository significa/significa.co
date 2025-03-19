<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';
  import type { ProposalScopeEntryStoryblok } from '$types/bloks';
  import { Button, Tag } from '@significa/svelte-ui';
  import { fade, slide } from 'svelte/transition';
  import { circOut } from 'svelte/easing';

  export let data: ProposalScopeEntryStoryblok[];

  let isShowingFeatures = Array(data.length).fill(false);
</script>

<div class="mt-10 overflow-x-scroll md:mt-14 lg:mt-20">
  <div class="min-w-[780px] border-b border-foreground-secondary">
    <div
      class={clsx(
        'container mx-auto',
        'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2fr_1fr]',
        'gap-x-10 px-6 py-2 md:gap-x-12 md:px-12'
      )}
    >
      <p class="text-2xs uppercase text-foreground-secondary">
        {t('proposals.scope.deliverable')}
      </p>

      <div class="grid grid-cols-2">
        <p class="text-2xs uppercase text-foreground-secondary">
          {t('proposals.scope.service')}
        </p>
        <p class="text-2xs uppercase text-foreground-secondary">
          {t('proposals.scope.features')}
        </p>
      </div>
      <p class="text-2xs uppercase text-foreground-secondary"></p>
    </div>
  </div>

  {#each data as entry, i}
    {@const features = entry.features?.split('\n').filter(Boolean) || []}
    <div class="min-w-[780px] border-b border-foreground-tertiary last:border-foreground-secondary">
      <div
        class={clsx(
          'container mx-auto',
          'grid grid-cols-[1fr_3fr] gap-10 px-6 py-4 md:gap-12 md:px-12 lg:grid-cols-[1fr_2fr_1fr]'
        )}
      >
        <div>
          <p class="text-sm font-bold">
            {entry.title}.
          </p>
          <p class="text-sm text-foreground-secondary">
            {entry.description}
          </p>

          <Button
            class="mt-3 block h-6 bg-background text-xs uppercase lg:hidden"
            variant="secondary"
            size="sm"
            on:click={() => {
              isShowingFeatures[i] = !isShowingFeatures[i];
            }}
          >
            {isShowingFeatures[i] ? t('proposals.hide') : t('proposals.show')}
          </Button>
        </div>

        <div class="grid grid-cols-2">
          <div class="">
            {#each entry.services || [] as service}
              <Tag
                class="m-1 cursor-default bg-background px-2.5 py-1.5 text-2xs uppercase"
                label={service}
              />
            {/each}
          </div>

          <div>
            {#if !isShowingFeatures[i]}
              <p class="text-sm">
                {t('proposals.scope.multiple-features')}
              </p>
            {:else}
              <div transition:slide={{ duration: 400, easing: circOut }}>
                {#each features as feature}
                  <p
                    transition:fade|global={{ duration: 200 }}
                    class="border-b py-4 text-sm last:border-none"
                  >
                    {feature}
                  </p>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <div class="hidden justify-end lg:flex">
          <Button
            variant="secondary"
            size="sm"
            class="h-6 bg-background text-xs uppercase"
            on:click={() => {
              isShowingFeatures[i] = !isShowingFeatures[i];
            }}
          >
            {isShowingFeatures[i] ? t('proposals.hide') : t('proposals.show')}
          </Button>
        </div>
      </div>
    </div>
  {/each}
</div>
