/**
 * Minimal Storyblok stories, one per content type, shaped like the CDN API
 * responses (with relations resolved). Field values mirror real content.
 */
import type {
  BlogPostPage,
  CareerPage,
  HandbookPage,
  LandingPage,
  Page,
  ProjectPage,
  TeamMemberPage
} from '$lib/content';
import type { ISbStoryData } from '@storyblok/js';

const asset = (path: string, alt = '') => ({
  id: 1,
  alt,
  name: '',
  focus: null,
  source: null,
  title: null,
  copyright: null,
  fieldtype: 'asset',
  filename: `https://a.storyblok.com/f/198185/${path}`
});

const base = (fields: { name: string; slug: string; full_slug: string }) => ({
  ...fields,
  id: 1,
  uuid: `uuid-${fields.slug}`,
  created_at: '2025-01-10T10:00:00.000Z',
  first_published_at: '2025-01-20T13:15:48.554Z',
  published_at: '2026-04-09T09:47:03.431Z',
  tag_list: [] as string[],
  lang: 'default',
  path: null,
  parent_id: 0,
  position: 0,
  is_startpage: false,
  sort_by_date: null,
  meta_data: null,
  group_id: '',
  release_id: null,
  alternates: [],
  default_full_slug: null,
  translated_slugs: null
});

/**
 * Test mock: Storyblok's ISbStoryData has dozens of required fields the schema
 * code never reads, so fixtures intentionally leave them out.
 */
export const mock = <T extends ISbStoryData>(value: unknown) => value as T;

export const julieta = {
  ...base({ name: 'Julieta Frade', slug: 'julieta-frade', full_slug: 'about/julieta-frade' }),
  content: {
    _uid: 'tm1',
    component: 'team-member',
    position: 'Product Designer',
    bio: 'Designs products at Significa.',
    is_active: true,
    photo: asset('1200x1600/aaaa/julieta.jpg', 'Julieta Frade'),
    links: [
      {
        _uid: 'l1',
        component: 'team-member-link',
        type: 'linkedin',
        link: 'https://www.linkedin.com/in/julieta?utm_source=share'
      }
    ],
    buttons: [
      {
        _uid: 'b1',
        component: 'team-buttons',
        link_type: 'url',
        title: 'Book',
        link: 'https://calendly.com/x'
      }
    ]
  }
};

export const teamMemberStory = mock<TeamMemberPage>(julieta);

export const blogPostStory = mock<BlogPostPage>({
  ...base({
    name: 'How emotions shape our shopping habits.',
    slug: 'how-emotions-shape-our-shopping-habits',
    full_slug: 'blog/how-emotions-shape-our-shopping-habits'
  }),
  tag_list: ['Design', 'E-commerce'],
  content: {
    _uid: 'bp1',
    component: 'blog-post',
    seo_title: 'How emotions shape shopping habits',
    seo_description: 'Discover how emotions drive purchasing decisions.',
    intro: 'Is the third Monday of January that bad?',
    reading_time: '6',
    cover: asset('3840x1920/c6df7a31db/cover.jpg'),
    no_index: false,
    hide_from_listings: false,
    authors: [julieta],
    external_authors: [
      {
        _uid: 'e1',
        component: 'external-author',
        name: 'Guest Writer',
        position: 'Researcher',
        bio: '',
        is_active: false
      }
    ],
    // Legacy manual markup: a BlogPosting (ignored) and a FAQ that is not on the page (ignored).
    structure_data_markup: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Old headline',
      mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://significa.co/blog/' }
    }),
    body: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Body </script><script>alert(1)</script>' }]
        }
      ]
    }
  }
});

export const projectStory = mock<ProjectPage>({
  ...base({ name: 'Akasha', slug: 'akasha', full_slug: 'projects/akasha' }),
  content: {
    _uid: 'p1',
    component: 'project',
    tagline: 'A platform for decentralised social.',
    intro: 'We designed and built the Akasha World app.',
    client: 'Akasha Foundation',
    services: ['Product Design', 'Development'],
    deliverables: ['Web App'],
    cover: asset('2880x1620/bbbb/akasha.jpg'),
    team: [julieta, 'unresolved-uuid'],
    thumbnail: [],
    no_index: false,
    hide_from_listings: false,
    show_cover_image: true,
    show_reel_controls: false
  }
});

