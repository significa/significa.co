<script lang="ts">
  import center from '$assets/404.svg';
  import nobita from '$assets/nobita-small.svg';
  import { PlausibleEvents, plausible } from '$lib/plausible';
  import clsx from 'clsx';

  const stickers = Object.values(
    import.meta.glob('../assets/stickers/*.svg', { eager: true, as: 'url' })
  );

  const gridSize = 90;

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

  /**
   * Creates a matrix of cells (x, y) with a central area where nobita can't be placed
   *
   * It uses `x` for normal cells and `-` for locked cells.
   * It uses `o` for the target cell (nobita).
   * It uses `n`, `s`, `e`, `w`, `ne`, `nw`, `se`, `sw` for the cardinal points around nobita
   *
   * as an example:
   * [
   *   ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
   *   ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
   *   ["x","x","x","x","x","x","x","-","-","-","-","-","-","-","x","x","x","x","x","x","x"],
   *   ["x","x","x","x","x","x","x","-","-","-","-","-","-","-","x","x","x","x","x","x","x"],
   *   ["x","x","x","↖","↑","↗","x","-","-","-","-","-","-","-","x","x","x","x","x","x","x"],
   *   ["x","x","x","←","o","→","x","-","-","-","-","-","-","-","x","x","x","x","x","x","x"],
   *   ["x","x","x","↙","↓","↘","x","-","-","-","-","-","-","-","x","x","x","x","x","x","x"],
   *   ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"],
   *   ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"]
   * ]
   */
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

  let screenWidth: number;
  let screenHeight: number;
  let centerWidth: number;
  let centerHeight: number;
  let isFound = false;
  let isFoundOnSession = false;

  $: matrix = getMatrix(screenWidth, screenHeight, centerWidth, centerHeight);
  $: if (isFound && !isFoundOnSession) {
    plausible(PlausibleEvents.NOBITA_FOUND);
    isFoundOnSession = true;
  }
</script>

{#if matrix}
  <div
    bind:clientWidth={screenWidth}
    bind:clientHeight={screenHeight}
    style="height: calc(100vh - 76px);"
    class="flex cursor-pointer items-center justify-center overflow-hidden border-t"
  >
    <div
      style="grid-template-columns: repeat({matrix[0]?.length ||
        0}, {gridSize}px); grid-template-rows: repeat({matrix?.length || 0}, {gridSize}px);"
      class="grid"
    >
      {#each matrix as row}
        {#each row as cell}
          {@const src = stickers[Math.floor(Math.random() * stickers.length)]}
          {@const stickerStyle = 'drop-shadow-md pointer-events-none scale-[1.35]'}
          {#if transforms[cell]}
            <div
              class="transition-all duration-700 ease-in-out"
              style={isFound && transforms[cell]
                ? `transform: ${transforms[cell]} rotate(${Math.floor(Math.random() * 180)}deg);`
                : `transform: rotate(${Math.floor(Math.random() * 180)}deg);`}
            >
              <img alt="" {src} class={stickerStyle} />
            </div>
          {:else}
            <div style="transform: rotate({Math.floor(Math.random() * 180)}deg);">
              {#if cell === TARGET}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                  alt=""
                  src={nobita}
                  on:click={() => (isFound = !isFound)}
                  class={clsx(stickerStyle, 'pointer-events-auto')}
                />
              {:else}
                <img alt="" {src} class={stickerStyle} />
              {/if}
            </div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
{/if}

<div
  class="absolute left-1/2 top-1/2 z-10 w-72 -translate-x-1/2 -translate-y-1/2 cursor-pointer xs:w-[404px] lg:w-[550px]"
>
  <div bind:clientWidth={centerWidth} bind:clientHeight={centerHeight}>
    <img class="drop-shadow-lg" alt="" src={center} />
  </div>
</div>
