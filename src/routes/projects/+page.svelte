<script lang="ts">
  import ProjectsIndex from '$components/pages/projects-index.svelte';

  export let data;
</script>

<ProjectsIndex projects={data.projects} />
