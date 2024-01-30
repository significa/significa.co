<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import TopNavigation from '$components/top-navigation.svelte';
  import Footer from '$components/footer.svelte';
  import { browser } from '$app/environment';

  import { PUBLIC_POSTHOG_PROJECT_TOKEN } from '$env/static/public';
  import posthog from 'posthog-js';

  if (browser) {
    posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
      api_host: 'https://eu.posthog.com',
      persistence: 'localStorage'
    });
  }

  export let data;
</script>

<TopNavigation
  configuration={data.configuration.content}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
