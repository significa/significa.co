<script lang="ts">
  import clsx from 'clsx';
  import { Button } from '@significa/svelte-ui';
  import Grid from './tictactoe/grid.svelte';
  import Stroke from './tictactoe/stroke.svelte';
  import { t } from '$lib/i18n';
  import {
    checkWinner,
    getAIPlay,
    type GameState,
    type Tile,
    type WinCondition
  } from './tictactoe/utils';
  import Bird from './tictactoe/assets/bird.webp';
  import Egg from './tictactoe/assets/egg.webp';
  import type { CanvasTictactoeStoryblok } from '$types/bloks';

  export let item: CanvasTictactoeStoryblok;

  type Character = 'egg' | 'bird';

  const assets: Record<Character, string> = { bird: Bird, egg: Egg };

  const DEFAULT_CHARACTER: Character = 'egg';
  const AI_DEFAULT_CHARACTER: Character = 'bird';

  const tileStyles = [
    'mt-1 -translate-x-2',
    'mt-1 -translate-x-1',
    '',
    'mt-[5px] -translate-x-2',
    'mt-[5px] -translate-x-1',
    'mt-1 translate-x-1',
    'mt-[5px] -translate-x-2',
    'mt-2',
    'mt-[5px] translate-x-2'
  ];

  const strokeStyles: Record<WinCondition, string> = {
    diag1: 'rotate-45 top-24 left-1/2',
    diag2: 'rotate-[135deg] top-24 left-1/2',
    horz1: 'top-10 left-1/2',
    horz2: 'top-28 left-1/2',
    horz3: 'top-44 left-1/2',
    vert1: 'top-24 rotate-90 left-16',
    vert2: 'top-24 rotate-90 left-1/2',
    vert3: 'top-24 rotate-90 left-52'
  };

  let tiles: Tile[] = Array(9).fill(-9);
  let playerHasPlayed = false;
  let gameState: GameState = 'main-menu';
  let gameWinCon: WinCondition | null = null;
  let selectedCharacter: Character | null = null;

  const handleRestart = () => {
    gameState = 'in-progress';
    gameWinCon = null;
    tiles = Array(9).fill(-9);
  };

  const handleQuit = () => {
    gameState = 'main-menu';
    gameWinCon = null;
    selectedCharacter = null;
    tiles = Array(9).fill(-9);
  };

  const handlePlayerMove = (i: number) => {
    tiles[i] = 1;
    playerHasPlayed = true;
    const { state, winCondition } = checkWinner(tiles);
    gameState = state;
    gameWinCon = winCondition;
  };

  const handleAIMove = () => {
    const aiPlay = getAIPlay(tiles);

    setTimeout(() => {
      if (aiPlay !== null) {
        tiles[aiPlay] = 2;
        playerHasPlayed = false;
        const { state, winCondition } = checkWinner(tiles);
        gameState = state;
        gameWinCon = winCondition;
      }
    }, 500);
  };

  $: if (tiles.filter((tile) => tile === -9).length === 0 && gameState === 'in-progress')
    gameState = 'draw';

  $: if (playerHasPlayed && tiles && gameState === 'in-progress') handleAIMove();
</script>

<div
  class="relative h-[394px] w-[280px] rounded-xs bg-background-panel shadow-md"
  style="left: {item.left || 0}px; top: {item.top || 0}px; transform: rotate({item.rotate || 0}deg)"
