<script lang="ts">
  import type { PageStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let story: ISbStoryData<PageStoryblok>;
</script>

<div class="container">
  <h1>
    Hello from page: <pre>{story.name}</pre>
  </h1>
</div>
