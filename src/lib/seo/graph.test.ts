import { describe, expect, it, vi } from 'vitest';
import type { DynamicPage, Page } from '$lib/content';
import {
  blogIndexStory,
  blogPostStory,
  careerStory,
  configurationContent,
  handbookStory,
  homeStory,
  institutionalLandingStory,
  mock,
  projectStory,
  serviceLandingStory,
  servicesPageStory,
  teamMemberStory
} from './__fixtures__/stories';
import { NON_SERVICE_LANDING_PAGE_SLUGS, SERVICE_LANDING_PAGE_SLUGS } from './constants';
import {
  pageParts,
  partsFromStory,
  storiesToListItems,
  type StorySchemaParts
} from './from-storyblok';
import { buildPageGraph } from './graph';
import { parseManualField } from './manual';
import { serializeJsonLd } from './serialize';
import type { JsonLdGraph, JsonLdNode } from './types';
import { canonicalFromSlug } from './urls';
import { validateGraph } from './validate';
import { organizationFromConfiguration } from './from-storyblok';

const silent = { warn: vi.fn() };

function graphFor(story: DynamicPage, parts: StorySchemaParts = partsFromStory(story)) {
  return buildPageGraph(
    {
      ...parts,
      url: canonicalFromSlug(story.full_slug),
      title: story.content.seo_title || story.name,
      description: story.content.seo_description,
      organization: organizationFromConfiguration(configurationContent)
    },
    silent
  );
}

const byType = (graph: JsonLdGraph, type: string) =>
  graph['@graph'].filter((node) => node['@type'] === type);

const one = (graph: JsonLdGraph, type: string): JsonLdNode => {
  const nodes = byType(graph, type);
  expect(nodes, `exactly one ${type}`).toHaveLength(1);
  return nodes[0];
};

const cases: [string, DynamicPage, string][] = [
  ['home', homeStory, 'WebPage'],
  ['page (services)', servicesPageStory, 'WebPage'],
  ['blog post', blogPostStory, 'BlogPosting'],
  ['team member', teamMemberStory, 'ProfilePage'],
  ['project', projectStory, 'CreativeWork'],
  ['service landing page', serviceLandingStory, 'Service'],
  ['institutional landing page', institutionalLandingStory, 'WebPage'],
  ['handbook', handbookStory, 'Article'],
  ['career', careerStory, 'WebPage']
];

describe('page graph invariants', () => {
  it.each(cases)('%s graph is valid', (_, story, mainType) => {
    const graph = graphFor(story);
    expect(validateGraph(graph)).toEqual([]);
    expect(byType(graph, mainType).length).toBe(1);
  });

  it('collection pages are valid', () => {
    const graph = graphFor(
      blogIndexStory,
      pageParts(blogIndexStory, storiesToListItems([blogPostStory]))
    );
    expect(validateGraph(graph)).toEqual([]);
    expect(one(graph, 'CollectionPage').mainEntity).toEqual({
      '@id': 'https://significa.co/blog#itemlist'
    });
    expect(one(graph, 'ItemList').itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://significa.co/blog/how-emotions-shape-our-shopping-habits',
        name: 'How emotions shape our shopping habits.'
      }
    ]);
  });
});

describe('global nodes', () => {
  it('emits one complete Organization and a WebSite pointing at it', () => {
    const graph = graphFor(homeStory);
    const org = one(graph, 'Organization');
    expect(org).toMatchObject({
      '@id': 'https://significa.co/#organization',
      name: 'Significa',
      url: 'https://significa.co',
      email: 'newbusiness@significa.co'
    });
    expect(org.sameAs).toContain('https://x.com/significadotco');
    expect(one(graph, 'WebSite')).toMatchObject({
      inLanguage: 'en',
      publisher: { '@id': 'https://significa.co/#organization' }
    });
  });

  it('home WebPage is about the Organization and has no breadcrumb', () => {
    const graph = graphFor(homeStory);
    expect(one(graph, 'WebPage')).toMatchObject({
      '@id': 'https://significa.co/#webpage',
      url: 'https://significa.co/',
      about: { '@id': 'https://significa.co/#organization' },
      mainEntity: { '@id': 'https://significa.co/#organization' }
    });
    expect(byType(graph, 'BreadcrumbList')).toHaveLength(0);
  });

  it('describes Significa with the confirmed facts', () => {
    const org = one(graphFor(homeStory), 'Organization');
    expect(org).toMatchObject({
      description: expect.stringContaining('B Corp certified'),
      foundingDate: '2014',
      telephone: '+351926429132',
      address: expect.objectContaining({ postalCode: '4050-609' }),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'newbusiness@significa.co',
        telephone: '+351926429132'
      },
      hasCredential: [expect.objectContaining({ name: 'Certified B Corporation' })],
      memberOf: [expect.objectContaining({ name: '1% for the Planet' })]
    });
  });

  it('uses AboutPage for /about', () => {
    const about = { ...servicesPageStory, full_slug: 'about/', name: 'About' };
    expect(one(graphFor(about), 'AboutPage').url).toBe('https://significa.co/about');
  });

  it('reads Organization fields from the configuration story when present', () => {
    const org = organizationFromConfiguration({
      org_name: 'Significa Lda',
      org_same_as: [{ url: 'https://www.linkedin.com/company/significadotco/' }]
    });
    expect(org.name).toBe('Significa Lda');
    expect(org.sameAs).toEqual(['https://www.linkedin.com/company/significadotco/']);
    expect(org.email).toBe('newbusiness@significa.co');
  });
});

