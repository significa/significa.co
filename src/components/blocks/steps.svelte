<script lang="ts">
  import type { StepsStoryblok } from '$types/bloks';
  import Steps from '$components/pages/get-a-quote/steps.svelte';

  export let block: StepsStoryblok;
</script>

<Steps page={block} variant="block" />
