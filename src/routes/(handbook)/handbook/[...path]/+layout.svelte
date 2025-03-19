<script lang="ts">
  import { page as pageStore } from '$app/stores';
  import clsx from 'clsx';
  import { Icon, Link, TextButton } from '@significa/svelte-ui';
  import plus from '$assets/plus.svg?raw';
  import { slide } from 'svelte/transition';
  import { bodyLock } from '@significa/svelte-ui/actions';
  import { writable } from 'svelte/store';
  import { afterNavigate } from '$app/navigation';
  import { t } from '$lib/i18n';
  import { circOut } from 'svelte/easing';
  import { sanitizeSlug } from '$lib/utils/paths.js';
  import type { HandbookLevelStoryblok } from '$types/bloks';
  export let data;

  let sidebar = writable(false);

  afterNavigate(() => {
    sidebar.set(false);
  });

  $: openPanes = data.hierarchy
    .map((chapter: HandbookLevelStoryblok) => chapter.children)
    .map((subchapters: HandbookLevelStoryblok[]) => ({
      open: subchapters.some(
        (subchapter: HandbookLevelStoryblok) =>
          $pageStore.url.pathname === sanitizeSlug(subchapter.homepage.full_slug) ||
          subchapter.children?.some(
            (childrenPage: HandbookLevelStoryblok) =>
              $pageStore.url.pathname === sanitizeSlug(childrenPage.homepage.full_slug)
          )
      ),
      children: subchapters.map(
        (subchapter) =>
          $pageStore.url.pathname === sanitizeSlug(subchapter.homepage.full_slug) ||
          subchapter.children?.some(
            (childrenPage) =>
              $pageStore.url.pathname === sanitizeSlug(childrenPage.homepage.full_slug)
          )
      )
    }));
</script>

<div class="pb-20 lg:container lg:mx-auto lg:px-container" use:bodyLock={sidebar}>
  <!-- Mobile: open menu -->
  <div
    class="sticky top-[--topnav-handbook-mobile-height] z-10 flex h-12 items-center border-b bg-background px-container py-2 md:top-[--topnav-height] lg:hidden lg:px-0"
  >
    <TextButton iconLeft="hamburger" on:click={() => sidebar.set(true)}>
      {t('handbook')}
    </TextButton>
  </div>

  <div class="flex flex-col gap-5 lg:flex-row">
    <aside
      class={clsx(
        'fixed bottom-0 top-[--topnav-handbook-mobile-height] z-10 w-full overflow-y-auto bg-background md:top-[--topnav-height]',
        'lg:relative lg:bottom-auto lg:top-auto lg:mt-24 lg:block lg:h-auto lg:w-72 lg:overflow-y-visible',
        $sidebar ? 'block' : 'hidden'
      )}
    >
      <!-- Mobile: close menu -->
      <div
        class="fixed top-[--topnav-handbook-mobile-height] z-10 flex h-12 w-full items-center justify-between border-b bg-background px-container py-2 md:top-[--topnav-height] lg:hidden"
      >
        <TextButton iconLeft="close" on:click={() => sidebar.set(false)}>{t('close')}</TextButton>

        <div class="flex items-center gap-1 text-sm font-medium leading-relaxed">
          <Icon icon="home" />
          <Link href={sanitizeSlug('/')}>
            {t('handbook.navigation.website')}
          </Link>
        </div>
      </div>

      <nav class="px-container pt-[calc(var(--topnav-height))] lg:px-0 lg:pt-4">
        <ul>
          {#each data.hierarchy as chapter, i}
            <li
              transition:slide
              class={clsx(
                'flex items-center py-2',
                'text-sm font-bold  transition-all duration-300',
                openPanes[i].open === true
                  ? 'border-foreground text-foreground'
                  : 'border-border text-foreground-secondary'
              )}
            >
              {#if chapter.homepage}
                <a
                  class={clsx(
                    'transition-color mr-2 flex w-full duration-300 hover:text-foreground',
                    $pageStore.url.pathname === sanitizeSlug(chapter.homepage.full_slug) &&
                      'text-foreground'
                  )}
                  href={sanitizeSlug(chapter.homepage.full_slug)}
                >
                  <span class="shrink-0">
                    {chapter.name}
                  </span>
                </a>
              {:else}
                {chapter.name}
              {/if}
            </li>
            <ul class="mb-6" transition:slide={{ duration: 400, easing: circOut }}>
              {#each chapter.children as subchapter, j}
                <li
                  class={clsx(
                    'group flex items-center border-l py-1.5 pl-6 text-sm font-medium transition-all duration-300',
                    $pageStore.url.pathname === sanitizeSlug(subchapter.homepage.full_slug)
                      ? 'text-foreground'
                      : 'border-border text-foreground-secondary'
                  )}
                >
                  {#if subchapter?.children?.length}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                      class={clsx(
                        'border border-background bg-background group-hover:border-border group-hover:bg-background-panel',
                        '-ml-[37px] mr-3 cursor-pointer rounded-xl p-1 transition-transform duration-300',
                        openPanes[i].children[j] === true && 'rotate-45'
                      )}
                      on:click={() => {
                        openPanes[i].children[j] = !openPanes[i].children[j];
                      }}
                    >
                      <!-- eslint-disable svelte/no-at-html-tags -->
                      {@html plus}
                    </div>
                  {/if}
                  <a
                    class="transition-color mr-2 flex w-full duration-300 hover:text-foreground"
                    href={sanitizeSlug(subchapter.homepage.full_slug)}
                  >
                    <span class="shrink-0">
                      {subchapter.name}
                    </span>
                  </a>
                </li>

                {#if subchapter.children?.length && openPanes[i].children[j] === true}
                  <ul transition:slide class="flex flex-col border-l pb-2 pl-7">
                    {#each subchapter.children as child}
                      <li
                        class={clsx(
                          'cursor-pointer border-l py-2 pl-6 text-sm font-medium transition-all duration-300',
                          $pageStore.url.pathname === sanitizeSlug(child.homepage.full_slug)
                            ? 'text-foreground-primary border-foreground'
                            : 'border-border text-foreground-secondary'
                        )}
                      >
                        <a
                          class="transition-color duration-300 hover:text-foreground"
                          href={sanitizeSlug(child.homepage.full_slug)}
                        >
                          {child.name}
                        </a>
                      </li>
                    {/each}
                  </ul>
                {/if}
              {/each}
            </ul>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="mt-36 flex-1 md:mt-20 lg:mt-10">
      <slot />
    </main>
  </div>
</div>
