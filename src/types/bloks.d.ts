import { StoryblokStory } from 'storyblok-generate-ts';

export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: 'story';
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: 'asset' | 'url';
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: 'email';
      [k: string]: any;
    };

export interface AboutPageStoryblok {
  page_title?: string;
  physics_blocks?: (
    | PhysicsBalloonCardStoryblok
    | PhysicsRectangleCardStoryblok
    | PhysicsInputStoryblok
  )[];
  about_title1?: string;
  about_title2?: string;
  about_description?: string;
  timeline?: TimelineSectionStoryblok[];
  values_title1?: string;
  values_title2?: string;
  values_description?: string;
  values?: ValueStoryblok[];
  testimonials_title1?: string;
  testimonials_title2?: string;
  testimonials_cta_label?: string;
  testimonials_cta_link?: MultilinkStoryblok;
  testimonials?: RichtextTestimonialStoryblok[];
  clients_title?: string;
  clients?: ClientLogoStoryblok[];
  office_title1?: string;
  office_title2?: string;
  office_description?: string;
  office_cards?: (NotepadCardStoryblok | PhotoCardStoryblok)[];
  _uid: string;
  component: 'about-page';
  [k: string]: any;
}

export interface BenefitsEntryStoryblok {
  icon?: '' | 'clock' | 'book' | 'laptop' | 'tshape';
  title?: string;
  description?: string;
  _uid: string;
  component: 'benefits-entry';
  [k: string]: any;
}

