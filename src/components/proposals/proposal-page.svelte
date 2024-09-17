<script lang="ts">
  import clsx from 'clsx';
  import type { ProposalStoryblok } from '$types/bloks';
  import { slugify } from '$lib/utils/paths';
  import { createPackageTimelineData, createRateTimelineData } from '$lib/utils/proposals';
  import RichText from '$components/rich-text.svelte';
  import ProposalHero from './proposal-hero.svelte';
  import ProposalNavigation from './proposal-navigation.svelte';
  import ProposalDeliverables from './proposal-deliverables.svelte';
  import ProposalScope from './proposal-scope.svelte';
  import ProposalTeam from './proposal-team.svelte';
  import ProposalEstimates from './proposal-estimates.svelte';
  import ProposalPackage from './proposal-package.svelte';
  import ProposalTimeline from './proposal-timeline.svelte';
  import ProposalPackageReply from './proposal-package-reply.svelte';
  import ProposalRateReply from './proposal-rate-reply.svelte';

  export let proposal: ProposalStoryblok;

  let versions = proposal?.versions || [];
  let version = versions.length > 0 ? versions[0].version_name : '';

  $: content = versions.find((v) => v.version_name === version);
  $: type = content?.component === 'proposal-version-package' ? 'package' : 'rate';
  $: sections = (content?.body || []).map((section) => section.title || '').filter(Boolean);

  $: timelineData =
    type === 'rate'
      ? createRateTimelineData(content?.estimates || [], content?.team || [])
      : createPackageTimelineData(content?.deliverables || [], content?.team || []);
</script>

{#key version}
  <ProposalNavigation
    {sections}
    versions={versions.map((version) => version.version_name)}
    bind:version
  />

  <ProposalHero {proposal} date={content?.date} />

  {#each content?.body || [] as section}
    <section id={slugify(section.title)} class="my-10 md:my-14 lg:my-20">
      <div
        class={clsx(
          'container mx-auto px-container',
          'grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-10 lg:gap-12'
        )}
      >
        <h3 class="text-4xl">{section.title}</h3>
        <RichText
          doc={section.body}
          getAttributes={(section) => {
            if (
              section.type === 'paragraph' ||
              section.type === 'bullet_list' ||
              section.type === 'ordered_list'
            ) {
              return { class: 'text-foreground-secondary' };
            }

            return {};
          }}
          patternMatchReplace={[
            ['[#CLIENT#]', proposal.client],
            ['[#COMPANY#]', proposal.company_name || '[#COMPANY#]']
          ]}
        />
      </div>

      {#if section.data === 'scope' && content?.scope}
        <ProposalScope data={content.scope} />
      {:else if type === 'package' && section.data === 'deliverables' && content?.deliverables}
        <ProposalDeliverables data={content.deliverables} showManpower={content.show_manpower} />
      {:else if section.data === 'team' && content?.team}
        <ProposalTeam data={content.team} {type} showTeamMembers={content.show_team_members} />
      {:else if type === 'rate' && section.data === 'estimates' && content?.estimates && content?.team}
        <ProposalEstimates
          data={content.estimates}
          discount={content.discount_percentage}
          team={content.team}
        />
      {:else if section.data === 'pricing' && content?.pricing}
        <ProposalPackage data={content.pricing} />
      {:else if section.data === 'timeline' && timelineData}
        <ProposalTimeline data={timelineData} {type} pricing={content?.pricing} />

        {#if type === 'package' && content?.team && content?.deliverables && content?.pricing}
          <ProposalPackageReply
            discount={content?.discount_percentage ? +content.discount_percentage : 0}
            deliverables={content.deliverables}
            pricing={content.pricing}
            team={content.team}
          />
        {/if}
      {/if}
    </section>
  {/each}

  {#if content && type === 'rate'}
    <ProposalRateReply />
  {/if}
{/key}
