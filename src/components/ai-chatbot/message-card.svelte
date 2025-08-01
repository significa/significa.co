<script lang="ts">
  import Shellby from '$components/ai-chatbot/shellby.svelte';
  import SeggBinoculars from '$components/ai-chatbot/segg-binoculars.svelte';

  export let type: 'user' | 'shellby';
  export let loading: boolean = false;
  export let text: string | undefined = undefined;
</script>

{#if type === 'user'}
  <div class="flex items-start justify-end gap-2">
    <div class="max-w-lg rounded-[18px] border-2 border-background-offset bg-background-panel p-3">
      <span class="text-sm">{text}</span>
    </div>
    <SeggBinoculars class="h-10 w-auto shrink-0 lg:h-12" />
  </div>
{:else}
  <div class="flex items-start gap-2">
    <Shellby class="h-12 w-auto shrink-0 lg:h-14" />
    <div class="max-w-lg rounded-[18px] border-2 border-background-offset bg-background-panel p-3">
      {#if loading}
        <div class="flex flex-col gap-2">
          <div
            class="h-2.5 w-40 animate-pulse rounded-xs bg-background-offset md:h-3 md:w-60 lg:h-3.5 lg:w-96"
          ></div>
          <div
            class="h-2.5 w-12 animate-pulse rounded-xs bg-background-offset md:h-3 md:w-24 lg:h-3.5 lg:w-48"
          ></div>
          <div
            class="h-2.5 w-24 animate-pulse rounded-xs bg-background-offset md:h-3 md:w-36 lg:h-3.5 lg:w-72"
          ></div>
        </div>
      {:else}
        <span class="text-sm">{text}</span>
      {/if}
    </div>
  </div>
{/if}
