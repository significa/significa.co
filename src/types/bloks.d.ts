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
    | PhysicsStickerStoryblok
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

export interface AwardsEntryStoryblok {
  image?: AssetStoryblok;
  label?: string;
  name?: string;
  project?: string;
  link_text?: string;
  link?: MultilinkStoryblok;
  _uid: string;
  component: 'awards_entry';
  [k: string]: any;
}

export interface BenefitsEntryStoryblok {
  image?: AssetStoryblok;
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

export interface CanvasChecklistStoryblok {
  title?: string;
  items?: CanvasChecklistItemStoryblok[];
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-checklist';
  [k: string]: any;
}

export interface CanvasChecklistItemStoryblok {
  text?: string;
  _uid: string;
  component: 'canvas-checklist-item';
  [k: string]: any;
}

export interface CanvasEggStoryblok {
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-egg';
  [k: string]: any;
}

export interface CanvasEggHatchingStoryblok {
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-egg-hatching';
  [k: string]: any;
}

export interface CanvasGroupStoryblok {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  items?: (
    | CanvasChecklistStoryblok
    | CanvasMediaStoryblok
    | CanvasTalkBalloonStoryblok
    | CanvasTeamStoryblok
    | CanvasYellowStickerStoryblok
    | TimelineArrowStoryblok
    | TimelineTextStoryblok
    | CanvasTictactoeStoryblok
    | CanvasTarotStoryblok
    | CanvasPlantStoryblok
    | CanvasEggStoryblok
    | CanvasEggHatchingStoryblok
  )[];
  _uid: string;
  component: 'canvas-group';
  [k: string]: any;
}

export interface CanvasMediaStoryblok {
  image?: AssetStoryblok;
  width?: number;
  height?: number;
  border?: boolean;
  top: number;
  left: number;
  scale?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-media';
  [k: string]: any;
}

export interface CanvasPlantStoryblok {
  plant?: any;
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-plant';
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

export interface CanvasTarotStoryblok {
  image?: 'sun' | 'moon';
  text?: CanvasTarotTextStoryblok[];
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-tarot';
  [k: string]: any;
}

export interface CanvasTarotTextStoryblok {
  text?: string;
  _uid: string;
  component: 'canvas-tarot-text';
  [k: string]: any;
}

export interface CanvasTeamStoryblok {
  team?: number | string;
  _uid: string;
  component: 'canvas-team';
  [k: string]: any;
}

export interface CanvasTictactoeStoryblok {
  top?: number;
  left?: number;
  rotate?: number;
  _uid: string;
  component: 'canvas-tictactoe';
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
  page_title1?: string;
  page_title2?: string;
  form_support_text?: string;
  gallery?: (NotepadCardStoryblok | PhotoCardStoryblok)[];
  _uid: string;
  component: 'contacts-page';
  [k: string]: any;
}

export interface DeliverableStoryblok {
  _uid: string;
  component: 'deliverable';
  [k: string]: any;
}

export interface DeliverablesEntryStoryblok {
  icon?: AssetStoryblok;
  title?: string;
  description?: string;
  _uid: string;
  component: 'deliverables_entry';
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
  draft?: boolean;
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
  showreel_cover: AssetStoryblok;
  showreel_button_theme?: '' | 'light' | 'dark';
  showreel_button_label?: string;
  work_title?: string;
  projects?: (StoryblokStory<ProjectStoryblok> | string)[];
  services_title1?: string;
  services_title2?: string;
  services_description?: string;
  services_cta_label?: string;
  services_cta_link?: MultilinkStoryblok;
  about_title1?: string;
  about_title2?: string;
  about_description?: string;
  about_physics_cards?: (
    | PhysicsBalloonCardStoryblok
    | PhysicsInputStoryblok
    | PhysicsRectangleCardStoryblok
    | PhysicsStickerStoryblok
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
  handbook_cta_text?: string;
  handbook_cta_link?: MultilinkStoryblok;
  careers_title?: string;
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
    | ServicesPageStoryblok
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

export interface PhysicsStickerStoryblok {
  photo?: AssetStoryblok;
  _uid: string;
  component: 'physics-sticker';
  [k: string]: any;
}

export interface ProjectStoryblok {
  cover?: AssetStoryblok;
  reel?: AssetStoryblok;
  reel_button?: any;
  reel_button_theme?: '' | 'light' | 'dark';
  reel_button_label?: string;
  thumbnail: MultiassetStoryblok;
  tagline: string;
  intro: string;
  team?: (StoryblokStory<TeamMemberStoryblok> | string)[];
  client?: string;
  deliverables?: string;
  services?: string;
  links?: LinkStoryblok[];
  recognitions?: RecognitionStoryblok[];
  body?: any;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
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

export interface ServicesDeppartmentStoryblok {
  title?: string;
  entry?: ServicesGroupEntryStoryblok[];
  _uid: string;
  component: 'services_deppartment';
  [k: string]: any;
}

export interface ServicesEntryStoryblok {
  label?: string;
  _uid: string;
  component: 'services_entry';
  [k: string]: any;
}

export interface ServicesGroupEntryStoryblok {
  title?: string;
  list?: ServicesEntryStoryblok[];
  _uid: string;
  component: 'services_group_entry';
  [k: string]: any;
}

export interface ServicesPageStoryblok {
  page_title1?: string;
  page_title2?: string;
  timeline?: ServiceTimelineRowStoryblok[];
  awards_title?: string;
  awards_description?: string;
  awards?: AwardsEntryStoryblok[];
  showreel?: AssetStoryblok;
  showreel_button_label?: string;
  services_title?: string;
  services_description?: string;
  services?: ServicesDeppartmentStoryblok[];
  deliverables_title?: string;
  deliverables?: DeliverablesEntryStoryblok[];
  testimonials_title1?: string;
  testimonials_title2?: string;
  testimonials_cta_label?: string;
  testimonials_cta_link?: MultilinkStoryblok;
  testimonials?: RichtextTestimonialStoryblok[];
  clients_title?: string;
  clients?: ClientLogoStoryblok[];
  _uid: string;
  component: 'services-page';
  [k: string]: any;
}

export interface ServiceTimelineCellStoryblok {
  label?: string;
  before_light?: AssetStoryblok;
  before_dark?: AssetStoryblok;
  after_light?: AssetStoryblok;
  after_dark?: AssetStoryblok;
  decoration?: any;
  decoration_light?: AssetStoryblok;
  decoration_dark?: AssetStoryblok;
  left_offset?: number;
  throw_confetti?: boolean;
  _uid: string;
  component: 'service-timeline-cell';
  [k: string]: any;
}

export interface ServiceTimelineRowStoryblok {
  title?: string;
  subrows?: ServiceTimelineSubrowStoryblok[];
  _uid: string;
  component: 'service-timeline-row';
  [k: string]: any;
}

export interface ServiceTimelineSubrowStoryblok {
  cells?: ServiceTimelineCellStoryblok[];
  _uid: string;
  component: 'service-timeline-subrow';
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
  flip?: boolean;
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
  illustration: 'people' | 'teamwork' | 'aspiration';
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
