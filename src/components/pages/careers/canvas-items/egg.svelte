<script lang="ts">
  const eggs = Object.values(
    import.meta.glob('../../../../assets/eggs/*.svg', { eager: true, as: 'url' })
  );

  let active = 0;

  function next() {
    active = active < eggs.length - 1 ? active + 1 : eggs.length - 1;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="egg" alt="" src={eggs[active]} class="drop-shadow-sm" on:click={next} />
