<script lang="ts">
  import ProjectTwoColumnsEntry from '$components/project-two-columns-entry.svelte';
  import { storyblokEditable } from '$lib/actions/storyblok-editable';
  import type { ProjectsTwoColumnsStoryblok } from '$types/bloks';

  export let block: ProjectsTwoColumnsStoryblok;

  import triangle from '$assets/triangle-measurement.svg';
</script>

<section use:storyblokEditable={block} class="mt-4 md:mt-6 lg:mt-12 border-y">
  <div class="container mx-auto px-container grid grid-cols-[50%_50%]">
    {#each block.project || [] as project}
      {@const projectItem = project.project}
      <div class={'first:pr-8 first:border-r last:pl-8'}>
        <ProjectTwoColumnsEntry project={projectItem} />
      </div>
    {/each}
  </div>
  <div class="border-t">
    <div class="container mx-auto px-container grid grid-cols-[50%_50%]">
      {#each block.project || [] as measurement}
        <div class="flex first:pr-8 first:border-r last:pl-8 py-6">
          {#each measurement.measurements || [] as measurements}
            <div class="flex flex-col mr-3 w-24">
              <p class="text-xs text-foreground-secondary font-medium uppercase">
                {measurements.title}
              </p>
              <div class="flex">
                <p class="text-3xl font-semibold">{measurements.value}%</p>
                <img class="max-h-2.5 mt-2 ml-1.5" src={triangle} alt={measurements.title} />
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>
