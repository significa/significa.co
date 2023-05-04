<script lang="ts">
  import center from '$assets/404.svg';
  import nobita from '$assets/nobita-small.svg';

  const stickers = Object.values(
    import.meta.glob('../assets/stickers/*.svg', { eager: true, as: 'url' })
  );

  const gridSize = 90;

  let screenWidth: number;
  let screenHeight: number;
  let centerWidth: number;
  let centerHeight: number;

  const TARGET = 'o';
  const N = '↑';
  const S = '↓';
  const E = '→';
  const W = '←';
  const NE = '↗';
  const NW = '↖';
  const SE = '↘';
  const SW = '↙';
  const transforms: Record<string, string> = {
    [N]: 'translateY(-50px)',
    [S]: 'translateY(50px)',
    [E]: 'translateX(50px)',
    [W]: 'translateX(-50px)',
    [NE]: 'translate(50px, -50px)',
    [NW]: 'translate(-50px, -50px)',
    [SE]: 'translate(50px, 50px)',
    [SW]: 'translate(-50px, 50px)'
  };

  let isFound = false;

  const getMatrix = (screenW: number, screenH: number, centerW: number, centerH: number) => {
    const matrix: string[][] = [];

    // amount of columns and rows (number)
    const x = Math.floor(screenW / gridSize);
    const y = Math.floor(screenH / gridSize);

    // the center of the matrix must be locked (so, no nobita there)
    // we calculate the padding for the matrix (amount of columns and rows around a locked center)
    const xPadding = Math.floor((x - Math.ceil(centerW / gridSize)) / 2);
    const yPadding = Math.floor((y - Math.ceil(centerH / gridSize)) / 2);

    for (let row = 0; row < y; row++) {
      matrix[row] = [];

      for (let column = 0; column < x; column++) {
        const isLockedX = column >= xPadding && column < x - xPadding;
        const isLockedY = row >= yPadding && row < y - yPadding;

        matrix[row][column] = isLockedX && isLockedY ? '-' : 'x';
      }
    }

    if (matrix.length) {
      let attempts = 0;

      const placeNobita = () => {
        const nobitaRowIndex = Math.floor(Math.random() * y) - 1;
        const nobitaColumnIndex = Math.floor(Math.random() * x) - 1;

        if (matrix[nobitaRowIndex]?.[nobitaColumnIndex] === 'x') {
          matrix[nobitaRowIndex][nobitaColumnIndex] = TARGET;

          // mark the cells around nobita as cardinal points (n, s, e, w, ne, nw, se, sw)
          const markNeighbour = (x: number, y: number, value: string) => {
            if (matrix[y]?.[x]) {
              matrix[y][x] = value;
            }
          };

          markNeighbour(nobitaColumnIndex, nobitaRowIndex - 1, N);
          markNeighbour(nobitaColumnIndex, nobitaRowIndex + 1, S);
          markNeighbour(nobitaColumnIndex - 1, nobitaRowIndex, W);
          markNeighbour(nobitaColumnIndex + 1, nobitaRowIndex, E);
          markNeighbour(nobitaColumnIndex - 1, nobitaRowIndex - 1, NW);
          markNeighbour(nobitaColumnIndex + 1, nobitaRowIndex - 1, NE);
          markNeighbour(nobitaColumnIndex - 1, nobitaRowIndex + 1, SW);
          markNeighbour(nobitaColumnIndex + 1, nobitaRowIndex + 1, SE);
        } else if (attempts < 100) {
          attempts++;
          placeNobita();
        }
      };

      placeNobita();
    }

    return matrix;
  };

  $: matrix = getMatrix(screenWidth, screenHeight, centerWidth, centerHeight);
</script>

{#if matrix}
  <div
    bind:clientWidth={screenWidth}
    bind:clientHeight={screenHeight}
    style="height: calc(100vh - 76px);"
    class="flex items-center justify-center overflow-hidden border-t"
  >
    <div
      style="grid-template-columns: repeat({matrix[0]?.length ||
        0}, {gridSize}px); grid-template-rows: repeat({matrix?.length || 0}, {gridSize}px);"
      class="grid"
    >
      {#each matrix as row}
        {#each row as cell}
          <div
            class="transition-all duration-700 ease-in-out"
            style={isFound && transforms[cell] ? `transform: ${transforms[cell]} ` : ''}
          >
            {#if cell === TARGET}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <img
                alt=""
                src={nobita}
                on:click={() => (isFound = true)}
                class="absolute drop-shadow-sm"
                style="transform: rotate({Math.floor(Math.random() * 180)}deg);"
              />
            {:else}
              <img
                alt=""
                src={stickers[Math.floor(Math.random() * stickers.length)]}
                style="transform: rotate({Math.floor(Math.random() * 180)}deg);"
                class="pointer-events-none absolute drop-shadow-sm"
              />
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  </div>
{/if}

<div class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
  <div bind:clientWidth={centerWidth} bind:clientHeight={centerHeight}>
    <img class="drop-shadow-lg" alt="" src={center} />
  </div>
</div>
