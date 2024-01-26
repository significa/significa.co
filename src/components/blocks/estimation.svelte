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
  import HandAsset from '../illustrations/assets/hand.webp';
  import PreFooterAsset from '../illustrations/assets/pre-footer.webp';
  import PreFooterAssetLight from '../illustrations/assets/pre-footer-light.webp';
  import { t } from '$lib/i18n';

  export let block: EstimationStoryblok;

  let open = false;

  $: src = $theme === 'dark' ? IllustrationEmply : IllustrationEmplyLight;

  let selected: Record<string, ListboxOption<string>[]> = {};

  $: selectedMap = Object.entries(selected).map(([key, value]) => ({ key, value }));

  $: selectedKeyValues = selectedMap.map(({ value }) => value.map((v) => v.value)).flat();

  let estimationsMap = estimations.map((v) => v.options.filter((o) => o.name)).flat();

  $: combinedBudgetPower = estimationsMap
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
  $: Object.values(combinedBudgetPower).every((val) => val !== 0) ? (open = true) : (open = false);
</script>

<section class="border-t mt-20">
  <div
    class="container mx-auto px-container @container flex flex-col items-center text-center max-w-md"
  >
    <img width="122" src={HandAsset} alt="" class="-mt-14" />
    <h3 class="text-5xl font-semibold text-foreground-secondary">{block.section_title}</h3>
    <h3 class="text-5xl font-semibold">{block.section_description}</h3>
  </div>
</section>

<section class="container mx-auto px-container @container pt-20 pb-16 flex">
  <div
    class="rounded-lg border w-full overflow-hidden flex min-h-[unset] xl:min-h-[710px] flex-col xl:flex-row relative"
  >
    <img
      class={clsx(
        'absolute right-1/2 hidden xl:block transition-all ease-motion duration-500',
        !open ? '-bottom-96 opacity-0 select-none' : 'bottom-0 opacity-100'
      )}
      src={$theme === 'dark' ? PreFooterAsset : PreFooterAssetLight}
      width="354"
      alt=""
    />
    <div
      class={clsx(
        'flex transition-all duration-300 ease-motion bg-background-panel rounded-b-lg xl:rounded-r-lg',
        open ? 'xl:w-1/2 w-full ring-1 ring-border' : 'w-full'
      )}
    >
      <div class="w-full @5xl:flex">
        <div class="p-6 xl:p-8 flex flex-col justify-between h-full xl:max-w-2xl">
          <div>
            <h3 class="text-4xl max-w-md">
              {block.title}
            </h3>
            <p class="my-4 text-xl text-foreground-secondary max-w-md">
              {block.description}
            </p>
            <div class="py-4 xl:py-6 flex lg:flex-row flex-col flex-wrap gap-4">
              {#each estimations as { name, options }}
                <MultiSelect
                  options={options.map((o) => o.name)}
                  bind:selected={selected[name]}
                  selectedLabel={name}
                  icon="plus"
                  class="w-full xs:w-fit"
                />
              {/each}
            </div>

            <div class="flex flex-wrap gap-4 max-w-xl">
              {#each selectedMap as option}
                {#each option.value as op}
                  <div
                    class="flex items-center justify-between px-2.5 py-1.5 border border-border bg-background-offset text-xs font-semibold rounded-xs w-fit hover:transition-all focus-within:border-border-active focus-within:outline-none focus-within:ring-4 focus-within:ring-outline focus-within:transition-all hover:opacity-80"
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

          <div class="flex flex-col mt-5 xl:mt-3">
            <p class="text-base font-medium text-foreground/60">{t('estimation.man.power')}</p>
            <p class="text-xl font-medium">
              {combinedBudgetPower.lowPower === 0
                ? '-'
                : combinedBudgetPower.lowPower + ` to ` + combinedBudgetPower.highPower}
            </p>
            <p class="text-base font-medium text-foreground/60 mt-6">{t('estimation.total')}</p>
            <p class="text-xl font-medium text-foreground-accent">
              {combinedBudgetPower.lowBudget === 0
                ? '-'
                : combinedBudgetPower.lowBudget + `€ to ` + combinedBudgetPower.highBudget + `€`}
            </p>
          </div>
        </div>
        <div
          class={clsx(
            'absolute bottom-0 hidden xl:block transition-all duration-1000',
            open ? 'xl:hidden xl:opacity-0' : 'right-0 opacity-100'
          )}
        >
          <img class="max-w-[710px]" {src} alt="" />
        </div>
      </div>
    </div>
    <div class={clsx('xl:w-1/2 w-full p-8', open ? 'flex flex-col justify-between' : 'hidden')}>
      <div>
        <h3 class="text-4xl max-w-[300px]">
          {block.form_title}
        </h3>
        <p class="mt-4 text-xl text-foreground-secondary max-w-lg mb-10">
          {block.form_description}
        </p>
      </div>
      <ContactForm variant="estimations">
        <svelte:fragment slot="estimationsform">
          <input name="estimations" hidden bind:value={selectedKeyValues} />
        </svelte:fragment>
      </ContactForm>
    </div>
  </div>
</section>
