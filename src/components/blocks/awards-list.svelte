<script lang="ts">
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { AwardsListStoryblok } from '$types/bloks';
  import { page } from '$app/stores';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import clsx from 'clsx';
  import AwardsEntry from '$components/awards-entry.svelte';

  export let block: AwardsListStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14">
  <div class="container mx-auto flex px-container">
    <div class="xl:max-w-3xl">
      <h3 class="text-5xl text-foreground-secondary">{block.title}</h3>
      <p class="text-5xl">{block.description}</p>
    </div>
  </div>
</section>

<!-- Awards -->
{#if $page.data.awards.length}
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="justify-between gap-12 lg:flex">
      <div class="flex flex-1 flex-col items-start">
        <div class="w-full flex-1">
          <ul use:drawerLinks>
            {#each $page.data.awards as award}
              {@const href = award.content.project.full_slug}
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
