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
  rows: Row[];
};

export const DAYS_PER_MONTH: number = 30;

export function createRateTimelineData(
  estimates: ProposalEstimateEntryStoryblok[],
  team: ProposalTeamEntryStoryblok[] | ProposalPackageTeamEntryStoryblok[]
) {
  const teamInfoMap = new Map();

  team.forEach((member) => {
    teamInfoMap.set(member.team_member.member?.name, { role: member.role[0].title });
  });

  const deliverables = estimates?.reduce((acc: Deliverable[], { title, phases, color }) => {
    let rows: Row[] = [];

    phases.forEach((phase) => {
      phase.team.forEach((team) => {
        rows = [
          ...rows,
          {
            duration: +team.duration,
            offset: +team.offset,
            title: phase.title,
            role: teamInfoMap.get(team.team_member.member?.name)?.role,
            color
          }
        ];
      });
    });

    return [...acc, { title, color, rows }];
  }, []);

  const rows = deliverables.reduce(
    (acc: Row[], cur: Deliverable) => [...acc, { duration: 0, offset: 0 }, ...cur.rows],
    []
  );

  const totalDuration = rows.reduce(
    (max: number, cur: Row) =>
      cur.duration + cur.offset > max ? (max = +cur.duration + +cur.offset) : max,
    0
  );

  return { deliverables, rows, totalDuration };
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

  const totalDuration = rows.reduce(
    (max, cur) => (cur.duration + cur.offset > max ? (max = +cur.duration + +cur.offset) : max),
    0
  );

  return { deliverables, rows, totalDuration };
}
