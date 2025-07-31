<script lang="ts">
  import Shellby from '$components/ai-chatbot/shellby.svelte';
  import SeggBinoculars from '$components/ai-chatbot/segg-binoculars.svelte';

  export let messages: { type: 'user' | 'shellby'; text: string }[] = [];
</script>

{#each messages as message}
  {#if message.type === 'user'}
    <div class="flex items-start justify-end gap-2">
      <div
        class="max-w-lg rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">{message.text}</span>
      </div>
      <SeggBinoculars class="h-10 w-auto shrink-0 lg:h-12" />
    </div>
  {:else}
    <div class="flex items-start gap-2">
      <Shellby class="h-12 w-auto shrink-0 lg:h-14" />
      <div
        class="max-w-lg rounded-[18px] border-2 border-background-offset bg-background-panel p-3"
      >
        <span class="text-sm">{message.text}</span>
      </div>
    </div>
  {/if}
{/each}
