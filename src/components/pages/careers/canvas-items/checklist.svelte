<script lang="ts">
  import type { CanvasChecklistStoryblok } from '$types/bloks';
  import { CheckboxGroup } from '@significa/svelte-ui';
  import clsx from 'clsx';

  export let item: CanvasChecklistStoryblok;

  let selection: string[] = [];
</script>

<div class="absolute h-[394px] w-[280px] rounded-xs bg-background-panel shadow-md">
  <svg
    width="81"
    height="25"
    viewBox="0 0 81 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="absolute -top-4 left-[50%] -translate-x-[50%] rotate-[3deg] text-border-active"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2536 0.115234V0.115998H70.8506V24.116H10.2445V24.1152H0.556641L5.11992 18.2377L0.556641 12.3601L5.11992 6.48258L0.556641 0.115234H10.2536ZM70.8537 24.1157V0.115718L80.5507 0.115719L75.9874 6.48307L80.5507 12.3606L75.9874 18.2382L80.5507 24.1157H70.8537Z"
      fill="currentColor"
    />
  </svg>

  <div class="h-[100%] overflow-hidden">
    <div class="mb-3 grid h-[10px] grid-cols-12 gap-[4%] p-4">
      {#each [...Array(12)] as _}
        <div class="aspect-square rounded-full bg-background shadow-inner" />
      {/each}
    </div>

    <div
      class="mt-12 flex h-[100%] flex-col"
      style="background-image: linear-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 32px 32px;"
    >
      <p class="-mt-8 px-4 text-xl font-semibold">{item.title}</p>

      <div class="mt-9 flex flex-col px-4">
        {#each item.items || [] as option, i}
          <label for={i.toString()} class="flex h-8 w-full items-center gap-3">
            <CheckboxGroup
              bind:group={selection}
              id={i.toString()}
              value={option.text ?? ''}
              class={clsx(
                option.text && selection.includes(option.text) && '[&+p:after]:animate-strike'
              )}
            />
            <p
              class={clsx(
                'relative font-medium leading-none',
                'after:absolute after:left-0 after:top-[50%] after:h-[1px] after:w-[0%] after:bg-white'
              )}
            >
              {option.text}
            </p>
          </label>
        {/each}
      </div>
    </div>
  </div>
</div>
