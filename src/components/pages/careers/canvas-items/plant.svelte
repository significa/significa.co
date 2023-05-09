<script lang="ts">
  const plants = Object.values(
    import.meta.glob('../../../../assets/plants/*.svg', { eager: true, as: 'url' })
  );

  let active = 0;

  function next() {
    active = active < plants.length - 1 ? active + 1 : plants.length - 1;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="plant" alt="" src={plants[active]} class="drop-shadow-sm" on:click={next} />
