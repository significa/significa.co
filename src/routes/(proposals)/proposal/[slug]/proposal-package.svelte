<script lang="ts">
  import Popover from '$components/popover.svelte';
  import { formatter } from '$lib/utils/currency';
  import type { ProposalPackageEntryStoryBlok } from '$types/bloks';

  export let data: ProposalPackageEntryStoryBlok[];

  let technicalResourcesTotal = data
    ?.filter(
      (resource) =>
        resource.department.name === 'Technical Resources' && resource.rate_type === 'fulltime'
    )
    .reduce((acc, resource) => (acc = acc + +resource.rate_value), 0);

  let technicalResourcesDesc = data.find(
    (resource) => resource.department.name === 'Technical Resources'
  )?.department.content.description;

  let packageTotal =
    technicalResourcesTotal +
    (technicalResourcesTotal *
      data
        ?.filter((resource) => resource.rate_type === 'percentage')
        .reduce((acc, resource) => (acc = acc + +resource.rate_value), 0)) /
      100;

  type Department = { title: string; description: string; total: number };

  let departments: Department[] = Object.values(
    data
      ?.filter((resource) => resource.rate_type === 'percentage')
      .reduce(
        (
          departments: { [k: string]: { description: string; total: number; title: string } },
          resource
        ) => ({
          ...departments,
          [resource.department.name]: {
            title: resource.department.content.title,
            description: resource.department.content.description,
            total: departments[resource.department.name]?.total || 0 + +resource.rate_value
          }
        }),
        {}
      )
  );
</script>

<div class="container mx-auto px-container grid grid-cols-[1fr_2fr_1fr] gap-12">
  <div class="col-start-2 flex flex-col shadow-lg rounded-2xs border">
    <p class="pt-3 px-3">{formatter.format(packageTotal)}</p>
    <p class="pb-3 px-3 border-b">per month</p>

    <div class="grid grid-rows-2 grid-cols-2 p-3 content-between">
      <p>Technical Resources</p>
      <p class="justify-self-end">{formatter.format(technicalResourcesTotal)}</p>
      <Popover>
        <p slot="target">Why do I need these people?</p>
        <div slot="popover">
          <p class="font-medium text-sm">Why do I need these people?</p>
          <p class="text-sm">
            {technicalResourcesDesc}
          </p>
        </div>
      </Popover>
      <p class="justify-self-end">Full-time</p>
    </div>

    {#each departments as department}
      <div class="grid grid-rows-2 grid-cols-2 p-3">
        <p>{department.title}</p>
        <p class="justify-self-end">
          {formatter.format((technicalResourcesTotal * department.total) / 100)}
        </p>
        <Popover>
          <p slot="target">Why do I need a {department.title}?</p>
          <div slot="popover">
            <h2>Why do I need a {department.title}?</h2>
            <p>
              {department.description}
            </p>
          </div>
        </Popover>
        <p class="justify-self-end">{(20 * department.total) / 100} days per month</p>
      </div>
    {/each}
  </div>
</div>
