<script lang="ts">
  import clsx from 'clsx';

  export let variant: 'fit-content' | 'default' = 'default';
  export let alignment: 'auto' | 'default' | 'left' | 'center' | 'right' = 'default';
  let visible: boolean = false;

  let targetRef: HTMLButtonElement | null = null;
  let popoverRef: HTMLDivElement | null = null;
  let autoAlignment: 'left' | 'center' | 'right' = 'center';

  function chooseBestAlignment() {
    if (!targetRef || !popoverRef) return;
    const targetRect = targetRef.getBoundingClientRect();
    const popoverRect = popoverRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const spaceLeft = targetRect.left;
    const spaceRight = viewportWidth - targetRect.right;
    const popoverWidth = popoverRect.width;

    if (
      targetRect.left + targetRect.width / 2 - popoverWidth / 2 > 0 &&
      targetRect.right - targetRect.width / 2 + popoverWidth / 2 < viewportWidth
    ) {
      autoAlignment = 'center';
    } else if (spaceRight > spaceLeft) {
      autoAlignment = 'left';
    } else {
      autoAlignment = 'right';
    }
  }

  $: if (alignment === 'auto' && visible) {
    chooseBestAlignment();
  }

  $: alignmentClass =
    alignment === 'left' || (alignment === 'auto' && autoAlignment === 'left')
      ? 'left-0'
      : alignment === 'center' || (alignment === 'auto' && autoAlignment === 'center')
        ? 'left-1/2 -translate-x-1/2'
        : alignment === 'right' || (alignment === 'auto' && autoAlignment === 'right')
          ? 'right-0'
          : variant === 'default'
            ? 'left-[25%]  lg:-left-[90%]'
            : 'left-1/2 -translate-x-1/2 ';
</script>

<div class="{$$restProps.class || ''} relative">
  <button
    bind:this={targetRef}
    class="cursor-pointer text-left"
    on:mouseenter={() => (visible = true)}
    on:mouseleave={() => (visible = false)}
    on:touchstart={() => (visible = !visible)}
    on:keydown={(event) => {
      if (event.key === 'Escape') visible = false;
      if (event.key === 'Enter' || event.key === 'Space') visible = true;
    }}
  >
    <slot name="target" />
  </button>
  {#if $$slots['popover']}
    <div
      bind:this={popoverRef}
      class={clsx(
        'absolute top-0 z-10 p-4',
        'bg-background text-foreground-secondary',
        'rounded-2xs border transition-all',
        alignmentClass,
        visible ? 'block opacity-100' : 'top-4 opacity-0',
        variant === 'default' ? 'w-72 lg:-top-[90%]' : 'w-auto -translate-y-full text-center '
      )}
    >
      <slot name="popover" />
    </div>
  {/if}
</div>
