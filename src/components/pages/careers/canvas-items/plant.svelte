<script lang="ts">
  import plant1 from '$assets/plants/state=01.svg';

  const plants = Object.values(
    import.meta.glob('../../../../assets/plants/*.svg', { eager: true, as: 'url' })
  );

  const updatePic = (i: number) => {
    if (!!document && document.getElementById('plant') !== null) {
      document.getElementById('plant').src = plants[i];
    }
  };

  const picAnimation = (i: number) => {
    updatePic(i);
    if (i < plants.length - 1)
      setTimeout(() => {
        picAnimation(i + 1);
      }, 600);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="plant" alt="" src={plant1} class="drop-shadow-sm" on:click={() => picAnimation(1)} />
