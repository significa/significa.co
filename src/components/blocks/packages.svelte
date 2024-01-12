<script lang="ts">
  import type { PackagesStoryblok } from '$types/bloks';
  import IllustrationEmpty from '../illustrations/assets/illustration-empty.webp';
  import { theme } from '$lib/stores/theme';
  import { Button, FloatingInput } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';

  export let block: PackagesStoryblok;

  let open = false;

  let value2 = '';
</script>

<section class="container mx-auto px-container @container pt-20 pb-16 flex">
  <div class="rounded-lg border w-full overflow-hidden flex">
    <div
      class={clsx(
        'flex transition-all duration-300 ease-motion bg-background-panel rounded-r-lg relative',
        open ? 'w-1/2 ring-1 ring-border' : 'w-full'
      )}
    >
      <div class="w-full @5xl:flex">
        <div class="p-8 flex flex-col justify-between h-full">
          <div>
            <h3 class="text-4xl max-w-md">
              {block.title}
            </h3>
            <p class="mt-4 text-xl text-foreground-secondary max-w-md">
              {block.description}
            </p>
            <Button on:click={() => (open = !open)}>Click ME !!!</Button>
            <FloatingInput label="input" bind:value={value2} />
          </div>
          <div class="flex flex-col">
            <p class="text-base font-medium text-foreground/60">Total people</p>
            <p class="text-xl font-medium">4</p>
            <p class="text-base font-medium text-foreground/60 mt-6">Estimated duration</p>
            <p class="text-xl font-medium">4 months</p>
            <p class="text-base font-medium text-foreground/60 mt-6">Monthly cost</p>
            <p class="text-xl font-medium">27 500 €</p>
            <p class="text-base font-medium text-foreground/60 mt-6">Estimated total</p>
            <p class="text-xl font-medium text-foreground-accent">78 000.00 € to 94 000.00€</p>
          </div>
        </div>
        <div
          class={clsx('hidden xl:flex absolute right-0 bottom-0', open && 'xl:opacity-0 xl:hidden')}
        >
          <img
            class="max-w-[710px]"
            src={$theme === 'dark' ? IllustrationEmpty : IllustrationEmpty}
            alt=""
          />
        </div>
      </div>
    </div>
    <div class={clsx('w-1/2 p-8', open ? 'block' : 'hidden')}>
      <h3 class="text-4xl max-w-[300px]">
        {block.form_title}
      </h3>
      <p class="mt-4 text-xl text-foreground-secondary max-w-lg mb-10">
        {block.form_description}
      </p>
      <ContactForm variant="packages">
        <svelte:fragment slot="packagesform">
          <input name="input" hidden bind:value={value2} />
        </svelte:fragment>
      </ContactForm>
    </div>
  </div>
</section>