describe('blog post', () => {
  const graph = graphFor(blogPostStory);
  const post = one(graph, 'BlogPosting');

  it('has the required properties', () => {
    expect(post).toMatchObject({
      '@id': 'https://significa.co/blog/how-emotions-shape-our-shopping-habits#article',
      headline: 'How emotions shape our shopping habits.',
      datePublished: '2025-01-20T13:15:48.554Z',
      dateModified: '2026-04-09T09:47:03.431Z',
      publisher: { '@id': 'https://significa.co/#organization' },
      mainEntityOfPage: {
        '@id': 'https://significa.co/blog/how-emotions-shape-our-shopping-habits#webpage'
      },
      keywords: 'Design, E-commerce',
      timeRequired: 'PT6M',
      wordCount: 2,
      image: [
        { '@id': 'https://significa.co/blog/how-emotions-shape-our-shopping-habits#primaryimage' },
        'https://a.storyblok.com/f/198185/3840x1920/c6df7a31db/cover.jpg/m/1200x675/smart',
        'https://a.storyblok.com/f/198185/3840x1920/c6df7a31db/cover.jpg/m/1200x900/smart',
        'https://a.storyblok.com/f/198185/3840x1920/c6df7a31db/cover.jpg/m/1200x1200/smart'
      ]
    });
    expect(post).not.toHaveProperty('articleBody');
  });

  it('links internal authors to their profile page and keeps external authors inline', () => {
    expect(post.author).toEqual([
      expect.objectContaining({
        '@id': 'https://significa.co/about/julieta-frade#person',
        url: 'https://significa.co/about/julieta-frade',
        worksFor: { '@id': 'https://significa.co/#organization' }
      }),
      { '@type': 'Person', name: 'Guest Writer', jobTitle: 'Researcher' }
    ]);
  });

  it('falls back to the Organization when there is no author', () => {
    const story = {
      ...blogPostStory,
      content: { ...blogPostStory.content, authors: [], external_authors: [] }
    };
    expect(one(graphFor(story), 'BlogPosting').author).toEqual({
      '@id': 'https://significa.co/#organization'
    });
  });

  it('builds the breadcrumb from the URL', () => {
    expect(one(graph, 'BreadcrumbList').itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://significa.co/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://significa.co/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How emotions shape our shopping habits.',
        item: 'https://significa.co/blog/how-emotions-shape-our-shopping-habits'
      }
    ]);
  });

  it('ignores the legacy manual BlogPosting', () => {
    expect(JSON.stringify(graph)).not.toContain('Old headline');
  });
});

describe('team member', () => {
  const graph = graphFor(teamMemberStory);

  it('is a ProfilePage with the Person nested as mainEntity (Google profile page)', () => {
    const profile = one(graph, 'ProfilePage');
    expect(profile.dateCreated).toBe(profile.datePublished);
    expect(profile.mainEntity).toMatchObject({
      '@type': 'Person',
      '@id': 'https://significa.co/about/julieta-frade#person',
      name: 'Julieta Frade',
      jobTitle: 'Product Designer',
      worksFor: { '@id': 'https://significa.co/#organization' },
      // Only profile links, without tracking parameters.
      sameAs: ['https://www.linkedin.com/in/julieta']
    });
    expect(byType(graph, 'Person')).toHaveLength(0);
  });

  it('does not claim former team members still work at Significa', () => {
    const former = {
      ...teamMemberStory,
      content: { ...teamMemberStory.content, is_active: false }
    };
    expect(one(graphFor(former), 'ProfilePage').mainEntity).not.toHaveProperty('worksFor');
  });
});

