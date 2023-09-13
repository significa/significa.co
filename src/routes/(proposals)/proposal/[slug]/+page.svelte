<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import PasswordForm from './password-form.svelte';
  export let data;
</script>

{#if data.story}
  <h1>Hello from proposal {data.story.content.title}</h1>
  <p>{data.story.content.description}</p>
  <div use:drawerLinks>
    <a href="/about/ana-moreno">Ana moreno</a>
  </div>
{:else}
  <PasswordForm error={data.error} />
{/if}
