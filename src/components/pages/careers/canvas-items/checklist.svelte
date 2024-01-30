<script lang="ts">
  import { Confetti } from 'svelte-confetti';
  import clsx from 'clsx';
  import { CheckboxGroup } from '@significa/svelte-ui';
  import { CONFETTI_COLOR_ARRAY } from '$lib/constants';
  import type { CanvasChecklistStoryblok } from '$types/bloks';

  export let item: CanvasChecklistStoryblok;

  let selection: string[] = [];
</script>

<div
  class="absolute h-[394px] w-[280px] rounded-xs bg-background-panel shadow-md"
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate || 0}deg)"
>
  {#if selection.length === item.items?.length}
    <div class="absolute bottom-0 left-1/2">
      <Confetti
        delay={[300, 300]}
        amount="100"
        y={[0, 2]}
        x={[-1.1, 1.1]}
        duration="2000"
        size="8"
        colorArray={CONFETTI_COLOR_ARRAY}
      />
    </div>
  {/if}

  <svg
    width="81"
    height="25"
    viewBox="0 0 81 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="absolute -top-4 left-1/2 -translate-x-1/2 rotate-[3deg] text-border-active"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2536 0.115234V0.115998H70.8506V24.116H10.2445V24.1152H0.556641L5.11992 18.2377L0.556641 12.3601L5.11992 6.48258L0.556641 0.115234H10.2536ZM70.8537 24.1157V0.115718L80.5507 0.115719L75.9874 6.48307L80.5507 12.3606L75.9874 18.2382L80.5507 24.1157H70.8537Z"
      fill="currentColor"
    />
  </svg>

  <div class="h-full overflow-hidden">
    <div class="mb-3 grid h-[10px] grid-cols-12 gap-[4%] p-4">
      {#each [...Array(12)] as _}
        <div class="aspect-square rounded-full bg-background shadow-inner" />
      {/each}
    </div>

    <div
      class="mt-12 flex h-full flex-col"
      style="background-image: linear-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 32px 32px;"
    >
      <p class="-mt-8 px-4 text-xl font-semibold">{item.title}</p>

      <div class="mt-9 flex flex-col px-4">
        {#each item.items || [] as option, i}
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <!-- only gives warning because it doesn't recognise the input as a child -->
          <label class="flex h-8 w-full items-center gap-3">
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
                'after:absolute after:left-0 after:top-1/2 after:h-[1px] after:w-[0%] after:bg-foreground'
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
