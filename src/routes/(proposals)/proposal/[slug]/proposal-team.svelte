<script lang="ts">
  import clsx from 'clsx';
  import { t } from '$lib/i18n';
  import type {
    ProposalDepartmentStoryblok,
    ProposalTeamEntryStoryblok,
    ProposalPackageTeamEntryStoryblok
  } from '$types/bloks';
  import { formatter } from '$lib/utils/currency';
  import { Link } from '@significa/svelte-ui';

  export let data: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[];
  export let type: string;

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

<div class="w-full overflow-x-scroll">
  <div class="border-b border-foreground-secondary min-w-[780px]">
    <div
      class={clsx(
        'container mx-auto',
        'grid gap-10 md:gap-12 px-6 md:px-12 py-2',
        `${
          type === 'package'
            ? 'grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr_1fr]'
            : 'grid-cols-[1fr_2fr_1fr]'
        }`
      )}
    >
      <p class="text-xs uppercase tracking-wider text-foreground-secondary">
        {t('proposals.team.department')}
      </p>
      <div class="grid grid-cols-2">
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">
          {t('proposals.team.team-member')}
        </p>
        <p class="text-xs uppercase tracking-wider text-foreground-secondary">
          {t('proposals.team.role')}
        </p>
      </div>
      {#if type === 'rate'}
        <p class="text-xs uppercase tracking-wider text-foreground-secondary text-right">
          {t('proposals.team.rate')}
        </p>
      {/if}
    </div>
  </div>

  {#each departmentsInfo as department}
    <div class="border-b border-foreground-tertiary even:bg-foreground-tertiary/10 min-w-[780px]">
      <div
        class={clsx(
          'container mx-auto',
          'grid gap-x-10 md:gap-x-12 gap-y-2 px-6 md:px-12 py-4',
          `${
            type === 'package'
              ? 'grid-cols-[1fr_3fr] md:grid-cols-[1fr_2fr_1fr]'
              : 'grid-cols-[1fr_2fr_1fr]'
          }`
        )}
      >
        <div class="col-start-1 row-span-3">
          <p class="font-bold">
            {department?.content?.title}.
          </p>
          <p class="text-foreground-secondary">
            {department?.content?.description}
          </p>
        </div>

        {#each dataMap.get(department.name) as entry}
          <div class="col-start-2 grid grid-cols-2 gap-y-2">
            <div class="col-start-1">
              <Link href={`/about/${entry.team_member.member?.slug}`}>
                {entry.team_member.member.name}
              </Link>
            </div>

            <div class="col-start-2">
              <p>
                {entry.role[0].title}
              </p>
              {#if entry.role[0].description}
                <p class="text-foreground-secondary">
                  {entry.role[0].description}
                </p>
              {/if}
            </div>
          </div>

          {#if type === 'rate'}
            <div class="col-start-3 text-right">
              {#if entry.rate_type === 'percentage' && entry.rate_value}
                <p class="font-bold">{entry.rate_value} %</p>
              {:else if entry.rate_type === 'value' && entry.rate_value}
                <p class="font-bold">{formatter.format(+entry.rate_value)}</p>
              {:else if entry.rate_type === 'free'}
                <p class="font-bold">{t('proposals.included')}</p>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>
