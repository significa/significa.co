<script lang="ts">
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';

  let name = '';
  let budget = '';

  let visible = false;
  let focus: null | string = null;
  let blur: null | string = null;

  const onFocus = ({ detail }: { detail: string }) => {
    visible = true;
    focus = detail;
  };

  const onBlur = ({ detail }: { detail: string }) => {
    visible = false;
    blur = detail;
  };
</script>

<div
  class={clsx(
    'container relative mx-auto mt-10 gap-8 overflow-hidden px-container pb-12',
    'md:mt-14 md:pb-20',
    'lg:mt-20 lg:flex lg:justify-between lg:pb-32'
  )}
>
  <div class="flex-1">
    <div class="lg:max-w-xl">
      <h1 class="text-7xl">
        Get a quote.<br />
        <span class="text-foreground-secondary">It starts here.</span>
      </h1>
    </div>
  </div>
  <div class={clsx('flex-1', 'lg:flex lg:justify-end')}>
    <div class={clsx('mt-5 w-full', 'lg:max-w-xl')}>
      <div>
        <ContactForm bind:name bind:budget on:focus={onFocus} on:blur={onBlur} variant="quote" />
        <!-- TODO: add back the sticker -->
        <!-- <div
          class={twMerge(
            clsx(
              'absolute -bottom-[400px] left-10 drop-shadow-sm transition-all delay-200 duration-500 ease-smooth',
              visible && '-bottom-10'
            )
          )}
          style="transform: rotate(-10deg)"
        >
          <Nobita />
          <div
            class="absolute top-0 left-40 w-72 rounded-3xl bg-background-panel p-6 font-comic font-bold"
          >
            {#if ['50k - 100k', '100k+'].includes(budget)}
              <p>Whoa! {name ? `${name}! ` : ''}Now we're talking!</p>
            {:else}
              <p>It looks like you're filling out a form. I'm André and I'm here to help!</p>
            {/if}
          </div>
        </div> -->
      </div>
    </div>
  </div>
</div>
