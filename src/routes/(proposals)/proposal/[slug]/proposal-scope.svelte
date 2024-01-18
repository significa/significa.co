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

<div class="overflow-x-scroll">
  <div class="border-b border-foreground-secondary min-w-[780px]">
    <div
      class={clsx(
        'container mx-auto',
        'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2fr_1fr] gap-x-10 md:gap-x-12 px-6 md:px-12 py-2'
      )}
    >
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">
        {t('proposals.scope.deliverable')}
      </p>

      <div class="grid grid-cols-2">
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">
          {t('proposals.scope.service')}
        </p>
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">
          {t('proposals.scope.features')}
        </p>
      </div>
      <p class="text-xs uppercase tracking-wider text-foreground-secondary"></p>
    </div>
  </div>

  {#each data as entry, i}
    {@const features = entry.features?.split('\n').filter(Boolean) || []}
    <div class="border-b border-foreground-tertiary even:bg-foreground-tertiary/10 min-w-[780px]">
      <div
        class={clsx(
          'container mx-auto',
          'grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12 px-6 md:px-12 py-4'
        )}
      >
        <div>
          <p class="font-bold">
            {entry.title}.
          </p>
          <p class="text-foreground-secondary">
            {entry.description}
          </p>

          <Button
            class="lg:hidden block mt-3 h-6 text-xs uppercase bg-background"
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
              <Tag class="cursor-default m-1 bg-background" label={service} />
            {/each}
          </div>

          <div>
            {#if !isShowingFeatures[i]}
              {t('proposals.scope.multiple-features')}
            {:else}
              <div transition:slide={{ duration: 400, easing: circOut }}>
                {#each features as feature}
                  <p
                    transition:fade|global={{ duration: 200 }}
                    class="py-4 border-b last:border-none"
                  >
                    {feature}
                  </p>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <div class="justify-end hidden lg:flex">
          <Button
            variant="secondary"
            size="sm"
            class="h-6 text-xs uppercase bg-background"
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
