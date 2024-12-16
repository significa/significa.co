<script lang="ts">
  import type { EstimationStoryblok } from '$types/bloks';
  import IllustrationEmply from '../illustrations/assets/illustration-emply.webp';
  import IllustrationEmplyLight from '../illustrations/assets/illustration-emply-light.webp';
  import { theme } from '$lib/stores/theme';
  import { CheckboxGroup, Radio } from '@significa/svelte-ui';
  import clsx from 'clsx';
  import ContactForm from '$components/contact-form.svelte';
  import { estimations, estimationsCheckbox } from '$lib/estimations';

  import HandAsset from '../illustrations/assets/hand.webp';

  import { t } from '$lib/i18n';

  export let block: EstimationStoryblok;

  let open = false;
  $: src = $theme === 'dark' ? IllustrationEmply : IllustrationEmplyLight;

  let selectedRadio: Array<string> = [];
  let selectedCheckbox: Array<string> = [];

  $: selectedValuesToNotion = [
    ...estimations.flatMap((estimation, index) =>
      estimation.options
        .filter((option) => option.name === selectedRadio[index])
        .map((option) => `${estimation.name} / ${option.name}`)
    ),
    ...estimationsCheckbox.flatMap((estimation) =>
      estimation.options
        .filter((option) => selectedCheckbox.includes(option.name))
        .map((option) => `${estimation.name} / ${option.name}`)
    )
  ].join(' , ');

  $: estimationsMapRadio = estimations
    .map((v, i) => v.options.filter((o) => o.name === selectedRadio[i]))
    .flat();

  $: estimationsMapCheckbox = estimationsCheckbox
    .map((v) => v.options.filter((v) => selectedCheckbox.includes(v.name)))
    .flat();

  $: combinedBudgetPower = [...estimationsMapRadio, ...estimationsMapCheckbox].reduce(
    (a, b) => {
      return {
        lowBudget: a.lowBudget + Number(b['low-est-point']) * 14500,
        highBudget: a.highBudget + Number(b['high-est-point']) * 14500,
        lowPower: a.lowPower + Number(b['low-est-point']),
        highPower: a.highPower + Number(b['high-est-point'])
      };
    },
    { lowBudget: 0, highBudget: 0, lowPower: 0, highPower: 0 }
  );

  $: open = Object.values(combinedBudgetPower).every((val) => val !== 0);
</script>

<section class="mt-20 border-t" id="estimation">
  <div
    class="container mx-auto flex max-w-lg flex-col items-center px-container text-center @container"
  >
    <img width="122" src={HandAsset} alt="" class="-mt-14" />
    <h3 class="text-5xl font-semibold text-foreground-secondary">{block.section_title}</h3>
    <h3 class="text-5xl font-semibold">{block.section_description}</h3>
  </div>
</section>

