<script lang="ts">
  import Heading from '$components/heading.svelte';
  import ProjectEntry from '$components/project-entry.svelte';
  import HeadingScope from '$components/heading-scope.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsStoryblok } from '$types/bloks';

  export let block: ProjectsStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-10 md:mt-14 lg:mt-20">
  <div class="container mx-auto px-container">
    <Heading offset={0} visual={2} class="text-5xl">{block.work_title}</Heading>
  </div>
  <div class="mt-4 md:mt-6 lg:mt-8">
    <HeadingScope offset={block.work_title ? 1 : 0}>
      {#each block.projects || [] as project}
        <ProjectEntry {project} />
      {/each}
    </HeadingScope>
  </div>
</section>
