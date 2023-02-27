<script lang="ts">
  import { getImageAttributes } from '$lib/utils/cms';
  import type { RichtextTestimonialStoryblok } from '$types/bloks';

  export let block: RichtextTestimonialStoryblok;
</script>

<div class="testimonial">
  {#if block.testimonial}
    <p class="symbol">&ldquo;</p>
    <p class="quote"><span>{block.testimonial}</span></p>
  {/if}
  <div class="info">
    {#if block.photo?.filename}
      {@const { src, alt, width, height } = getImageAttributes(block.photo, { size: [100, 100] })}
      <img class="avatar" {src} {alt} {width} {height} />
    {/if}
    <div>
      {#if block.name}
        <p class="name">{block.name}</p>
      {/if}
      {#if block.position}
        <p class="position">{block.position}</p>
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  div.testimonial {
    position: relative;

    --richtext-testimonial-padding: 10px 0px;

    @media (--md) {
      --richtext-testimonial-padding: 10px 50px;
    }

    padding: var(--richtext-testimonial-padding);

    & p.quote {
      font-size: var(--font-size-2xl);
      line-height: var(--line-height-2xl);
      font-weight: var(--font-weight-medium);
    }

    & p.symbol {
      font-size: 6rem;
      line-height: 0;
      color: var(--color-foreground-accent);

      margin-bottom: 24px;
      margin-top: 32px;

      @media (--md) {
        line-height: 1;
        margin-top: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    & .info {
      display: flex;
      align-items: center;

      & p.name,
      & p.position {
        font-size: var(--font-size-md);
        line-height: var(--line-height-none);
        font-weight: var(--font-weight-medium);
      }

      & p.name {
        margin-bottom: 0.5ch;
      }

      & p.position {
        color: var(--color-foreground-secondary);
      }
    }

    & .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1ch;

      flex-shrink: 0;
    }
  }
</style>
