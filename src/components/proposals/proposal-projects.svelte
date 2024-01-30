<script lang="ts">
  import ProjectEntry from '$components/project-entry.svelte';
  import type { ProjectStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';
  import { t } from '$lib/i18n';
  import { drawerLinks } from '$lib/actions/drawer-links';

  export let projects: ISbStoryData<ProjectStoryblok>[];
</script>

{#if projects?.length > 0}
  <section class="mt-10 md:mt-14 lg:mt-20">
    <div class="container mx-auto px-container">
      <div class="xl:max-w-3xl lg:w-1/3">
        <h2 class="text-4xl">{t('proposals.projects')}.</h2>
      </div>
    </div>
    <div class="mt-4 md:mt-6 lg:mt-8" use:drawerLinks>
      {#each projects as project}
        <ProjectEntry {project} />
      {/each}
    </div>
  </section>
{/if}
