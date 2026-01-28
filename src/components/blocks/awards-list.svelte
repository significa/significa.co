<script lang="ts">
  import AwardsEntry from '$components/awards-entry.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { AwardsListStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: AwardsListStoryblok;

  import { getAwards } from '$lib/content';
  import { t } from '$lib/i18n';
  import { sumArray } from '$lib/utils/array';
  import { Button } from '@significa/svelte-ui';
  import { createInfiniteQuery } from '@tanstack/svelte-query';

  let previousData: { awards: AwardsEntry[]; total: number }[] | undefined;
  $: itemsPerPage = (block.items_per_page && +block.items_per_page) || 12;

  $: query = createInfiniteQuery<{ awards: AwardsEntry[]; total: number }>({
    staleTime: 5 * 60 * 1000,
    queryKey: ['awards'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getAwards({
        per_page: itemsPerPage,
        page: Number(pageParam)
      });

      return { awards: res?.data.stories || [], total: res?.total || 0 };
    },
    getNextPageParam: (prev, pages) => {
      const dataLength = sumArray(pages, (page) => page.awards.length);
      if (dataLength < prev.total) {
        return pages.length + 1;
      }

      return undefined;
    }
  });

  $: hasResults = !!$query.data?.pages.some((page) => page.awards.length > 0);

  $: if ($query.data?.pages) {
    previousData = $query.data?.pages;
  }
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
<section class="mt-10 md:mt-14 lg:mt-20">
  <div class="justify-between gap-12 lg:flex">
    <div class="flex flex-1 flex-col items-start">
      <div class="w-full flex-1">
        <ul use:drawerLinks>
          {#if $query.isLoading && !hasResults}
            {#each Array(itemsPerPage) as _}
              <!-- Award Skeleton   -->
              <li class="block border-b first:border-t">
                <div
                  class="container mx-auto flex flex-col items-center justify-between px-container py-5 lg:flex-row"
                >
                  <div class="flex w-full flex-col-reverse items-center lg:flex-row">
                    <div class="mb-4 flex w-full items-center lg:mb-0">
                      <div
                        class="mr-2 h-14 w-14 animate-pulse rounded-xs bg-foreground-tertiary/20"
                      ></div>
                      <div class="ml-4 flex-col">
                        <div
                          class="rounded mb-1 h-4 w-24 animate-pulse bg-foreground-tertiary/20"
                        ></div>
                        <div class="rounded h-4 w-32 animate-pulse bg-foreground-tertiary/20"></div>
                      </div>
                    </div>
                    <div class="mb-4 w-full lg:mb-0">
                      <div class="rounded h-8 w-48 animate-pulse bg-foreground-tertiary/20"></div>
                    </div>
                  </div>
                  <div class="w-1/3">
                    <div class="flex-1 justify-end text-foreground-tertiary xl:flex">
                      <div class="rounded h-10 w-32 animate-pulse bg-foreground-tertiary/20"></div>
                    </div>
                  </div>
                </div>
              </li>
            {/each}
          {/if}

          {#if $query.data?.pages}
            {#each $query.data?.pages as page}
              {#each page.awards || previousData || [] as award}
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
                    />
                  </a>
                </li>
              {/each}
            {/each}
          {/if}
        </ul>
      </div>
    </div>
  </div>

  {#if $query.hasNextPage}
    <div class="container mx-auto flex px-container">
      <Button
        class="mt-10"
        variant="secondary"
        on:click={() => $query.fetchNextPage()}
        loading={$query.isFetchingNextPage}
      >
        {t('blog.load-more')}
      </Button>
    </div>
  {/if}
</section>
