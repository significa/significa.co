<script lang="ts">
  import ProjectTwoColumnsEntry from '$components/project-two-columns-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsTwoColumnsStoryblok } from '$types/bloks';
  import clsx from 'clsx';

  export let block: ProjectsTwoColumnsStoryblok;
</script>

<section use:storyblokEditable={block} class="mt-4 md:mt-6 lg:mt-12 border-t">
  <div class="container mx-auto px-container grid grid-cols-[50%_50%]">
    {#each block.projects || [] as project}
      <div class={clsx('first:pr-8 first:border-r last:pl-8')}>
        <ProjectTwoColumnsEntry {project} />
      </div>
    {/each}
  </div>
</section>
