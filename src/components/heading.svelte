<script lang="ts">
  /**
   * A heading whose level comes from the surrounding heading scope.
   *
   * - `offset`: levels below the current scope (0 for a block title, 1 for its items).
   * - `level`: absolute level, ignoring the scope.
   * - `visual`: the level it looks like. Only matters inside `.rich-text`, where
   *   typography styles target headings; outside, the classes set the look.
   */
  import { getHeadingLevel, toHeadingLevel, type HeadingLevel } from '$lib/heading-level';

  export let offset = 0;
  export let level: HeadingLevel | undefined = undefined;
  export let visual: HeadingLevel | undefined = undefined;

  const scope = getHeadingLevel();

  $: resolved = level ?? toHeadingLevel(scope + offset);
  $: headingStyle = visual && visual !== resolved ? `h${visual}` : undefined;
</script>

<svelte:element this={`h${resolved}`} data-heading-style={headingStyle} {...$$restProps}>
  <slot />
</svelte:element>
