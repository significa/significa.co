<script lang="ts">
  import Seo from '$components/seo.svelte';
  import { drawerLinks } from '$lib/actions/drawer-links.js';
  import { Button, Input } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { fade } from 'svelte/transition';
  import { createBreakpointMediaQueryStore } from '$lib/stores/media';

  let searchInputValue = '';
  const desktop = createBreakpointMediaQueryStore('md');
</script>

<Seo
  title="placeholder"
  description="placeholder"
  image="placeholder"
  structureDataMarkup="placeholder"
/>
<div use:drawerLinks class="container mx-auto px-container">
  <div class="rich-text mx-auto mb-20 mt-10 max-w-2xl lg:mt-20">
    <!-- MESSAGE INPUT -->
    <form id="search-form" class="relative mb-6 flex gap-2">
      <Input
        bind:value={searchInputValue}
        class={clsx('pr-20')}
        placeholder={$desktop ? 'Search! Because asking in Slack is overrated.' : 'Search!'}
        size="lg"
      />

      {#if searchInputValue}
        <div
          transition:fade={{ duration: 100 }}
          class="absolute right-1.5 top-1/2 -translate-y-1/2"
        >
          <Button type="submit" size="md" icon="handbook" variant="primary">Send</Button>
        </div>
      {/if}
    </form>
  </div>
</div>
