<script lang="ts">
  /**
   * Sets the heading level for everything inside it.
   * `offset` is relative to the current scope; `level` is absolute.
   * Changes to either prop propagate to the headings below.
   */
  import {
    getHeadingLevel,
    setHeadingLevel,
    toHeadingLevel,
    type HeadingLevel
  } from '$lib/heading-level';
  import { writable } from 'svelte/store';

  export let offset = 1;
  export let level: HeadingLevel | undefined = undefined;

  const parent = getHeadingLevel();
  const own = writable<HeadingLevel>(level ?? toHeadingLevel($parent + offset));
  setHeadingLevel(own);

  $: own.set(level ?? toHeadingLevel($parent + offset));
</script>

<slot />
