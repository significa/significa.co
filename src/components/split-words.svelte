<script lang="ts">
  export let string: string;
  export let nLetters: number;

  const temp: string[][] = string.split(' ').reduce(
    (acc: string[][], c) => {
      const currIndex = acc.length - 1;
      const currLen = acc[currIndex].join(' ').length;

      if (currLen + c.length > nLetters) {
        acc.push([c]);
      } else {
        acc[currIndex].push(c);
      }

      return acc;
    },
    [[]]
  );
</script>

{#each temp.map((arr) => arr.join(' ')) as str}
  <p class={$$restProps.class}>{str}</p>
{/each}
