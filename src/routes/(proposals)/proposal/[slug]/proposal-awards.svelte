<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import { getAnchorFromCmsLink } from '$lib/utils/cms';
  import type { AwardsEntryStoryblok } from '$types/bloks';
  import { t } from '$lib/i18n';
  import AwardsEntry from '$components/awards-entry.svelte';

  export let awards: AwardsEntryStoryblok[];
</script>

{#if awards?.length > 0}
  <section class=" pt-20 lg:pt-28">
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
              {@const { href, target, rel } = getAnchorFromCmsLink(award.link)}
              <li
                class={clsx(
                  'block border-b first:border-t',
                  href ? 'transition-colors hover:bg-foreground-tertiary/10' : ''
                )}
              >
                <a
                  {href}
                  {target}
                  {rel}
                  class="container mx-auto flex flex-col justify-between px-container py-5 lg:flex-row"
                >
                  <AwardsEntry
                    linkHref={href}
                    image={award.image}
                    label={award.label}
                    name={award.name}
                    project={award.project}
                    linkText={award.link_text}
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
