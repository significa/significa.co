<script lang="ts">
  import type { HandbookStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let story: ISbStoryData<HandbookStoryblok>;
</script>

<div class="container">
  <h1>
    Hello from handbook: <pre>{story.name}</pre>
  </h1>
</div>
