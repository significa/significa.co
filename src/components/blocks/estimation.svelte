<script lang="ts">
  import type { EstimationStoryblok } from '$types/bloks';
  import IllustrationEmply from '../illustrations/assets/illustration-emply.webp';
  import IllustrationEmplyLight from '../illustrations/assets/illustration-emply-light.webp';
  import { theme } from '$lib/stores/theme';
  import { Icon, MultiSelect } from '@significa/svelte-ui';
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

  $: selectedKeyValues = selectedMap.map(({ value }) => value.map((v) => v.value)).flat();

  let estimationsMap = estimations.map((v) => v.options.filter((o) => o.name)).flat();

  $: combinedBudget = estimationsMap
    .filter((r) => selectedKeyValues.includes(r.name))
    .reduce(
      (a, b) => {
        return {
          lowBudget: a.lowBudget + Number(b['low-bud-point']),
          highBudget: a.highBudget + Number(b['high-bud-point']),
          lowPower: a.lowPower + Number(b['low-est-point']),
          highPower: a.highPower + Number(b['high-est-point'])
        };
      },
      { lowBudget: 0, highBudget: 0, lowPower: 0, highPower: 0 }
    );

  // open / close form
  $: Object.values(combinedBudget).every((val) => val !== 0) ? (open = true) : (open = false);
</script>

<section class="container mx-auto px-container @container pt-20 pb-16 flex">
  <div class="rounded-lg border w-full overflow-hidden flex min-h-[unset] lg:min-h-[710px]">
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

            <div class="pt-6 flex flex-wrap gap-4 max-w-xl">
              {#each selectedMap as option}
                {#each option.value as op}
                  <div
                    class="flex items-center justify-between mt-3 px-2.5 py-1.5 border border-border bg-background-offset text-xs font-semibold rounded-xs w-fit hover:transition-all focus-within:border-border-active focus-within:outline-none focus-within:ring-4 focus-within:ring-outline focus-within:transition-all hover:opacity-80"
                  >
                    {op.label}
                    <button
                      class="outline-none flex"
                      on:click={() => {
                        let opSelected = selected[option.key].filter(
                          (value) => value.label !== op.label
                        );

                        selected[option.key] = opSelected;
                      }}
                    >
                      <Icon class="ml-2" icon="close" />
                    </button>
                  </div>
                {/each}
              {/each}
            </div>
          </div>

          <div class="flex flex-col">
            <p class="text-base font-medium text-foreground/60">Estimated man power</p>
            <p class="text-xl font-medium">
              {combinedBudget.lowPower === 0
                ? '-'
                : combinedBudget.lowPower + ` to ` + combinedBudget.highPower}
            </p>
            <p class="text-base font-medium text-foreground/60 mt-6">Estimated total</p>
            <p class="text-xl font-medium text-foreground-accent">
              {combinedBudget.lowBudget === 0
                ? '-'
                : combinedBudget.lowBudget + `€ to ` + combinedBudget.highBudget + `€`}
            </p>
          </div>
        </div>
        <div
          class={clsx(
            'flex-1 flex-col items-end hidden xl:flex absolute right-0 bottom-0 transition-all',
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
