<script lang="ts">
  import { Button, Logo } from '@significa/svelte-ui';
</script>

<header class="container flex items-center justify-between py-4">
  <Logo class="mt-1" variant="wordmark" />

  <div class="flex items-center gap-4">
    <Button size="sm">Get in touch</Button>
    <Button size="sm" variant="secondary" icon="3dots" />
  </div>
</header>
