<script lang="ts">
  import clsx from 'clsx';
  import Popover from '$components/proposals/popover.svelte';
  import { formatter } from '$lib/utils/currency';
  import type { ProposalPackagePricingStoryblok } from '$types/bloks';
  import { t } from '$lib/i18n';
  import { DAYS_PER_MONTH } from '$lib/utils/proposals';

  export let data: ProposalPackagePricingStoryblok[];

  let technicalResources = data.find(
    (resource) => resource.department.name === 'Technical Resources'
  );

  let technicalResourcesTotal = technicalResources
    ? +technicalResources?.rate_value * +technicalResources?.team_size
    : 0;
  let projectManagement = data?.find((resource) => resource.department.name === 'Project Manager');
  let qualityAssurance = data?.find((resource) => resource.department.name === 'Quality Assurance');

  let total =
    technicalResourcesTotal +
    (technicalResourcesTotal *
      data
        ?.filter((resource) => resource.rate_type === 'percentage')
        .reduce((acc, resource) => (acc = acc + +resource.rate_value), 0)) /
      100;
</script>

<div
  class={clsx(
    'container mx-auto px-container grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-10 lg:gap-12',
    'my-10 md:my-14 lg:my-20'
  )}
>
  <div class="lg:col-start-2 flex flex-col shadow-md rounded-xs border">
    <div class="bg-background-offset/50">
      <p class="pt-3 px-4 text-xl font-medium">{formatter.format(total)}</p>
      <p class="pb-3 px-4 text-foreground-secondary">{t('proposals.per-month')}</p>
    </div>

    {#if technicalResources}
      <div class="grid grid-cols-2 p-4 content-between border-t">
        <p>{technicalResources.department.name}</p>
        <p class="justify-self-end font-medium">{formatter.format(technicalResourcesTotal)}</p>
        <Popover>
          <span
            slot="target"
            class="text-sm underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            {t('proposals.package.technical-resources.title')}
          </span>
          <div slot="popover">
            <h2 class="font-medium text-foreground text-sm">
              {t('proposals.package.technical-resources.title')}
            </h2>
            <p class="text-sm">
              {technicalResources?.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">{t('proposals.package.fulltime')}</p>
      </div>
    {/if}

    {#if projectManagement}
      <div class="grid grid-cols-2 p-3 border-t">
        <p>{projectManagement.department.name}</p>
        <p class="justify-self-end font-medium">
          {formatter.format(
            (technicalResourcesTotal *
              +projectManagement?.rate_value *
              +projectManagement?.team_size) /
              100
          )}
        </p>
        <Popover>
          <span
            slot="target"
            class="text-sm underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            {t('proposals.package.project-manager.title')}
          </span>
          <div slot="popover">
            <h2 class="font-medium text-foreground text-sm">
              {t('proposals.package.project-manager.title')}
            </h2>
            <p class="text-sm">
              {projectManagement.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">
          {(DAYS_PER_MONTH * +projectManagement.rate_value * +projectManagement.team_size) / 100}
          {t('proposals.days-per-month')}
        </p>
      </div>
    {/if}

    {#if qualityAssurance}
      <div class="grid grid-cols-2 p-3 border-t">
        <p>{qualityAssurance.department.name}</p>
        <p class="justify-self-end font-medium">
          {formatter.format(
            (technicalResourcesTotal * +qualityAssurance.rate_value * +qualityAssurance.team_size) /
              100
          )}
        </p>
        <Popover>
          <span
            slot="target"
            class="text-sm underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            {t('proposals.package.quality-assurance.title')}
          </span>
          <div slot="popover">
            <h2 class="font-medium text-foreground text-sm">
              {t('proposals.package.quality-assurance.title')}
            </h2>
            <p class="text-sm">
              {qualityAssurance.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">
          {(DAYS_PER_MONTH * +qualityAssurance.rate_value * +qualityAssurance.team_size) / 100}
          {t('proposals.days-per-month')}
        </p>
      </div>
    {/if}
  </div>
</div>
