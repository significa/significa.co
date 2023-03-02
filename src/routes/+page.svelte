<script lang="ts">
  import { t } from '$lib/i18n';
  import { Button } from '@significa/svelte-ui';
</script>

<div>
  <h1 class="text-5xl font-medium text-error">
    {t('hello')} Significa
  </h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
  <Button variant="secondary" icon="handbook" arrow>Hello world</Button>
</div>

<style lang="postcss">
  div {
    margin: theme('spacing.4');
  }
</style>
