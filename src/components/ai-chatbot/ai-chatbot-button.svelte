<script lang="ts">
  import { Icon, Spinner } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import Shellby from '$components/ai-chatbot/shellby.svelte';

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

<div class="group/button h-11 overflow-visible">
  <!-- Desktop layout: Shellby outside button -->
  <div class="hidden h-11 items-start gap-2 md:flex">
    <Shellby
      class="duration-250 h-[53.3px] w-auto transition-transform hover:rotate-12 hover:scale-110 group-hover/button:rotate-12 group-hover/button:scale-110"
    />
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
      class={twMerge(button, loading && '[&>*:not(.btn-spinner)]:opacity-0', className)}
      {...$$restProps}
    >
      {#if $$slots.default}
        <span
          class={clsx(
            arrow && [
              'transition-all',
              'duration-300',
              'ease-motion',
              'group-hover:-translate-x-5',
              'group-focus-visible:-translate-x-5'
            ]
          )}
        >
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
      'mt-2 md:hidden',
      loading && '[&>*:not(.btn-spinner)]:opacity-0',
      className
    )}
    {...$$restProps}
  >
    <div class="flex h-full items-center gap-1.5">
      <Shellby
        class="duration-250 h-11 w-auto transition-transform hover:rotate-12 hover:scale-110 group-hover/button:rotate-12 group-hover/button:scale-110"
      />
      {#if $$slots.default || mobileText}
        <span
          class={clsx(
            arrow && [
              'transition-all',
              'duration-300',
              'ease-motion',
              'group-hover:-translate-x-5',
              'group-focus-visible:-translate-x-5'
            ]
          )}
        >
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
    <Icon
      icon="arrow-right"
      class={clsx(
        'transition-transform',
        'duration-300',
        'ease-motion',
        'group-hover:-translate-x-2',
        'group-focus-visible:-translate-x-2',
        arrow && 'opacity-100'
      )}
    />
  </svelte:element>
</div>
