<main>
  <slot />
</main>

<style lang="postcss">
  main {
    max-width: var(--container-max-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-inline);

    /* This grid approach doesn't work with collapsing margins */
    /* @media (--md) {
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
    } */

    /* This approach works with collapsing margins */
    & > :global(*) {
      width: min(660px, 100%);
      margin-inline: auto;
    }

    & :global([data-column-width='medium']) {
      @media (--lg) {
        width: min(928px, 100%);
      }
    }

    & :global([data-column-width='wide']) {
      width: 100%;

      @media (--lg) {
        width: min(928px, 100%);
      }

      @media (--xl) {
        width: min(1172px, 100%);
      }
    }

    & :global([data-column-width='full']) {
      width: 100%;
    }
  }
</style>
