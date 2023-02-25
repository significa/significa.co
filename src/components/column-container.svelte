<main>
  <slot />
</main>

<style lang="postcss">
  main {
    max-width: var(--container-max-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-inline);

    @media (--md) {
      display: grid;
      grid-template-columns: repeat(3, 1fr) min(660px, 100%) repeat(3, 1fr);
      column-gap: 16px;
    }

    & :global(*) {
      grid-column: 4 / 5;
    }

    & :global([data-column-width='medium']) {
      grid-column: 4 / 5;

      @media (--lg) {
        grid-column: 3 / 6;
      }
    }

    & :global([data-column-width='wide']) {
      grid-column: 1 / -1;

      @media (--lg) {
        grid-column: 2 / 7;
      }
    }

    & :global([data-column-width='full']) {
      grid-column: 1 / -1;
    }
  }
</style>
