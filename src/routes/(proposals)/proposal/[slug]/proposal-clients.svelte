<script lang="ts">
  import type { ClientLogoStoryblok } from '$types/bloks';
  import { t } from '$lib/i18n';
  import Clients from '$components/clients.svelte';

  export let clients: ClientLogoStoryblok[];
</script>

<section class=" container mx-auto px-container pb-16 pt-20 lg:pb-20 lg:pt-40">
  <h3 class="text-center text-2xl text-foreground-secondary">
    {t('proposals.clients.description')}
  </h3>

  <Clients {clients}></Clients>
</section>
