<script lang="ts">
  import { drawerLinks } from '$lib/actions/drawer-links';
  import PasswordInput from './password-input.svelte';
  export let data;
</script>

{#if data.story}
  <h1>Hello from proposal {data.story.content.title}</h1>
  <p>{data.story.content.description}</p>
  <div use:drawerLinks>
    <a href="/about/ana-moreno">Ana moreno</a>
  </div>
{:else}
  <h1>Password</h1>
  <PasswordInput error={data.error === 'Wrong password'} />
  {#if data.error}
    <span class="text-error">{data.error}</span>
  {/if}
{/if}
