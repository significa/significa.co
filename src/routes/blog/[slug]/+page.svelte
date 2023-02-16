<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Hello from blog post: {data.story.name}</h1>
