<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
</script>

<svelte:head>
  {#if !dev && $page.data.version === 'published' && $page.url.host === 'significa.co'}
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11144833772"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'AW-11144833772');
    </script>
    {#if $page.url.pathname === '/services'}
      <script>
        gtag('event', 'conversion', { send_to: 'AW-11144833772/qEClCJ-Z5OAYEOzVosIp' });
      </script>
    {/if}
  {/if}
</svelte:head>
