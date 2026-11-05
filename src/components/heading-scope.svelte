<script lang="ts">
  /**
   * Sets the heading level for everything inside it.
   * `offset` is relative to the current scope; `level` is absolute.
   */
  import {
    getHeadingLevel,
    setHeadingLevel,
    toHeadingLevel,
    type HeadingLevel
  } from '$lib/heading-level';

  export let offset = 1;
  export let level: HeadingLevel | undefined = undefined;

  setHeadingLevel(level ?? toHeadingLevel(getHeadingLevel() + offset));
</script>

<slot />
