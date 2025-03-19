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
    'container mx-auto grid grid-cols-1 gap-10 px-container lg:grid-cols-[1fr_2fr_1fr] lg:gap-12',
    'my-10 md:my-14 lg:my-20'
  )}
>
  <div class="flex flex-col rounded-xs border shadow-md lg:col-start-2">
    <div class="bg-background-offset/50">
      <p class="px-4 pt-3 text-xl font-medium">{formatter.format(total)}</p>
      <p class="px-4 pb-3 text-foreground-secondary">{t('proposals.per-month')}</p>
    </div>

    <div class="grid grid-cols-[max-content_1fr_1fr] border-t pb-4">
      {#if technicalResources}
        <p class="col-start-1 px-4 pt-4 text-foreground-secondary">
          {`${technicalResources.team_size}x`}
        </p>
        <p class="col-start-2 pt-4">{technicalResources.department.name}</p>
        <p class="col-start-3 pr-4 pt-4 text-right font-medium">
          {formatter.format(technicalResourcesTotal)}
        </p>
        <Popover class="col-start-2 pb-2">
          <span
            slot="target"
            class="text-sm text-foreground-secondary underline decoration-dashed underline-offset-4"
          >
            {t('proposals.package.technical-resources.title')}
          </span>
          <div slot="popover">
            <h2 class="text-sm font-medium text-foreground">
              {t('proposals.package.technical-resources.title')}
            </h2>
            <p class="text-sm">
              {technicalResources?.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="col-start-3 pb-2 pr-4 text-right text-foreground-secondary">
          {t('proposals.package.fulltime')}
        </p>
      {/if}

      {#if projectManagement}
        <p class="col-start-1 border-t px-4 pt-2 text-foreground-secondary">
          {`${projectManagement.team_size}x`}
        </p>
        <p class="col-start-2 border-t pt-2">{projectManagement.department.name}</p>
        <p class="col-start-3 border-t pr-4 pt-2 text-right font-medium">
          {formatter.format(
            (technicalResourcesTotal *
              +projectManagement?.rate_value *
              +projectManagement?.team_size) /
              100
          )}
        </p>
        <Popover class="col-start-2 pb-2">
          <span
            slot="target"
            class="text-sm text-foreground-secondary underline decoration-dashed underline-offset-4"
          >
            {t('proposals.package.project-manager.title')}
          </span>
          <div slot="popover">
            <h2 class="text-sm font-medium text-foreground">
              {t('proposals.package.project-manager.title')}
            </h2>
            <p class="text-sm">
              {projectManagement.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="p col-start-3 pr-4 text-right text-foreground-secondary">
          {(DAYS_PER_MONTH * +projectManagement.rate_value * +projectManagement.team_size) / 100}
          {t('proposals.days-per-month')}
        </p>
      {/if}

      {#if qualityAssurance}
        <p class="col-start-1 border-t px-4 pt-2 text-foreground-secondary">
          {`${qualityAssurance.team_size}x`}
        </p>

        <p class="col-start-2 border-t pt-2">{qualityAssurance.department.name}</p>
        <p class="col-start-3 border-t pr-4 pt-2 text-right font-medium">
          {formatter.format(
            (technicalResourcesTotal * +qualityAssurance.rate_value * +qualityAssurance.team_size) /
              100
          )}
        </p>
        <Popover class="col-start-2">
          <span
            slot="target"
            class="text-sm text-foreground-secondary underline decoration-dashed underline-offset-4"
          >
            {t('proposals.package.quality-assurance.title')}
          </span>
          <div slot="popover">
            <h2 class="text-sm font-medium text-foreground">
              {t('proposals.package.quality-assurance.title')}
            </h2>
            <p class="text-sm">
              {qualityAssurance.department.content.why}
            </p>
          </div>
        </Popover>
        <p class="col-start-3 pr-4 text-right text-foreground-secondary">
          {(DAYS_PER_MONTH * +qualityAssurance.rate_value * +qualityAssurance.team_size) / 100}
          {t('proposals.days-per-month')}
        </p>
      {/if}
    </div>
  </div>
</div>
