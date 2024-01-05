import type {
  ProposalDeliverableStoryblok,
  ProposalEstimateEntryStoryblok,
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
  team: ProposalTeamEntryStoryblok[]
) {
  const teamInfoMap = new Map();
  let deliverables: Deliverable[] = [];

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member.name, { role: member.role[0].title });
  });

  let phaseOffset: number = 0;

  estimates?.forEach(({ title, phases, color }) => {
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
    totalMonths
  };
}

export function createPackageTimelineData(data: ProposalDeliverableStoryblok[]) {
  const deliverables = data.map(({ color, team, title }) => {
    const rows = team.map((member) => ({
      duration: +member.duration,
      offset: +member.offset,
      title: 'lorem ipsum',
      role: member.role[0].title,
      color: color
    }));

    return { color, title, rows };
  });

  const rows = deliverables.reduce(
    (acc: Row[], cur) => [...acc, { duration: 0, offset: 0 }, ...cur.rows],
    []
  );

  return { deliverables, rows, totalMonths: 3 };
}
