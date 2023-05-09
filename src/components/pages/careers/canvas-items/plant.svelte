<script lang="ts">
  import plant1 from '$assets/state=01.svg';
  import plant2 from '$assets/state=02.svg';
  import plant3 from '$assets/state=03.svg';
  import plant4 from '$assets/state=04.svg';

  const updatePic = (i: number) => {
    if (!!document && document.getElementById('plant') !== null) {
      if (i === 2) document.getElementById('plant').src = plant2;
      if (i === 3) document.getElementById('plant').src = plant3;
      if (i === 4) document.getElementById('plant').src = plant4;
    }
  };

  const picAnimation = (i: number) => {
    updatePic(i);
    if (i < 4)
      setTimeout(() => {
        picAnimation(i + 1);
      }, 600);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img id="plant" alt="" src={plant1} class="drop-shadow-sm" on:click={() => picAnimation(1)} />