>
  <svg
    width="81"
    height="25"
    viewBox="0 0 81 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="absolute -top-4 left-1/2 -translate-x-1/2 rotate-[3deg] text-border-active"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2536 0.115234V0.115998H70.8506V24.116H10.2445V24.1152H0.556641L5.11992 18.2377L0.556641 12.3601L5.11992 6.48258L0.556641 0.115234H10.2536ZM70.8537 24.1157V0.115718L80.5507 0.115719L75.9874 6.48307L80.5507 12.3606L75.9874 18.2382L80.5507 24.1157H70.8537Z"
      fill="currentColor"
    />
  </svg>

  <div class="flex h-full flex-col overflow-hidden">
    <div class="mb-3 grid h-[10px] grid-cols-12 gap-[4%] p-4">
      {#each [...Array(12)] as _}
        <div class="aspect-square rounded-full bg-background shadow-inner" />
      {/each}
    </div>

    <p class="px-4 text-center text-xl font-semibold">
      {#if gameState === 'in-progress'}
        {playerHasPlayed ? t('tictactoe.wait') : t('tictactoe.your-turn')}
      {:else if gameState === 'draw'}
        {t('tictactoe.draw')}
      {:else if gameState === 'lose'}
        {t('tictactoe.lose')}
      {:else if gameState === 'win'}
        {t('tictactoe.win')}
      {:else if gameState === 'main-menu'}
        {t('tictactoe.title')}
      {/if}
    </p>

    <div
      class="relative mt-1 flex h-full flex-col"
      style="background-image: linear-gradient(hsl(var(--color-border)) 1px, transparent 1px); background-size: 32px 32px;"
    >
      {#if gameState === 'main-menu'}
        <p class="px-4 text-center text-xl font-semibold text-foreground-secondary">
          {t('tictactoe.subtitle')}
        </p>

        <div class="flex min-h-[183px]">
          <button
            class={clsx(
              'transition-all hover:rotate-6',
              selectedCharacter === 'bird' && 'opacity-40 hover:opacity-100'
            )}
            on:click={() => {
              selectedCharacter = 'egg';
            }}
          >
            <img
              width="153"
              height="128"
              class="-mr-3 object-contain drop-shadow-md"
              src={assets.egg}
              alt="player"
              draggable="false"
            />
          </button>
          <button
            class={clsx(
              'transition-all hover:-rotate-6',
              selectedCharacter === 'egg' && 'opacity-40 hover:opacity-100'
            )}
            on:click={() => {
              selectedCharacter = 'bird';
            }}
          >
            <img
              width="153"
              height="128"
              class="-ml-3 object-contain drop-shadow-md"
              src={assets.bird}
              alt="ai"
              draggable="false"
            />
          </button>
        </div>

        <div class="mt-[22px] flex w-full justify-center gap-3">
          <Button
            size="md"
            variant="secondary"
            class="bg-background-panel"
            on:click={() => {
              gameState = 'in-progress';
            }}
          >
            {t('tictactoe.play')}
          </Button>
        </div>
      {:else}
        <div class="mx-auto mt-4 grid h-[196px] max-w-[201px] grid-cols-3 grid-rows-3">
          <Grid class="absolute scale-105" />

          {#if gameWinCon}
            <Stroke
              class={clsx(
                'absolute z-10 -translate-x-1/2 animate-strike-clip-path',
                strokeStyles[gameWinCon]
              )}
            />
          {/if}

          {#each tiles as tile, i}
            <button
              class={clsx(tileStyles[i], tile === -9 ? 'opacity-0' : 'block')}
              disabled={playerHasPlayed || gameState !== 'in-progress' || tile !== -9}
              on:click={() => handlePlayerMove(i)}
            >
              {#if tile === 1}
                <img
                  width="68"
                  height="64"
                  class="drop-shadow-md"
                  src={assets[selectedCharacter || DEFAULT_CHARACTER]}
                  alt="player"
                  draggable="false"
                />
              {:else}
                <img
                  width="68"
                  height="64"
                  class="drop-shadow-md"
                  src={assets[
                    selectedCharacter === 'bird'
                      ? 'egg'
                      : selectedCharacter === 'egg'
                        ? 'bird'
                        : AI_DEFAULT_CHARACTER
                  ]}
                  alt="ai"
                  draggable="false"
                />
              {/if}
            </button>
          {/each}
        </div>

        <div class="mt-[22px] flex w-full justify-center gap-3">
          <Button
            size="md"
            variant="secondary"
            class="bg-background-panel"
            disabled={playerHasPlayed && gameState === 'in-progress'}
            on:click={handleRestart}
          >
            {t('tictactoe.restart')}
          </Button>

          <Button
            size="md"
            variant="secondary"
            class="bg-background-panel"
            disabled={playerHasPlayed && gameState === 'in-progress'}
            on:click={handleQuit}
          >
            {t('tictactoe.close')}
          </Button>
        </div>
      {/if}
    </div>
  </div>
</div>
