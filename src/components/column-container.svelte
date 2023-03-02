<main>
  <slot />
</main>

<!-- <style lang="postcss">
  main {
    max-width: var(--container-max-width);
    margin-inline: auto;
    padding-inline: var(--container-padding-inline);

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
</style> -->
