<script lang="ts">
  import Form from '$components/pages/get-a-quote/form.svelte';
  import type { FormBudgetRangeStoryblok } from '$types/bloks';

  export let block: FormBudgetRangeStoryblok;
</script>

<Form page={block} />
