<script lang="ts">
  import type { GetAQuotePageStoryblok } from '$types/bloks';
  import Form from './form.svelte';
  import Images from './images.svelte';
  import Steps from './steps.svelte';
  import Timezone from './timezone.svelte';

  export let page: GetAQuotePageStoryblok;
</script>

<Form {page} />
<Timezone {page} />
<Steps {page} />
<Images {page} />
