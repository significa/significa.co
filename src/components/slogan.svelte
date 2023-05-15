<script lang="ts">
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  let className: undefined | string = undefined;
  export { className as class };
  export let as: undefined | string = 'p';
  // not passing `animate` will render the slogan immediately. passing in a boolean will control the animation.
  export let animate: undefined | boolean = undefined;
  const dispatch = createEventDispatcher<{ end: undefined }>();

  let source: string[] = ['Think.', 'Design.', 'Develop.', 'Launch.', 'Repeat.'];
  let target: string[] = typeof animate === 'undefined' ? source : [];

  if (typeof animate === 'undefined') {
    animate = true;
  }

  $: if (animate) {
    setTimeout(() => {
      if (target.length !== source.length) {
        target = [...target, source[target.length]];
      } else {
        dispatch('end');
      }
    }, 200);
  }
</script>

<svelte:element this={as} class={twMerge('text-3xl font-medium', className)}>
  {#each source as word, i}
    <span
      style={target[i]
        ? 'opacity: 1; transform: translateY(0);'
        : 'opacity: 0; transform: translateY(1ch);'}
      class={clsx(
        'mr-1 inline-block transition-all duration-500 ease-motion',
        i === source.length - 1 && 'text-foreground-secondary'
      )}>{word}</span
    >
    {#if i % 2 === 1}
      <br />
    {/if}
  {/each}
</svelte:element>
