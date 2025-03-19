<script lang="ts">
  import ProjectEntry from '$components/project-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsStoryblok } from '$types/bloks';

  export let block: ProjectsStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <h2 class="text-5xl">{block.work_title}</h2>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    {#each block.projects || [] as project}
      <ProjectEntry {project} />
    {/each}
  </div>
</section>
