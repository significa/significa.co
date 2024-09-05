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

  export let data;

  let sidebar = writable(false);

  afterNavigate(() => {
    sidebar.set(false);
  });

  $: openPanes = Object.values([...data.chapters.values()]).map((pages) => ({
    open: pages.some(
      (page) =>
        $pageStore.url.pathname === sanitizeSlug(page.full_slug) ||
        page.children?.some(
          (childrenPage) => $pageStore.url.pathname === sanitizeSlug(childrenPage.full_slug)
        )
    ),
    children: pages.map(
      (page) =>
        $pageStore.url.pathname === sanitizeSlug(page.full_slug) ||
        page.children?.some(
          (childrenPage) => $pageStore.url.pathname === sanitizeSlug(childrenPage.full_slug)
        )
    )
  }));
</script>

<div class="lg:container lg:mx-auto lg:px-container pb-20" use:bodyLock={sidebar}>
  <!-- Mobile: open menu -->
  <div
    class="sticky top-[--topnav-height] z-10 flex h-12 items-center border-b bg-background py-2 px-container lg:px-0 lg:hidden"
  >
    <TextButton iconLeft="hamburger" on:click={() => sidebar.set(true)}>
      {t('handbook')}
    </TextButton>
  </div>

  <div class="flex flex-col lg:flex-row gap-5">
    <aside
      class={clsx(
        'fixed top-[--topnav-height] bottom-0 z-10 w-full overflow-y-auto bg-background',
        'lg:relative lg:bottom-auto lg:top-auto lg:block lg:mt-24 lg:h-auto lg:w-72 lg:overflow-y-visible',
        $sidebar ? 'block' : 'hidden'
      )}
    >
      <!-- Mobile: close menu -->
      <div
        class="px-container fixed w-full top-[--topnav-height] z-10 flex h-12 items-center justify-between border-b bg-background py-2 lg:hidden"
      >
        <TextButton iconLeft="close" on:click={() => sidebar.set(false)}>{t('close')}</TextButton>

        <div class="flex items-center gap-1 text-sm font-medium leading-relaxed">
          <Icon icon="home" />
          <Link href={sanitizeSlug('/')}>
            {t('handbook.navigation.website')}
          </Link>
        </div>
      </div>

      <nav class="px-container lg:px-0 pt-[calc(var(--topnav-height))] lg:pt-4">
        <ul>
          {#each data.chapters.entries() as [title, pages], i}
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
              {title.substring(4)}
            </li>

            <ul class="mb-6" transition:slide={{ duration: 400, easing: circOut }}>
              {#each pages as page, j}
                <li
                  class={clsx(
                    'pl-6 py-1.5 border-l text-sm font-medium transition-all duration-300 flex items-center group',
                    $pageStore.url.pathname === sanitizeSlug(page.full_slug)
                      ? 'text-foreground'
                      : 'border-border text-foreground-secondary'
                  )}
                >
                  {#if page?.children?.length}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                      class={clsx(
                        'bg-background group-hover:bg-background-panel border border-background group-hover:border-border',
                        'cursor-pointer -ml-[37px] mr-3 rounded-xl p-1 transition-transform duration-300',
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
                    class="w-full mr-2 flex hover:text-foreground transition-color duration-300"
                    href={sanitizeSlug(page.full_slug)}
                  >
                    <span class="shrink-0">
                      {page.name}
                    </span>
                  </a>
                </li>

                {#if page.children?.length && openPanes[i].children[j] === true}
                  <ul transition:slide class="flex flex-col border-l pl-7 pb-2">
                    {#each page.children as children}
                      <li
                        class={clsx(
                          'pl-6 py-2 text-sm border-l font-medium cursor-pointer transition-all duration-300',
                          $pageStore.url.pathname === sanitizeSlug(children.full_slug)
                            ? 'border-foreground text-foreground-primary'
                            : 'border-border text-foreground-secondary'
                        )}
                      >
                        <a
                          class="hover:text-foreground transition-color duration-300"
                          href={sanitizeSlug(children.full_slug)}
                        >
                          {children.name}
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

    <main class="flex-1 mt-20 lg:mt-10">
      <slot />
    </main>
  </div>
</div>
