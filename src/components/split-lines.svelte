<script lang="ts">
  let className: undefined | string = undefined;
  export { className as class };
  export let as = 'p';
  export let text: string;
</script>

{#each text.split('\n') as line}
  {#if !line}
    <br />
  {:else}
    <svelte:element this={as} class={className}>{line}</svelte:element>
  {/if}
{/each}
