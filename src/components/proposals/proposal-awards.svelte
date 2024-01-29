<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import { t } from '$lib/i18n';
  import AwardsEntry from '$components/awards-entry.svelte';
  import type { ISbStoryData } from '@storyblok/js';
  import type { RecognitionStoryblok } from '$types/bloks';

  export let awards: ISbStoryData<RecognitionStoryblok>[];
</script>

{#if awards?.length > 0}
  <section>
    <div class="container mx-auto flex px-container">
      <div class="xl:max-w-3xl lg:w-1/4">
        <h2 class="text-4xl">{t('proposals.awards')}.</h2>
        <p class="text-4xl text-foreground-secondary">{t('proposals.awards.description')}</p>
      </div>
    </div>

    <div class="mt-10 md:mt-14 lg:mt-20 justify-between gap-12 lg:flex">
      <div class="flex flex-1 flex-col items-start">
        <div class="w-full flex-1">
          <ul use:drawerLinks>
            {#each awards as award}
              {@const href = `/${award.content.project.full_slug}`}
              <li
                class={clsx(
                  'block border-b first:border-t',
                  href ? 'transition-colors hover:bg-foreground-tertiary/10' : ''
                )}
              >
                <a
                  {href}
                  class="container mx-auto flex flex-col justify-between px-container py-5 lg:flex-row"
                >
                  <AwardsEntry
                    linkHref={href}
                    image={award.content.recognition.content.image}
                    label={award.content.recognition.content.label}
                    name={award.content.recognition.content.title}
                    year={award.content.year}
                    project={award.content.project.name}
                  ></AwardsEntry>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
{/if}
