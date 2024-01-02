<script lang="ts">
  import type { ProposalEstimateEntryStoryblok, ProposalTeamEntryStoryblok } from '$types/bloks';

  export let data: ProposalEstimateEntryStoryblok[];
  export let team: ProposalTeamEntryStoryblok[];

  type Row = {
    duration: number;
    offset: number;
    title?: string;
    role?: string;
    color?: string;
  };

  let teamInfoMap = new Map();
  let areas: {
    title: string;
    color: string;
    duration: number;
    rows: Row[];
  }[] = [];

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member.name, { role: member.role[0].title });
  });

  let phaseOffset: number = 0;

  data.forEach(({ title, phases, color }) => {
    let rows: Row[] = [];
    let phaseDuration: number = 0;

    phases.forEach((phase) => {
      phase.team.forEach((team) => {
        phaseDuration = +team.duration > phaseDuration ? +team.duration : phaseDuration;
        const memberInfo = teamInfoMap.get(team.team_member.member.name);
        rows = [
          ...rows,
          {
            duration: +team.duration,
            offset: phaseOffset,
            title: phase.title,
            role: memberInfo?.role,
            color
          }
        ];
      });
    });

    areas = [...areas, { title, color, duration: phaseDuration, rows }];
    phaseOffset = phaseDuration;
  });

  let timelineRows = areas.reduce(
    (acc: Row[], cur) => [...acc, { duration: 0, offset: 0 }, ...cur.rows],
    []
  );

  const timelineDays = areas.reduce((acc, curr) => (acc += curr.duration), 0);
  const timelineMonths = Math.ceil(timelineDays / 20);
</script>

<div class="grid gap-1 grid-cols-[max-content,_max-content] overflow-x-scroll py-3 relative">
  <div class="col-start-1 row-start-1 shadow-md"></div>
  <div class="col-start-2">
    <div class="grid gap-1 auto-cols-[20px] grid-rows-2 shadow-md">
      {#each Array(timelineMonths) as _, i}
        <div class="row-start-1" style="grid-column: span 20">Month {i + 1}</div>
        {#each Array(4) as _, i}
          <div class="row-start-2 col-span-5 text-foreground-secondary text-xs uppercase">
            Week {i + 1}
          </div>
        {/each}
      {/each}
    </div>
  </div>

  <div class="row-start-2 sticky left-0 bg-background">
    {#each areas as area}
      <div class="shadow-md rounded-xs m-1 bg-background">
        <div class="h-[36px] m-1 uppercase font-medium text-xs text-foreground-secondary px-3 py-2">
          {area.title}
        </div>
        {#each area?.rows as row}
          <div class="h-[36px] mb-1 text-sm px-3 py-2">{row.role}</div>
        {/each}
      </div>
    {/each}
  </div>

  <div
    class="grid gap-1 auto-cols-[20px] auto-rows-[36px]"
    style="background: linear-gradient(to right, #DDD 1px, transparent 1px); background-size: 120px;"
  >
    {#each timelineRows as row, i}
      <div
        class="rounded-xs p-2 text-sm text-white"
        style="
          background-color: {row.color};
          grid-row: {i + 1} / span 1;
          grid-column: {row.offset + 1} / span {row.duration};"
      >
        {#if row.title}
          {row.title}
          <span class="">
            {row.duration} days
          </span>
        {/if}
      </div>
    {/each}
  </div>
</div>
