<script lang="ts">
  import { Button, Link } from '@significa/svelte-ui';

  export let loading = false;
</script>

<div class="mt-8 flex items-center justify-between">
  <div>
    <p class="leading-none text-foreground-secondary">Hate contact forms?</p>
    <Link class="mt-1 inline-flex" href="mailto:hello@significa.co">hello@significa.co</Link>
  </div>
  <Button type="submit" size="lg" arrow {loading} disabled={loading}>Send message</Button>
</div>
