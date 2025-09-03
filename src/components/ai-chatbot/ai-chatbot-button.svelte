<script lang="ts">
  import { Icon, Spinner } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import Shellby from '$components/ai-chatbot/icons/shellby.svelte';

  const button = `
    group
    relative

    inline-flex
    items-center
    justify-center
    gap-1.5

    overflow-hidden
    whitespace-nowrap

    font-medium
    leading-none

    outline-none

    transition-all

    hover:ring-4
    focus-visible:ring-4

    active:scale-[0.98]
    active:ring-2

    disabled:pointer-events-none
    disabled:opacity-60

    h-11
    rounded-sm
    rounded-bl-[3px]
    px-3.5

    border
    border-border

    bg-white
    text-foreground
  `;

  const mobileButton = `
    group
    relative

    inline-flex
    items-center
    justify-between
    gap-1.5

    overflow-hidden
    whitespace-nowrap

    font-medium
    leading-none

    outline-none

    transition-all

    disabled:pointer-events-none
    disabled:opacity-60

    w-full
    h-11

    text-foreground
  `;

  let className: undefined | string = undefined;
  export { className as class };
  export let disabled: undefined | boolean = undefined;
  export let as: undefined | 'button' | 'a' = 'button';
  export let loading: undefined | boolean = false;
  export let arrow: undefined | boolean = false;
  export let mobileText: undefined | string = undefined;
</script>

<div class="h-11">
  <!-- Desktop layout: Shellby outside button -->
  <!-- For peer to work, the peer must come before the element it is peer of. That's why the icon is after the element and why we use flex-row-reverse -->
  <div class="hidden h-11 items-start gap-2 md:flex md:flex-row-reverse">
    <svelte:element
      this={as}
      role="button"
      tabindex={0}
      on:click
      on:mouseenter
      on:mouseleave
      on:keydown
      on:keyup
      on:keypress
      on:focus
      on:blur
      {disabled}
      class={twMerge(button, loading && '[&>*:not(.btn-spinner)]:opacity-0', className, 'peer')}
      {...$$restProps}
    >
      {#if $$slots.default}
        <span>
          <slot />
        </span>
      {/if}
      {#if loading}
        <div
          class={clsx(
            'btn-spinner',
            'absolute',
            'left-1/2',
            'top-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2'
          )}
        >
          <Spinner size="xs" />
        </div>
      {/if}
    </svelte:element>

    <Shellby
      class="duration-250 h-[53.3px] w-auto transition-transform peer-hover:rotate-12 peer-hover:scale-110"
    />
  </div>

  <!-- Mobile layout: Shellby inside button, full width -->
  <svelte:element
    this={as}
    role="button"
    tabindex={0}
    on:click
    on:mouseenter
    on:mouseleave
    on:keydown
    on:keyup
    on:keypress
    on:focus
    on:blur
    {disabled}
    class={twMerge(
      mobileButton,
      'md:hidden',
      loading && '[&>*:not(.btn-spinner)]:opacity-0',
      className
    )}
    {...$$restProps}
  >
    <div class="flex h-full items-center gap-1.5">
      <Shellby class=" h-11 w-auto  " />
      {#if $$slots.default || mobileText}
        <span>
          {#if mobileText}
            {mobileText}
          {:else}
            <slot />
          {/if}
        </span>
      {/if}
    </div>
    {#if loading}
      <div
        class={clsx(
          'btn-spinner',
          'absolute',
          'left-1/2',
          'top-1/2',
          '-translate-x-1/2',
          '-translate-y-1/2'
        )}
      >
        <Spinner size="xs" />
      </div>
    {/if}
    <Icon icon="arrow-right" class={clsx(arrow && 'opacity-100')} />
  </svelte:element>
</div>
