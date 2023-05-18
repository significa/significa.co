<script lang="ts">
  export let as = 'p';
  export let text: string;
</script>

{#each text.split('\n') as line}
  {#if !line}
    <br />
  {:else}
    <svelte:element this={as} class={$$restProps.class} style={$$restProps.style}
      >{line}</svelte:element
    >
  {/if}
{/each}
