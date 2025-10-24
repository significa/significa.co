<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import { t } from '$lib/i18n';
  import AwardsEntry from '$components/awards-entry.svelte';

  // Awards from WordPress
  export let awards: any[];
</script>

{#if awards?.length > 0}
  <section>
    <div class="container mx-auto flex px-container">
      <div class="lg:w-1/4 xl:max-w-3xl">
        <h2 class="text-4xl">{t('proposals.awards')}.</h2>
        <p class="text-4xl text-foreground-secondary">{t('proposals.awards.description')}</p>
      </div>
    </div>

    <div class="mt-10 justify-between gap-12 md:mt-14 lg:mt-20 lg:flex">
      <div class="flex flex-1 flex-col items-start">
        <div class="w-full flex-1">
          <ul use:drawerLinks>
            {#each awards as award}
              {@const project = award.acf?.project}
              {@const recognition = award.acf?.recognition}
              {@const href = project?.slug ? `/projects/${project.slug}` : '#'}
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
                    image={recognition?.image}
                    label={recognition?.label}
                    name={recognition?.title}
                    year={award.acf?.year}
                    project={project?.title || ''}
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
