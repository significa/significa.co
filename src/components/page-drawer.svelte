<script lang="ts">
  import clsx from 'clsx';
  import { page } from '$app/stores';
  import { setContext } from 'svelte';
  import { browser } from '$app/environment';
  import { fade, fly } from 'svelte/transition';

  import { Button, Spinner } from '@significa/svelte-ui';
  import { bodyLock, escapeKey } from '@significa/svelte-ui/actions';

  import { t } from '$lib/i18n';
  import { fetchPage } from '$lib/content';
  import { drawer } from '$lib/stores/drawer';

  import DynamicPage from '$components/pages/dynamic-page.svelte';

  let isSticky = true;
  let expanding = false;

  function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    isSticky = target.scrollTop !== 0;
  }

  setContext('drawer', true);
</script>

{#if $drawer && browser}
  <div
    use:escapeKey={{ id: 'page-drawer', callback: drawer.close }}
    use:bodyLock
    role="button"
    tabindex="0"
    on:keydown={(event) => {
      if (event.key === 'Escape') drawer.close();
    }}
    transition:fade|global={{ duration: 200 }}
    class="fixed inset-0 z-50 bg-black/50"
    on:click={drawer.close}
  />
  <div
    on:scroll={handleScroll}
    class="fixed bottom-2 left-2 right-2 top-2 transition z-50 overflow-y-auto scroll-smooth rounded-lg bg-background shadow-2xl md:left-auto md:w-3/4 lg:w-2/3"
    in:fly={{ x: 300, duration: 200 }}
    out:fly={{ x: expanding ? -300 : 300, duration: expanding ? 200 : 100 }}
  >
    <header
      class={clsx(
        'sticky bg-background top-0 left-0 z-50 flex items-center justify-between p-2 border-b motion-safe:transition-colors',
        isSticky ? 'border-b-background-offset' : 'border-b-transparent'
      )}
    >
      <Button
        as="a"
        href={$drawer}
        class="bg-background"
        variant="ghost"
        icon="expand"
        on:click={() => {
          expanding = true;
        }}
      >
        {t('expand')}
      </Button>

      <Button class="bg-background" variant="ghost" icon="close" on:click={drawer.close} />
    </header>
    <div>
      {#await fetchPage({ slug: $drawer, version: $page.data.version || 'published' })}
        <div class="flex justify-center p-10">
          <Spinner size="md" />
        </div>
      {:then page}
        <DynamicPage {page} />
      {/await}
    </div>
  </div>
{/if}
