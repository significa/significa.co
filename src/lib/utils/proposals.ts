import type {
  ProposalDeliverableStoryblok,
  ProposalEstimateEntryStoryblok,
  ProposalPackageTeamEntryStoryblok,
  ProposalTeamEntryStoryblok
} from '$types/bloks';

type Row = {
  duration: number;
  offset: number;
  title?: string;
  role?: string;
  color?: string;
};

type Deliverable = {
  title: string;
  color: string;
  duration: number;
  rows: Row[];
};

export function createRateTimelineData(
  estimates: ProposalEstimateEntryStoryblok[],
  team: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[]
) {
  const teamInfoMap = new Map();
  let deliverables: Deliverable[] = [];

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member?.name, { role: member.role[0].title });
  });

  let phaseOffset: number = 0;

  estimates?.forEach(({ title, phases, color }) => {
    let rows: Row[] = [];
    let phaseDuration: number = 0;

    phases.forEach((phase) => {
      phase.team.forEach((team) => {
        phaseDuration = +team.duration > phaseDuration ? +team.duration : phaseDuration;
        rows = [
          ...rows,
          {
            duration: +team.duration,
            offset: phaseOffset,
            title: phase.title,
            role: teamInfoMap.get(team.team_member.member?.name)?.role,
            color
          }
        ];
      });
    });

    deliverables = [...deliverables, { title, color, duration: phaseDuration, rows }];
    phaseOffset = phaseDuration;
  });

  const rows = deliverables.reduce(
    (acc: Row[], cur) => [...acc, { duration: 0, offset: 0 }, ...cur.rows],
    []
  );

  const totalDays = deliverables.reduce((acc, curr) => (acc += curr.duration), 0);
  const totalMonths = Math.ceil(totalDays / 20);

  return {
    deliverables,
    rows,
    totalDays,
    totalMonths
  };
}

export function createPackageTimelineData(
  data: ProposalDeliverableStoryblok[],
  team: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[]
) {
  const teamInfoMap = new Map();

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member?.name, { role: member.role[0].title });
  });

  const deliverables = data.map(({ color, team, title }) => {
    const rows = team.map((member) => ({
      duration: +member.duration,
      offset: +member.offset,
      title: title,
      role: teamInfoMap.get(member.team_member.member?.name)?.role,
      color: color
    }));

    return { color, title, rows };
  });

  const rows = deliverables.reduce(
    (acc: Row[], cur) => [...acc, { duration: 1, offset: 0 }, ...cur.rows],
    []
  );

  const totalDays = rows.reduce(
    (max, cur) => (cur.duration + cur.offset > max ? (max = +cur.duration + +cur.offset) : max),
    0
  );

  const totalMonths = Math.ceil(totalDays / 20);

  return { deliverables, rows, totalDays, totalMonths };
}