export interface BlogIndexStoryblok {
  _uid: string;
  component: 'blog-index';
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface BlogPostStoryblok {
  cover?: AssetStoryblok;
  intro: string;
  author: StoryblokStory<TeamMemberStoryblok> | string;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  body?: any;
  _uid: string;
  component: 'blog-post';
  [k: string]: any;
}

export interface CanvasGroupStoryblok {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  items?: (
    | CanvasTalkBalloonStoryblok
    | CanvasTeamStoryblok
    | CanvasYellowStickerStoryblok
    | TimelineArrowStoryblok
    | TimelineImageStoryblok
    | TimelineSectionStoryblok
    | TimelineTextStoryblok
  )[];
  _uid: string;
  component: 'canvas-group';
  [k: string]: any;
}

export interface CanvasTalkBalloonStoryblok {
  position?: 'left' | 'right';
  text?: string;
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-talk-balloon';
  [k: string]: any;
}

export interface CanvasTeamStoryblok {
  name?: string;
  roster?: (StoryblokStory<TeamMemberStoryblok> | string)[];
  _uid: string;
  component: 'canvas-team';
  [k: string]: any;
}

export interface CanvasYellowStickerStoryblok {
  text?: string;
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-yellow-sticker';
  [k: string]: any;
}

export interface CareerStoryblok {
  cover?: AssetStoryblok;
  body?: any;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  _uid: string;
  component: 'career';
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface CareersPageStoryblok {
  page_title?: string;
  canvas?: any;
  canvas_width?: number;
  canvas_height?: number;
  canvas_items?: CanvasGroupStoryblok[];
  careers_title1?: string;
  careers_title2?: string;
  careers_description?: string;
  open_positions_title?: string;
  open_positions_description?: string;
  images?: MultiassetStoryblok;
  benefits_title?: string;
  benefits_description?: string;
  benefits?: BenefitsEntryStoryblok[];
  _uid: string;
  component: 'careers-page';
  [k: string]: any;
}

export interface ClientStoryblok {
  catech_labs?: string;
  _uid: string;
  component: 'client';
  [k: string]: any;
}

export interface ClientLogoStoryblok {
  light_mode?: AssetStoryblok;
  dark_mode?: AssetStoryblok;
  _uid: string;
  component: 'client-logo';
  [k: string]: any;
}

export interface ColumnStoryblok {
  content: any;
  sticky?: boolean;
  _uid: string;
  component: 'column';
  [k: string]: any;
}

export interface ComparisonStoryblok {
  width?: '' | 'narrow' | 'medium' | 'wide';
  image_a: AssetStoryblok;
  image_b: AssetStoryblok;
  _uid: string;
  component: 'comparison';
  [k: string]: any;
}

export interface ConfigurationStoryblok {
  primary_navigation?: any[];
  call_to_action?: LinkStoryblok[];
  footer?: (FooterColumnInternalStoryblok | FooterColumnExternalStoryblok)[];
  _uid: string;
  component: 'configuration';
  [k: string]: any;
}

export interface ContactsPageStoryblok {
  _uid: string;
  component: 'contacts-page';
  [k: string]: any;
}

export interface DeliverableStoryblok {
  _uid: string;
  component: 'deliverable';
  [k: string]: any;
}

export interface FooterColumnExternalStoryblok {
  title?: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: 'footer-column-external';
  [k: string]: any;
}

export interface FooterColumnInternalStoryblok {
  title?: string;
  links?: any[];
  _uid: string;
  component: 'footer-column-internal';
  [k: string]: any;
}

export interface GetAQuotePageStoryblok {
  title?: string;
  subtitle?: string;
  timezone_text?: any;
  steps_title?: string;
  steps_subtitle?: string;
  steps?: GetAQuoteStepStoryblok[];
  images?: MultiassetStoryblok;
  _uid: string;
  component: 'get-a-quote-page';
  [k: string]: any;
}

export interface GetAQuoteStepStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: 'get-a-quote-step';
  [k: string]: any;
}

export interface HandbookStoryblok {
  cover?: AssetStoryblok;
  tagline?: string;
  intro?: string;
  body?: any;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  _uid: string;
  component: 'handbook';
  [k: string]: any;
}

export interface HomeAboutLinkStoryblok {
  title?: string;
  description?: string;
  link_label?: string;
  link?: MultilinkStoryblok;
  _uid: string;
  component: 'home-about-link';
  [k: string]: any;
}

export interface HomePageStoryblok {
  small_highlights?: (
    | StoryblokStory<CareerStoryblok>
    | StoryblokStory<ProjectStoryblok>
    | StoryblokStory<HandbookStoryblok>
    | StoryblokStory<BlogPostStoryblok>
    | string
  )[];
  showreel?: AssetStoryblok;
  showreel_button_label?: string;
  work_title?: string;
  projects?: (StoryblokStory<ProjectStoryblok> | string)[];
  about_title1?: string;
  about_title2?: string;
  about_description?: string;
  about_physics_cards?: (
    | PhysicsBalloonCardStoryblok
    | PhysicsInputStoryblok
    | PhysicsRectangleCardStoryblok
  )[];
  about_link?: LinkStoryblok[];
  about_links?: HomeAboutLinkStoryblok[];
  testimonials_title1?: string;
  testimonials_title2?: string;
  testimonials_cta_label?: string;
  testimonials_cta_link?: MultilinkStoryblok;
  testimonials?: RichtextTestimonialStoryblok[];
  blog_title1?: string;
  blog_title2?: string;
  handbook_title?: string;
  handbook_description?: string;
  careers_button_label?: string;
  _uid: string;
  component: 'home-page';
  [k: string]: any;
}

export interface ImageStoryblok {
  width?: '' | 'narrow' | 'medium' | 'wide' | 'full';
  image: AssetStoryblok;
  expandable?: boolean;
  _uid: string;
  component: 'image';
  [k: string]: any;
}

export interface ImageGridStoryblok {
  width?: '' | 'medium' | 'wide';
  density?: '' | 'regular' | 'loose' | 'tight';
  images: MultiassetStoryblok;
  expandable?: boolean;
  _uid: string;
  component: 'image-grid';
  [k: string]: any;
}

export interface LinkStoryblok {
  label?: string;
  link?: MultilinkStoryblok;
  _uid: string;
  component: 'link';
  [k: string]: any;
}

export interface NotepadCardStoryblok {
  text?: string;
  _uid: string;
  component: 'notepad_card';
  [k: string]: any;
}

export interface PageStoryblok {
  page?: (
    | AboutPageStoryblok
    | BlogIndexStoryblok
    | CareersPageStoryblok
    | ContactsPageStoryblok
    | GetAQuotePageStoryblok
    | HomePageStoryblok
    | ProjectsIndexStoryblok
    | StaticPageStoryblok
  )[];
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  _uid: string;
  component: 'page';
  uuid?: string;
  [k: string]: any;
}

export interface PhotoCardStoryblok {
  photo?: AssetStoryblok;
  _uid: string;
  component: 'photo_card';
  [k: string]: any;
}

export interface PhysicsBalloonCardStoryblok {
  text?: string;
  theme?: 'inverted' | 'panel' | 'offset' | 'yellow';
  _uid: string;
  component: 'physics-balloon-card';
  [k: string]: any;
}

export interface PhysicsInputStoryblok {
  placeholder?: string;
  _uid: string;
  component: 'physics-input';
  [k: string]: any;
}

export interface PhysicsRectangleCardStoryblok {
  text?: string;
  theme?: 'transparent' | 'yellow';
  _uid: string;
  component: 'physics-rectangle-card';
  [k: string]: any;
}

export interface ProjectStoryblok {
  cover?: AssetStoryblok;
  thumbnail: MultiassetStoryblok;
  tagline: string;
  intro: string;
  team?: (StoryblokStory<TeamMemberStoryblok> | string)[];
  client?: string;
  deliverables?: string;
  services?: string;
  links?: LinkStoryblok[];
  body?: any;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  recognitions?: RecognitionStoryblok[];
  _uid: string;
  component: 'project';
  [k: string]: any;
}

export interface ProjectsIndexStoryblok {
  _uid: string;
  component: 'projects-index';
  [k: string]: any;
}

export interface RecognitionStoryblok {
  label: string;
  title: string;
  image: AssetStoryblok;
  _uid: string;
  component: 'recognition';
  [k: string]: any;
}

export interface RichtextBoxStoryblok {
  layout?: '' | 'horizontal' | 'vertical';
  image?: AssetStoryblok;
  title?: string;
  text?: string;
  link?: LinkStoryblok[];
  _uid: string;
  component: 'richtext-box';
  [k: string]: any;
}

export interface RichtextCodeBlockStoryblok {
  language?:
    | ''
    | 'html'
    | 'javascript'
    | 'css'
    | 'typescript'
    | 'svelte'
    | 'elixir'
    | 'bash'
    | 'clike';
  line_numbers?: boolean;
  line_numbers_start?: number;
  highlighted_lines?: string;
  code?: string;
  _uid: string;
  component: 'richtext-code-block';
  [k: string]: any;
}

export interface RichtextTestimonialStoryblok {
  photo?: AssetStoryblok;
  name: string;
  position?: string;
  testimonial: string;
  _uid: string;
  component: 'richtext-testimonial';
  [k: string]: any;
}

export interface RootStoryblok {
  catech_labs?: string;
  _uid: string;
  component: 'root';
  [k: string]: any;
}

export interface ServiceStoryblok {
  _uid: string;
  component: 'service';
  [k: string]: any;
}

export interface StaticPageStoryblok {
  body?: any;
  _uid: string;
  component: 'static-page';
  [k: string]: any;
}

export interface TeamMemberStoryblok {
  photo?: AssetStoryblok;
  egg?: AssetStoryblok;
  position?: string;
  team?: number | string;
  bio?: string;
  links?: TeamMemberLinkStoryblok[];
  is_active?: boolean;
  _uid: string;
  component: 'team-member';
  [k: string]: any;
}

export interface TeamMemberLinkStoryblok {
  type?:
    | ''
    | 'website'
    | 'twitter'
    | 'dribbble'
    | 'github'
    | 'behance'
    | 'readcv'
    | 'instagram'
    | 'facebook'
    | 'linkedin'
    | 'other';
  link?: string;
  _uid: string;
  component: 'team-member-link';
  [k: string]: any;
}

export interface TimelineArrowStoryblok {
  variant: '' | 'one' | 'two' | 'three' | 'four' | 'five';
  top: number;
  left: number;
  scale?: number;
  rotate?: number;
  _uid: string;
  component: 'timeline-arrow';
  [k: string]: any;
}

export interface TimelineImageStoryblok {
  image?: AssetStoryblok;
  border?: boolean;
  top: number;
  left: number;
  scale?: number;
  rotate?: number;
  _uid: string;
  component: 'timeline-image';
  [k: string]: any;
}

export interface TimelineSectionStoryblok {
  items?: (TimelineArrowStoryblok | TimelineImageStoryblok | TimelineTextStoryblok)[];
  width: number;
  _uid: string;
  component: 'timeline-section';
  [k: string]: any;
}

export interface TimelineTextStoryblok {
  text?: string;
  link?: LinkStoryblok[];
  width: number;
  top: number;
  left: number;
  _uid: string;
  component: 'timeline-text';
  [k: string]: any;
}

export interface TwoColumnsStoryblok {
  width?: '' | 'wide';
  columns: (ColumnMediaStoryblok | ColumnStoryblok)[];
  _uid: string;
  component: 'two-columns';
  [k: string]: any;
}

export interface ValueStoryblok {
  illustration?: any;
  title?: string;
  description?: string;
  _uid: string;
  component: 'value';
  [k: string]: any;
}

export interface VideoStoryblok {
  width?: '' | 'narrow' | 'medium' | 'wide' | 'full';
  video: AssetStoryblok;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  _uid: string;
  component: 'video';
  [k: string]: any;
}
