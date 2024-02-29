<script lang="ts">
  import type { EstimationStoryblok } from '$types/bloks';
  import IllustrationEmply from '../illustrations/assets/illustration-emply.webp';
  import IllustrationEmplyLight from '../illustrations/assets/illustration-emply-light.webp';
  import { theme } from '$lib/stores/theme';
  import { Button, CheckboxGroup, Radio } from '@significa/svelte-ui';
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

<section class="border-t mt-20" id="estimation">
  <div
    class="container mx-auto px-container @container flex flex-col items-center text-center max-w-lg"
  >
    <img width="122" src={HandAsset} alt="" class="-mt-14" />
    <h3 class="text-5xl font-semibold text-foreground-secondary">{block.section_title}</h3>
    <h3 class="text-5xl font-semibold">{block.section_description}</h3>
  </div>
</section>

<section class="container mx-auto px-container @container pt-20 pb-16 flex">
  <div
    class="rounded-lg border w-full overflow-hidden flex min-h-[unset] flex-col xl:flex-row relative"
  >
    <div
      class={clsx(
        'flex transition-all duration-300 ease-motion w-full  bg-background-panel rounded-b-lg xl:rounded-r-lg z-50',
        open ? 'ring-1 ring-border xl:w-2/3' : 'w-full min-w-full'
      )}
    >
      <div class="block w-full">
        <div class="p-6 xl:p-8 flex flex-col h-full relative z-10">
          <div>
            <h3 class="text-4xl max-w-md">
              {block.title}
            </h3>
            <p class="my-4 text-xl text-foreground-secondary max-w-md">
              {block.description}
            </p>
            <div
              class={clsx('pb-4 pt-2 xl:pb-8 gap-4 relative w-full', open ? 'w-full' : 'xl:w-2/3')}
            >
              <div class="flex flex-col sm:grid sm:grid-cols-3 gap-y-4 gap-x-5">
                {#each estimations as options, i}
                  <div class="gap-2 grid">
                    <div class="flex items-center pt-4 justify-between pb-2">
                      <p class="leading-none text-foreground-secondary text-sm grid">
                        {options.name}
                      </p>
                      <Button
                        aria-label="Clear All"
                        variant="ghost"
                        icon="close"
                        size="sm"
                        on:click={() => {}}>Clear all</Button
                      >
                    </div>
                    {#each options.options as opt}
                      <label
                        for={`${options.name} / ${opt.name}`}
                        class={clsx(
                          'flex flex-col items-start py-2 px-3 transition-all hover:bg-foreground/2 cursor-pointer border rounded-sm hover:border-border-active hover:ring-2 text-sm/[20px] select-none'
                        )}
                      >
                        <div class="flex items-center justify-between w-full">
                          <p class="font-medium pr-3">{opt.name}</p>
                          <Radio
                            class="cursor-pointer shrink-0"
                            id={`${options.name} / ${opt.name}`}
                            value={opt.name}
                            name={options.name}
                            bind:group={selectedRadio[i]}
                          />
                        </div>
                      </label>
                    {/each}
                  </div>
                {/each}
                {#each estimationsCheckbox as options}
                  <div
                    class="gap-2 flex flex-col sm:grid sm:col-span-2 sm:grid-cols-2 gap-x-5 [&:last-child>p]:col-span-2"
                  >
                    <p class="pt-4 leading-none text-foreground-secondary text-sm grid pb-2">
                      {options.name}
                    </p>

                    {#each options.options as opt}
                      <label
                        for={`${options.name} / ${opt.name}`}
                        class={clsx(
                          'flex flex-col items-start py-2 px-3 transition-all hover:bg-foreground/2 cursor-pointer border rounded-sm hover:border-border-active hover:ring-2 text-sm/[20px] select-none'
                        )}
                      >
                        <div class="flex items-center justify-between w-full">
                          <p class="font-medium pr-3">{opt.name}</p>
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
            'absolute bottom-0 hidden xl:block transition-all',
            open ? 'xl:hidden xl:opacity-0' : 'right-0 opacity-100'
          )}
        >
          <img class="max-w-[710px] pointer-events-none" {src} alt="" />
        </div>
      </div>
    </div>
    <div
      class={clsx(
        'p-8 transition-all duration-300  w-full xl:w-auto z-10',
        open
          ? 'flex flex-col justify-between flex-0.5 shrink-0 translate-y-0 xl:translate-x-0 xl:w-1/3 xl:translate-y-0'
          : '-translate-y-full xl:translate-x-full xl:translate-y-0 hidden xl:flex'
      )}
    >
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
          <input name="estimations" hidden bind:value={selectedValuesToNotion} />
        </svelte:fragment>
      </ContactForm>
    </div>
  </div>
</section>
