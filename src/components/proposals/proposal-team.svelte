<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';

  import type {
    ProposalDepartmentStoryblok,
    ProposalTeamEntryStoryblok,
    ProposalPackageTeamEntryStoryblok
  } from '$types/bloks';

  import { drawerLinks } from '$lib/actions/drawer-links';
  import { formatter } from '$lib/utils/currency';
  import { Link } from '@significa/svelte-ui';

  export let data: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[];
  export let type: string;
  export let showTeamMembers: boolean = true;

  let dataMap = new Map();
  let departmentsInfo: ProposalDepartmentStoryblok[] = [];

  data.forEach(({ department, ...entryNoDepartment }) => {
    if (dataMap.has(department.name)) {
      dataMap.set(department.name, [...dataMap.get(department.name), entryNoDepartment]);
    } else {
      dataMap.set(department.name, [entryNoDepartment]);
      departmentsInfo.push(department);
    }
  });
</script>

<div class="overflow-x-scroll mt-10 md:mt-14 lg:mt-20">
  <!-- HEADER -->
  <div class="border-b border-foreground-secondary min-w-[780px]">
    <div
      class={clsx(
        'container mx-auto px-container',
        'grid gap-10 md:gap-12 py-2',
        type === 'package'
          ? 'grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr_1fr]'
          : 'grid-cols-[1fr_2fr_1fr]'
      )}
    >
      <p class="text-2xs uppercase text-foreground-secondary">
        {t('proposals.team.department')}
      </p>
      <div class="grid grid-cols-2">
        {#if showTeamMembers}
          <p class="text-2xs uppercase text-foreground-secondary">
            {t('proposals.team.team-member')}
          </p>
        {/if}
        <p class="text-2xs uppercase text-foreground-secondary">
          {t('proposals.team.role')}
        </p>
      </div>
      {#if type === 'rate'}
        <p class="text-2xs uppercase text-foreground-secondary text-right">
          {t('proposals.team.rate')}
        </p>
      {/if}
    </div>
  </div>

  <!-- Panes -->
  {#each departmentsInfo as department}
    <div class="border-b border-foreground-tertiary last:border-foreground-secondary min-w-[780px]">
      <div
        class={clsx(
          'container mx-auto px-container',
          'grid',
          `${
            type === 'package'
              ? 'grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr_1fr]'
              : 'grid-cols-[1fr_2fr_1fr]'
          }`
        )}
      >
        <div
          class="col-start-1 py-4"
          style="grid-row: 1 / span {dataMap.get(department.name).length}"
        >
          <p class="text-sm font-bold">
            {department?.content?.title}
          </p>
          <p class="text-sm text-foreground-secondary">
            {department?.content?.description}
          </p>
        </div>

        {#each dataMap.get(department.name) as entry, i}
          <div
            class={clsx(
              'col-start-2 grid grid-cols-2 ml-5 md:ml-6 py-4',
              i < dataMap.get(department.name).length - 1
                ? 'border-b border-foreground-tertiary'
                : ''
            )}
          >
            {#if showTeamMembers}
              <div class="col-start-1" use:drawerLinks>
                <Link class="text-sm" href={`/about/${entry.team_member.member?.slug}`}>
                  {entry.team_member.member.name}
                </Link>
              </div>
            {/if}

            <div class={clsx(showTeamMembers ? 'col-start-2 -ml-2 md:-ml-3' : 'col-start-1')}>
              <p class="text-sm">
                {entry.role[0].title}
              </p>
              {#if entry.role[0].description}
                <p class="text-sm text-foreground-secondary">
                  {entry.role[0].description}
                </p>
              {/if}
            </div>
          </div>

          <div
            class={clsx(
              'col-start-3 text-right py-4',
              i < dataMap.get(department.name).length - 1
                ? 'border-b border-foreground-tertiary'
                : ''
            )}
          >
            {#if type === 'rate'}
              {#if entry.rate_type === 'percentage' && entry.rate_value}
                <p class="text-sm font-bold">{entry.rate_value} %</p>
              {:else if entry.rate_type === 'value' && entry.rate_value}
                <p class="text-sm font-bold">{formatter.format(+entry.rate_value)}</p>
              {:else if entry.rate_type === 'free'}
                <p class="text-sm font-bold">{t('proposals.included')}</p>
              {/if}
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