<section class="container mx-auto flex pb-16 pt-20 @container xl:px-container">
  <div
    class="relative flex min-h-[unset] w-full flex-col rounded-lg xl:flex-row xl:overflow-hidden xl:border"
  >
    <div
      class={clsx(
        'z-50 flex w-full transition-all duration-300 ease-motion xl:rounded-b-lg xl:rounded-r-lg xl:bg-background-panel',
        open ? 'xl:w-2/3 xl:ring-1 xl:ring-border' : 'w-full min-w-full'
      )}
    >
      <div class="block w-full">
        <div class="relative z-10 flex h-full flex-col">
          <div class="order-1 px-container xl:px-8 xl:pt-8">
            <h3 class="max-w-md text-4xl">
              {block.title}
            </h3>
            <p class="my-4 max-w-md text-xl text-foreground-secondary">
              {block.description}
            </p>
          </div>
          <div class="order-3 px-container xl:order-2 xl:px-8">
            <div
              class={clsx('relative w-full gap-4 pb-4 pt-2 xl:pb-8', open ? 'w-full' : 'xl:w-2/3')}
            >
              <div class="flex flex-col gap-x-5 gap-y-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                {#each estimations as options, i}
                  <div class="grid gap-2">
                    <div class="grid grid-cols-2 items-center pb-2 pt-4">
                      <p class="text-sm leading-none text-foreground-secondary">
                        {options.name}
                      </p>
                      <button
                        class="flex justify-end text-sm leading-none text-foreground-tertiary transition-all hover:text-foreground-secondary"
                        on:click={() => {
                          selectedRadio[i] = '';
                        }}
                      >
                        {t('estimate.clear')}
                      </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2 xl:flex xl:flex-col">
                      {#each options.options as opt}
                        <label
                          for={`${options.name} / ${opt.name}`}
                          class={clsx(
                            'flex cursor-pointer select-none flex-col items-start rounded-sm border px-3 py-2 text-sm/[20px] transition-all hover:border-border-active hover:bg-foreground/2 hover:ring-2'
                          )}
                        >
                          <div class="flex w-full items-center justify-between">
                            <p class="pr-3 font-medium">{opt.name}</p>
                            <Radio
                              class="shrink-0 cursor-pointer"
                              id={`${options.name} / ${opt.name}`}
                              value={opt.name}
                              name={options.name}
                              checked={selectedRadio[i] === opt.name}
                              bind:group={selectedRadio[i]}
                            />
                          </div>
                        </label>
                      {/each}
                    </div>
                  </div>
                {/each}
                {#each estimationsCheckbox as options}
                  <div
                    class="col-span-2 grid grid-cols-2 gap-2 xl:gap-x-5 [&:last-child>p]:col-span-2"
                  >
                    <p class="grid pb-2 pt-4 text-sm leading-none text-foreground-secondary">
                      {options.name}
                    </p>

                    {#each options.options as opt}
                      <label
                        for={`${options.name} / ${opt.name}`}
                        class={clsx(
                          'flex cursor-pointer select-none flex-col items-start rounded-sm border px-3 py-2 text-sm/[20px] transition-all hover:border-border-active hover:bg-foreground/2 hover:ring-2'
                        )}
                      >
                        <div class="flex w-full items-center justify-between">
                          <p class="pr-3 font-medium">{opt.name}</p>
                          <CheckboxGroup
                            bind:group={selectedCheckbox}
                            id={`${options.name} / ${opt.name}`}
                            value={opt.name}
                            name={options.name}
                          />
                        </div>
                      </label>
                    {/each}
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <div
            class="sticky top-0 z-10 order-2 mb-4 mt-2 flex w-screen flex-col border-b bg-background xl:relative xl:top-auto xl:order-3 xl:mb-0 xl:mt-3 xl:w-full xl:border-none xl:bg-transparent xl:px-8 xl:pb-8"
          >
            <div class="flex gap-2 px-container py-3 xl:block xl:gap-0 xl:px-0 xl:py-0">
              <div class="w-1/2 xl:w-auto">
                <p class="text-base/5 font-medium text-foreground/60 xl:text-base">
                  {t('estimation.man.power')}
                </p>
                <p class="text-md font-medium md:text-xl">
                  {combinedBudgetPower.lowPower === 0
                    ? '-'
                    : combinedBudgetPower.lowPower + ` to ` + combinedBudgetPower.highPower}
                </p>
              </div>
              <div class="w-1/2 xl:w-auto">
                <p class="mt-0 text-base/5 font-medium text-foreground/60 xl:mt-6 xl:text-base">
                  {t('estimation.total')}
                </p>
                <p class="text-md font-medium text-foreground-accent xl:text-xl">
                  {combinedBudgetPower.lowBudget === 0
                    ? '-'
                    : combinedBudgetPower.lowBudget +
                      `€ to ` +
                      combinedBudgetPower.highBudget +
                      `€`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class={clsx(
            'absolute bottom-0 hidden transition-all xl:block',
            open ? 'xl:hidden xl:opacity-0' : 'right-0 opacity-100'
          )}
        >
          <img class="pointer-events-none max-w-[710px]" {src} alt="" />
        </div>
      </div>
    </div>
    <div
      class={clsx(
        'z-10 w-full px-container pt-8  transition-all duration-300 xl:w-auto xl:p-8',
        open
          ? 'flex-0.5 flex shrink-0 translate-y-0 flex-col justify-between xl:w-1/3 xl:translate-x-0 xl:translate-y-0'
          : 'hidden -translate-y-full xl:flex xl:translate-x-full xl:translate-y-0'
      )}
    >
      <div>
        <h3 class="max-w-[300px] text-4xl">
          {block.form_title}
        </h3>
        <p class="mb-10 mt-4 max-w-lg text-xl text-foreground-secondary">
          {block.form_description}
        </p>
      </div>
      <ContactForm variant="estimations">
        <svelte:fragment slot="estimationsform">
          <input name="estimations" hidden bind:value={selectedValuesToNotion} />
        </svelte:fragment>
      </ContactForm>
    </div>
  </div>
</section>
