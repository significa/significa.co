<script lang="ts">
  import { intersectionObserver } from '@significa/svelte-ui/actions';
  import clsx from 'clsx';
  import { twMerge } from 'tailwind-merge';
  let className: undefined | string = undefined;
  export { className as class };
  export let as: undefined | string = 'p';

  let source: string[] = ['Think.', 'Design.', 'Develop.', 'Launch.', 'Repeat.'];
  let target: string[] = [];

  const animate = () => {
    const interval = setInterval(() => {
      if (target.length !== source.length) {
        target = [...target, source[target.length]];
      } else {
        clearInterval(interval);
      }
    }, 200);
  };
</script>

<svelte:element this={as} class={twMerge('text-3xl font-medium', className)}>
  <span
    use:intersectionObserver={{
      callback: ([e]) => {
        if (e.isIntersecting) {
          animate();
        }
      },
      options: { threshold: [1] }
    }}
  />
  {#each source as word, i}
    <span
      style={target[i]
        ? 'opacity: 1; transform: translateY(0);'
        : 'opacity: 0; transform: translateY(1ch);'}
      class={clsx(
        'mr-1 inline-block transition-all ease-smooth',
        i === source.length - 1 && 'text-foreground-tertiary'
      )}>{word}</span
    >
    {#if i % 2 === 1}
      <br />
    {/if}
  {/each}
</svelte:element>
