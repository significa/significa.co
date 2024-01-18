<script lang="ts">
  import clsx from 'clsx';
  import Popover from '$components/popover.svelte';
  import { formatter } from '$lib/utils/currency';
  import type { ProposalPackagePricingStoryblok } from '$types/bloks';

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
    'container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-10 lg:gap-12',
    'my-10 md:my-14 lg:my-20 px-6 lg:px-12'
  )}
>
  <div class="lg:col-start-2 flex flex-col shadow-lg rounded-2xs border">
    <div class="bg-background-offset">
      <p class="pt-3 px-3 font-medium">{formatter.format(total)}</p>
      <p class="pb-3 px-3 text-foreground-secondary">Per month</p>
    </div>

    {#if technicalResources}
      <div class="grid grid-cols-2 p-3 content-between border-t">
        <p>Technical Resources</p>
        <p class="justify-self-end font-medium">{formatter.format(technicalResourcesTotal)}</p>
        <Popover>
          <p
            slot="target"
            class="text-xs underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            Why do I need these people?
          </p>
          <div slot="popover">
            <h2 class="font-medium text-sm">Why do I need these people?</h2>
            <p class="text-sm">
              {technicalResources?.department.content.description}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">Full-time</p>
      </div>
    {/if}

    {#if projectManagement}
      <div class="grid grid-cols-2 p-3 border-t">
        <p>Project Manager</p>
        <p class="justify-self-end font-medium">
          {formatter.format(
            (technicalResourcesTotal *
              +projectManagement?.rate_value *
              +projectManagement?.team_size) /
              100
          )}
        </p>
        <Popover>
          <p
            slot="target"
            class="text-xs underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            Why do I need a Project Manager?
          </p>
          <div slot="popover">
            <h2 class="font-medium text-sm">Why do I need a Project Manager?</h2>
            <p class="text-sm">
              {projectManagement.department.content.description}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">
          {(20 * +projectManagement.rate_value * +projectManagement.team_size) / 100} days per month
        </p>
      </div>
    {/if}

    {#if qualityAssurance}
      <div class="grid grid-cols-2 p-3 border-t">
        <p>Quality Assurance</p>
        <p class="justify-self-end font-medium">
          {formatter.format(
            (technicalResourcesTotal * +qualityAssurance.rate_value * +qualityAssurance.team_size) /
              100
          )}
        </p>
        <Popover>
          <p
            slot="target"
            class="text-xs underline underline-offset-4 decoration-dashed text-foreground-secondary"
          >
            Why do I need Quality Assurance?
          </p>
          <div slot="popover">
            <h2 class="font-medium text-sm">Why do I need Quality Assurance?</h2>
            <p class="text-sm">
              {qualityAssurance.department.content.description}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end text-foreground-secondary">
          {(20 * +qualityAssurance.rate_value * +qualityAssurance.team_size) / 100} days per month
        </p>
      </div>
    {/if}
  </div>
</div>
