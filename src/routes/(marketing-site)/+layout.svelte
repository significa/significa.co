<script lang="ts">
  import '$styles/index.css';

  import { page } from '$app/stores';
  import TopNavigation from '$components/top-navigation.svelte';
  import Footer from '$components/footer.svelte';
  import { dev } from '$app/environment';

  export let data;
</script>

<svelte:head>
  {#if !dev && $page.data.version === 'published' && $page.url.host === 'significa.co'}
    <script src="/js/script.js" data-api="/api/event" data-domain="significa.co"></script>
    <script src="/js/script.actions.js" data-api="/api/event" data-domain="significa.co"></script>
    <script>
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
    </script>
  {/if}
</svelte:head>

<TopNavigation
  configuration={data.configuration.content}
  variant={$page.url.pathname.startsWith('/handbook') ? 'handbook' : 'default'}
/>
<slot />
{#if !$page.error}
  <Footer configuration={data.configuration.content} />
{/if}
