<script lang="ts">
  import type { EstimationStoryblok } from '$types/bloks';
  import IllustrationEmply from '../illustrations/assets/illustration-emply.webp';
  import IllustrationEmplyLight from '../illustrations/assets/illustration-emply-light.webp';
  import { theme } from '$lib/stores/theme';
  import { Button, MultiSelect } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';
  import { estimations } from '$lib/estimations';
  import type { ListboxOption } from '@melt-ui/svelte/dist/builders/listbox/types';

  export let block: EstimationStoryblok;

  let open = false;

  let value2 = '';

  const src = $theme === 'dark' ? IllustrationEmply : IllustrationEmplyLight;

  let selected: Record<string, ListboxOption<string>[]> = {};

  $: selectedMap = Object.entries(selected).map(([key, value]) => ({ key, value }));
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

            <div class="pt-10 grid grid-cols-3 gap-4">
              {#each estimations as { name, options }}
                <MultiSelect
                  options={options.map((o) => o.name)}
                  bind:selected={selected[name]}
                  selectedLabel={name}
                  icon="plus"
                />
              {/each}
            </div>

            {#each selectedMap as option}
              {#each option.value as op2}
                <div class="mt-3 border border-background-offset bg-background-panel">
                  <button
                    on:click={() => {
                      let selected2 = selected[option.key].filter(
                        (value) => value.label !== op2.label
                      );

                      selected[option.key] = selected2;
                    }}
                    >{op2.label}
                  </button>
                </div>
              {/each}
            {/each}
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
          class={clsx(
            'flex-1 flex-col items-end hidden xl:flex absolute right-0 bottom-0',
            open && 'xl:opacity-0'
          )}
        >
          <img class="max-w-[710px]" {src} alt="" />
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
      <ContactForm variant="quote">
        <svelte:fragment slot="packagesform">
          <input name="input" hidden bind:value={value2} />
        </svelte:fragment>
      </ContactForm>
    </div>
  </div>
</section>