describe('project', () => {
  it('lists the awards shown on the project page', () => {
    const awards = [
      {
        content: {
          year: '2025',
          project: { id: projectStory.id },
          recognition: { content: { title: 'Red Dot', label: 'Award' } }
        }
      },
      {
        content: {
          year: '2024',
          project: { id: 999 },
          recognition: { content: { title: 'iF Design', label: 'Award' } }
        }
      }
    ];
    const work = one(
      graphFor(projectStory, partsFromStory(projectStory, { awards })),
      'CreativeWork'
    );
    expect(work.award).toEqual(['Red Dot: Award (2025)']);
  });

  it('is a CreativeWork by Significa for the client', () => {
    const work = one(graphFor(projectStory), 'CreativeWork');
    expect(work).toMatchObject({
      name: 'Akasha',
      creator: { '@id': 'https://significa.co/#organization' },
      sourceOrganization: { '@type': 'Organization', name: 'Akasha Foundation' },
      keywords: 'Product Design, Development, Web App'
    });
    expect(work.contributor).toHaveLength(1);
  });
});

describe('landing pages', () => {
  it('merges the manual Service into the generated one and keeps code ownership', () => {
    const graph = graphFor(serviceLandingStory);
    expect(one(graph, 'Service')).toMatchObject({
      '@id': 'https://significa.co/finance#service',
      name: 'Finance Digital Product Design',
      serviceType: 'Digital product design and development',
      url: 'https://significa.co/finance',
      provider: { '@id': 'https://significa.co/#organization' }
    });
    expect(one(graph, 'WebPage').mainEntity).toEqual({
      '@id': 'https://significa.co/finance#service'
    });
  });

  it('generates the FAQPage from the visible faqs block, not the manual one', () => {
    const faq = one(graphFor(serviceLandingStory), 'FAQPage');
    expect(faq.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'How long does a fintech project take?',
        acceptedAnswer: { '@type': 'Answer', text: 'Usually 3 to 6 months.' }
      }
    ]);
  });

  it('names the industry as the audience of an industry service', () => {
    expect(one(graphFor(serviceLandingStory), 'Service').audience).toEqual({
      '@type': 'BusinessAudience',
      audienceType: 'Finance'
    });
  });

  it('does not generate a Service for landing pages that are not services', () => {
    expect(byType(graphFor(institutionalLandingStory), 'Service')).toHaveLength(0);
  });

  it('classifies every known landing page', () => {
    const all = [...SERVICE_LANDING_PAGE_SLUGS, ...NON_SERVICE_LANDING_PAGE_SLUGS];
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('FAQs in article bodies', () => {
  it('generates the FAQPage from a faqs block embedded in a blog post body', () => {
    const story = {
      ...blogPostStory,
      content: {
        ...blogPostStory.content,
        body: {
          type: 'doc',
          content: [
            {
              type: 'blok',
              attrs: {
                body: [
                  {
                    _uid: 'f',
                    component: 'faqs',
                    questions: [
                      {
                        _uid: 'q',
                        component: 'faq',
                        question: 'Is this rendered?',
                        body: {
                          type: 'doc',
                          content: [
                            { type: 'paragraph', content: [{ type: 'text', text: 'Yes.' }] }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    };
    expect(one(graphFor(story), 'FAQPage').mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Is this rendered?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes.' }
      }
    ]);
  });
});

describe('handbook', () => {
  it('is an Article written and published by Significa, dated by last_updated', () => {
    expect(one(graphFor(handbookStory), 'Article')).toMatchObject({
      headline: 'Money matters',
      author: { '@id': 'https://significa.co/#organization' },
      publisher: { '@id': 'https://significa.co/#organization' },
      dateModified: new Date('2026-02-01T00:00').toISOString()
    });
  });
});

describe('manual field', () => {
  it('accepts only FAQPage, HowTo, Service and ItemList', () => {
    const result = parseManualField(
      JSON.stringify([
        { '@type': 'Organization', name: 'Significa' },
        { '@type': 'WebPage' },
        { '@type': 'BreadcrumbList' },
        { '@type': 'Article' },
        { '@type': 'Person' },
        { '@type': 'CreativeWork' },
        { '@type': 'HowTo', name: 'How we work' },
        { '@type': 'ItemList', itemListElement: [] }
      ]),
      'https://significa.co/services'
    );
    expect(result.status).toBe('ok');
    expect(result.accepted.map((n) => n.type)).toEqual(['HowTo', 'ItemList']);
    expect(result.ignored).toHaveLength(6);
  });

  it('replaces an inline Significa Organization with a reference', () => {
    const result = parseManualField(
      JSON.stringify({
        '@type': 'Service',
        name: 'X',
        provider: { '@type': 'Organization', name: 'Significa' }
      }),
      'https://significa.co/services'
    );
    expect(result.accepted[0].node.provider).toEqual({
      '@id': 'https://significa.co/#organization'
    });
  });

  it('ignores invalid JSON and logs a warning without breaking the page', () => {
    const logger = { warn: vi.fn() };
    const story = {
      ...servicesPageStory,
      content: { ...servicesPageStory.content, structure_data_markup: '{ not json' }
    };
    const graph = buildPageGraph(
      {
        ...partsFromStory(story),
        url: 'https://significa.co/services',
        title: 'Services',
        organization: organizationFromConfiguration(undefined)
      },
      logger
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('invalid structure_data_markup')
    );
    expect(validateGraph(graph)).toEqual([]);
  });

  it('accepts a manual FAQPage only when its questions and answers are rendered', () => {
    const graph = graphFor(servicesPageStory);
    expect(one(graph, 'FAQPage')['@id']).toBe('https://significa.co/services#faq');

    // Question visible, answer not.
    const answerHidden = mock<Page>({
      ...servicesPageStory,
      content: {
        ...servicesPageStory.content,
        blocks: [{ _uid: 'h1', component: 'hero', heading: 'What we do' }]
      }
    });
    expect(byType(graphFor(answerHidden), 'FAQPage')).toHaveLength(0);

    // Text only in a field the template does not render does not count.
    const onlyInUnrenderedField = mock<Page>({
      ...servicesPageStory,
      content: {
        ...servicesPageStory.content,
        blocks: [{ _uid: 'h1', component: 'hero', heading: 'Something else' }],
        page: [{ _uid: 'sp', component: 'static-page', body: 'What we do Products.' }]
      }
    });
    expect(byType(graphFor(onlyInUnrenderedField), 'FAQPage')).toHaveLength(0);
  });

  it('keeps references between manual nodes when their ids are rewritten', () => {
    const result = parseManualField(
      JSON.stringify([
        { '@type': 'HowTo', '@id': '#how', name: 'How we work', step: { '@id': '#steps' } },
        { '@type': 'ItemList', '@id': '#steps', itemListElement: [] }
      ]),
      'https://significa.co/services'
    );
    expect(result.accepted[0].node.step).toEqual({ '@id': 'https://significa.co/services#steps' });
    expect(result.accepted[1].node['@id']).toBe('https://significa.co/services#steps');
  });

  it('only treats ids on the Significa host as Significa nodes', () => {
    const result = parseManualField(
      JSON.stringify({
        '@type': 'Service',
        name: 'X',
        provider: { '@id': 'https://significa.co/#organization' },
        broker: {
          '@type': 'Organization',
          '@id': 'https://partner.example/#organization',
          name: 'Partner'
        }
      }),
      'https://significa.co/services'
    );
    expect(result.accepted[0].node.broker).toEqual({
      '@type': 'Organization',
      '@id': 'https://partner.example/#organization',
      name: 'Partner'
    });
  });

  it('keeps query parameters that identify external resources, drops tracking', () => {
    const result = parseManualField(
      JSON.stringify({
        '@type': 'HowTo',
        name: 'Video',
        video: { '@type': 'VideoObject', url: 'https://www.youtube.com/watch?v=abc&utm_source=x' }
      }),
      'https://significa.co/services'
    );
    expect(result.accepted[0].node.video).toMatchObject({
      url: 'https://www.youtube.com/watch?v=abc'
    });
  });

  it('never produces dangling references or duplicate main nodes', () => {
    const graph = graphFor(servicesPageStory);
    expect(validateGraph(graph)).toEqual([]);
    expect(byType(graph, 'Service')).toHaveLength(1);
    expect(byType(graph, 'WebPage')).toHaveLength(1);
  });
});

describe('serialisation', () => {
  it('escapes < so CMS content cannot close the script tag', () => {
    const graph = graphFor(blogPostStory, {
      ...partsFromStory(blogPostStory),
      entity: {
        kind: 'blog-post',
        headline: '</script><script>alert(1)</script>',
        authors: [],
        keywords: []
      }
    });
    const output = serializeJsonLd(graph);
    expect(output).not.toContain('</script');
    expect(output).not.toContain('<');
    expect(JSON.parse(output)).toEqual(graph);
  });
});

describe('validator', () => {
  it('catches the failure modes it is meant to guard', () => {
    const graph: JsonLdGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://significa.co/#organization' },
        {
          '@type': 'WebPage',
          '@id': 'https://significa.co/x#webpage',
          url: '/x?utm=1',
          isPartOf: { '@id': 'https://significa.co/#website' }
        },
        { '@type': 'WebPage', '@id': 'https://significa.co/x#webpage' },
        { '@type': 'BlogPosting', headline: 'x' }
      ]
    };
    const errors = validateGraph(graph).join('\n');
    expect(errors).toContain('Organization is missing name');
    expect(errors).toContain('Duplicate @id');
    expect(errors).toContain('More than one WebPage');
    expect(errors).toContain('Dangling reference');
    expect(errors).toContain('BlogPosting is missing datePublished');
    expect(errors).toContain('Non-canonical URL');
  });
});
