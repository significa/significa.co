<script lang="ts">
  import type { TeamMemberStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let story: ISbStoryData<TeamMemberStoryblok>;
</script>

<div class="container">
  <h1>
    Hello from team-member: <pre>{story.name}</pre>
  </h1>
</div>
