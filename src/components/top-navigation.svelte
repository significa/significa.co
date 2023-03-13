<script lang="ts">
  import { page } from '$app/stores';
  import { Button, Logo } from '@significa/svelte-ui';
  import clsx from 'clsx';
</script>

<header
  class={clsx(
    'flex items-center justify-between py-4',
    // we could achieve this with route groups and a different layout, but it's so simple that we'll leave it like this for now
    $page.url.pathname.startsWith('/handbook') ? 'px-container' : 'container'
  )}
>
  <Logo class="mt-1" variant="wordmark" />

  <div class="flex items-center gap-4">
    <Button size="sm">Get in touch</Button>
    <Button size="sm" variant="secondary" icon="3dots" />
  </div>
</header>