const faqsBlock = {
  _uid: 'f1',
  component: 'faqs',
  title: 'Frequently Asked Questions',
  questions: [
    {
      _uid: 'q1',
      component: 'faq',
      question: 'How long does a fintech project take?',
      body: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Usually 3 to 6 months.' }] }
        ]
      }
    }
  ]
};

export const serviceLandingStory = mock<LandingPage>({
  ...base({ name: 'Finance', slug: 'finance', full_slug: 'finance' }),
  content: {
    _uid: 'lp1',
    component: 'landing-page',
    seo_title: 'Finance Digital Products.',
    seo_description: 'We design and build digital products for finance companies.',
    keep_top_bar_hidden: false,
    blocks: [faqsBlock],
    structure_data_markup: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://significa.co/#organization', name: 'Significa' },
        { '@type': 'WebPage', '@id': 'https://significa.co/finance#webpage', name: 'Finance' },
        {
          '@type': 'Service',
          '@id': 'https://significa.co/finance#service',
          name: 'Finance Digital Product Design',
          serviceType: 'Digital product design and development',
          provider: { '@type': 'Organization', name: 'Significa', url: 'https://significa.co' },
          areaServed: 'Worldwide'
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Old question',
              acceptedAnswer: { '@type': 'Answer', text: 'x' }
            }
          ]
        }
      ]
    })
  }
});

export const institutionalLandingStory = mock<LandingPage>({
  ...base({ name: 'B Corp', slug: 'b-corp', full_slug: 'b-corp' }),
  content: {
    _uid: 'lp2',
    component: 'landing-page',
    seo_title: 'B Corp',
    keep_top_bar_hidden: false,
    blocks: []
  }
});

export const servicesPageStory = mock<Page>({
  ...base({ name: 'Services', slug: 'services', full_slug: 'services' }),
  content: {
    _uid: 'pg1',
    component: 'page',
    seo_title: 'Services',
    seo_description: 'Strategy, design and engineering.',
    blocks: [
      { _uid: 'h1', component: 'hero', heading: 'What we do' },
      { _uid: 't1', component: 'text-with-media', text: 'Products.' }
    ],
    // Not rendered when `blocks` is set (pages/page.svelte), so not "visible".
    page: [{ _uid: 'sp', component: 'static-page', body: 'Hidden answer.' }],
    structure_data_markup: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://significa.co/services#webpage',
          mainEntity: { '@id': 'https://significa.co/services#faq' }
        },
        {
          '@type': 'Service',
          name: 'Digital Product Design & Development',
          provider: { '@id': 'https://significa.co/#organization' }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://significa.co/services#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What we do',
              acceptedAnswer: { '@type': 'Answer', text: 'Products.' }
            }
          ]
        }
      ]
    })
  }
});

export const homeStory = mock<Page>({
  ...base({ name: 'Home', slug: 'home', full_slug: 'home' }),
  content: {
    _uid: 'home',
    component: 'page',
    seo_title: 'Significa',
    page: [],
    blocks: [faqsBlock]
  }
});

export const blogIndexStory = mock<Page>({
  ...base({ name: 'Blog', slug: 'blog', full_slug: 'blog/' }),
  content: {
    _uid: 'bi',
    component: 'page',
    seo_title: 'Blog',
    page: [{ _uid: 'x', component: 'blog-index' }]
  }
});

export const handbookStory = mock<HandbookPage>({
  ...base({ name: 'Money matters', slug: 'money-matters', full_slug: 'handbook/money-matters' }),
  content: {
    _uid: 'hb',
    component: 'handbook',
    last_updated: '2026-02-01 00:00',
    cover: asset('1600x900/cccc/money.png'),
    seo_title: 'Money matters'
  }
});

export const careerStory = mock<CareerPage>({
  ...base({ name: 'Careers', slug: 'careers', full_slug: 'careers/designer' }),
  content: { _uid: 'c', component: 'career', seo_title: 'Product Designer' }
});

export const configurationContent = { _uid: 'cfg', component: 'configuration' };
