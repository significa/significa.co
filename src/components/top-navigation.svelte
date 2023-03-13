<script lang="ts">
  import { page } from '$app/stores';
  import { Button, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import AnHandAndABook from './an-hand-and-a-book.svelte';
</script>

<header
  class={clsx(
    'flex items-center justify-between py-4',
    // we could achieve this with route groups and a different layout, but it's so simple that we'll leave it like this for now
    $page.url.pathname.startsWith('/handbook') ? 'px-container' : 'container'
  )}
>
  <div class="flex items-center gap-2">
    <a href="/">
      <Logo class="mt-1" variant="wordmark" />
    </a>
    {#if $page.url.pathname.startsWith('/handbook')}
      <AnHandAndABook />
    {/if}
  </div>

  <div class="flex items-center gap-4">
    <Button size="sm">Get in touch</Button>
    <Button size="sm" variant="secondary" icon="3dots" />
  </div>
</header>
