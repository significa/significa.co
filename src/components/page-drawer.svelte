<script lang="ts">
  import DynamicPage from '$components/pages/dynamic-page.svelte';
  import { bodyLock } from '$lib/actions/body-lock';
  import { t } from '$lib/i18n';
  import { drawer } from '$lib/stores/drawer';
  import { fetchPage, getClientSideSBVersion } from '$lib/storyblok';
  import { Button, Spinner } from '@significa/svelte-ui';
  import { fade, fly } from 'svelte/transition';
  import { items } from './image-gallery.svelte';

  const onkeydown = (e: KeyboardEvent) => {
    if (!$drawer) return;

    // not very elegant, but if the image gallery is open, ESC should close it (and not the drawer)
    // we should probably have a centralized way to handle this, instead of ad-hoc solutions for every possible element on top of the drawer
    if ($items.length) return;

    if (e.key === 'Escape') drawer.close();
  };
</script>

<svelte:window on:keydown={onkeydown} />

{#if $drawer}
  <div
    use:bodyLock
    role="button"
    on:keydown={onkeydown}
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 z-50 bg-black/50"
    on:click={drawer.close}
  />
  <div
    class="fixed right-2 top-2 bottom-2 left-2 z-50 overflow-y-auto scroll-smooth rounded-lg bg-background shadow-2xl md:left-auto md:w-3/4 lg:w-2/3"
    transition:fly={{ x: 300, duration: 200 }}
  >
    <header class="z-50 flex items-center justify-between p-2">
      <Button
        as="a"
        href={$drawer}
        class="bg-background"
        variant="ghost"
        icon="expand"
        on:click={drawer.close}>{t('expand')}</Button
      >
      <Button class="bg-background" variant="ghost" icon="close" on:click={drawer.close} />
    </header>
    <div class="p-4 md:p-6 lg:p-10">
      {#await fetchPage({ slug: $drawer, version: getClientSideSBVersion() })}
        <div class="flex justify-center p-10">
          <Spinner size="md" />
        </div>
      {:then page}
        <DynamicPage {page} />
      {/await}
    </div>
  </div>
{/if}
