import { StoryblokStory } from 'storyblok-generate-ts';

export interface AboutGridStoryblok {
  about_links?: HomeAboutLinkStoryblok[];
  _uid: string;
  component: 'about-grid';
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: 'story';
      target?: '_self' | '_blank';
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: 'asset' | 'url';
      target?: '_self' | '_blank';
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: 'email';
      target?: '_self' | '_blank';
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
  size?: 'h3' | 'h2';
  variant?: 'one' | 'two';
  testimonials_cta_label?: string;
  testimonials_cta_link?: Exclude<
    MultilinkStoryblok,
    { linktype?: 'email' } | { linktype?: 'asset' }
  >;
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
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface AwardsEntryStoryblok {
  image?: AssetStoryblok;
  label?: string;
  name?: string;
  project?: string;
  link_text?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'awards_entry';
  [k: string]: any;
}

export interface AwardsGridStoryblok {
  description?: string;
  _uid: string;
  component: 'awards-grid';
  [k: string]: any;
}

export interface AwardsListStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: 'awards-list';
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

export interface BenefitsEntryBlockStoryblok {
  icon?: AssetStoryblok;
  benefit?: number | string;
  description?: string;
  link_title?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'benefits-entry-block';
  [k: string]: any;
}

export interface BlogIndexStoryblok {
  _uid: string;
  component: 'blog-index';
  [k: string]: any;
}

export interface BlogListStoryblok {
  title1?: string;
  title2?: string;
  _uid: string;
  component: 'blog-list';
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlogPostStoryblok {
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  seo_canonical_url?: string;
  structure_data_markup?: string;
  cover?: AssetStoryblok;
  intro: string;
  body?: RichtextStoryblok;
  authors: (StoryblokStory<TeamMemberStoryblok> | string)[];
  services?: (number | string)[];
  deliverables?: (number | string)[];
  tech?: (number | string)[];
  industry?: (number | string)[];
  _uid: string;
  component: 'blog-post';
  [k: string]: any;
}

export interface BudgetRangeEntryStoryblok {
  title: string;
  description: RichtextStoryblok;
  _uid: string;
  component: 'budget-range-entry';
  [k: string]: any;
}

export interface BudgetRangesStoryblok {
  ranges: BudgetRangeEntryStoryblok[];
  _uid: string;
  component: 'budget-ranges';
  [k: string]: any;
}

export interface CanvasStoryblok {
  page_title?: string;
  canvas_width?: string;
  canvas_height?: string;
  canvas_items?: CanvasGroupStoryblok[];
  _uid: string;
  component: 'canvas';
  [k: string]: any;
}

export interface CanvasChecklistStoryblok {
  title?: string;
  items?: CanvasChecklistItemStoryblok[];
  top?: string;
  left?: string;
  rotate?: string;
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
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-egg';
  [k: string]: any;
}

export interface CanvasEggHatchingStoryblok {
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-egg-hatching';
  [k: string]: any;
}

export interface CanvasGroupStoryblok {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
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
  width?: string;
  height?: string;
  border?: boolean;
  top: string;
  left: string;
  scale?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-media';
  [k: string]: any;
}

export interface CanvasPlantStoryblok {
  plant?: any;
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-plant';
  [k: string]: any;
}

export interface CanvasTalkBalloonStoryblok {
  position?: 'left' | 'right';
  text?: string;
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-talk-balloon';
  [k: string]: any;
}

export interface CanvasTarotStoryblok {
  image?: 'sun' | 'moon';
  text?: CanvasTarotTextStoryblok[];
  top?: string;
  left?: string;
  rotate?: string;
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
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-tictactoe';
  [k: string]: any;
}

export interface CanvasYellowStickerStoryblok {
  text?: string;
  top?: string;
  left?: string;
  rotate?: string;
  _uid: string;
  component: 'canvas-yellow-sticker';
  [k: string]: any;
}

export interface CareerStoryblok {
  cover?: AssetStoryblok;
  body?: RichtextStoryblok;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  _uid: string;
  component: 'career';
  [k: string]: any;
}

export interface CareersListStoryblok {
  title?: string;
  cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  cta_label?: string;
  handbook_title?: string;
  handbook_description?: string;
  handbook_cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  handbook_cta_text?: string;
  _uid: string;
  component: 'careers-list';
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
  canvas_width?: string;
  canvas_height?: string;
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

export interface ClientsStoryblok {
  clients_title?: string;
  clients?: ClientLogoStoryblok[];
  _uid: string;
  component: 'clients';
  [k: string]: any;
}

export interface ColumnStoryblok {
  content: RichtextStoryblok;
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
  footer_logo?: ClientLogoStoryblok[];
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

export interface ContactUsFormStoryblok {
  title1?: string;
  title2?: string;
  form_support_text?: string;
  _uid: string;
  component: 'contact-us-form';
  [k: string]: any;
}

export interface CoreValuesStoryblok {
  values_title1?: string;
  values_title2?: string;
  values_description?: string;
  values?: ValueStoryblok[];
  _uid: string;
  component: 'core-values';
  [k: string]: any;
}

export interface CtaCardStoryblok {
  theme?: 'in-theme' | 'contrast';
  title?: string;
  description?: string;
  link_text?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  secondary_link_text?: string;
  secondary_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'cta-card';
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

export interface DeliverablesEntryBlockStoryblok {
  icon?: AssetStoryblok;
  deliverable?: number | string;
  description?: string;
  link_title?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'deliverables-entry-block';
  [k: string]: any;
}

export interface DrawSeggStoryblok {
  title?: string;
  subtitle?: string;
  description?: string;
  _uid: string;
  component: 'draw-segg';
  [k: string]: any;
}

export interface EstimationStoryblok {
  section_title?: string;
  section_description?: string;
  title?: string;
  description?: string;
  form_title?: string;
  form_description?: string;
  _uid: string;
  component: 'estimation';
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

export interface FormBudgetRangeStoryblok {
  title?: string;
  subtitle?: string;
  _uid: string;
  component: 'form-budget-range';
  [k: string]: any;
}

export interface GetAQuotePageStoryblok {
  title?: string;
  subtitle?: string;
  timezone_text?: RichtextStoryblok;
  steps_title?: string;
  steps_subtitle?: string;
  variant?: 'get_a_quote' | 'block';
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
  last_updated: string;
  chapter:
    | '1 – Knowing Significa'
    | '2 – Working at Significa'
    | '3 – Recruitment'
    | '4 – Working with Significa'
    | '5 – Strategy and product';
  cover: AssetStoryblok;
  order: string;
  highlight?: boolean;
  body?: RichtextStoryblok;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  seo_canonical_url?: string;
  change_frequency?: '' | 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  structure_data_markup?: string;
  _uid: string;
  component: 'handbook';
  [k: string]: any;
}

export interface HeroStoryblok {
  heading?: string;
  small_highlights?: (
    | StoryblokStory<CareerStoryblok>
    | StoryblokStory<ProjectStoryblok>
    | StoryblokStory<HandbookStoryblok>
    | StoryblokStory<BlogPostStoryblok>
    | string
  )[];
  showreel?: AssetStoryblok;
  showreel_cover?: AssetStoryblok;
  showreel_button_theme?: '' | 'light' | 'dark';
  showreel_button_label?: string;
  _uid: string;
  component: 'hero';
  [k: string]: any;
}

export interface HomeAboutLinkStoryblok {
  title?: string;
  description?: string;
  link_label?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
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
  services_cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
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
  size?: 'h3' | 'h2';
  variant?: 'one' | 'two';
  testimonials_cta_label?: string;
  testimonials_cta_link?: Exclude<
    MultilinkStoryblok,
    { linktype?: 'email' } | { linktype?: 'asset' }
  >;
  testimonials?: RichtextTestimonialStoryblok[];
  blog_title1?: string;
  blog_title2?: string;
  handbook_title?: string;
  handbook_description?: string;
  handbook_cta_text?: string;
  handbook_cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
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

export interface LandingPageStoryblok {
  structure_data_markup?: string;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  seo_canonical_url?: string;
  change_frequency?: '' | 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  keep_top_bar_hidden?: boolean;
  blocks?: (
    | AboutGridStoryblok
    | AwardsGridStoryblok
    | AwardsListStoryblok
    | BlogListStoryblok
    | CanvasStoryblok
    | CareersListStoryblok
    | ClientsStoryblok
    | ContactUsFormStoryblok
    | CoreValuesStoryblok
    | CtaCardStoryblok
    | DrawSeggStoryblok
    | EstimationStoryblok
    | FormBudgetRangeStoryblok
    | HeroStoryblok
    | ListStoryblok
    | NewtonStoryblok
    | OfficeCardsStoryblok
    | OpenPositionsStoryblok
    | PackagesStoryblok
    | PhysicsStoryblok
    | PrefooterFormStoryblok
    | ProjectsStoryblok
    | ProjectsTwoColumnsStoryblok
    | ServicesStoryblok
    | SlideshowStoryblok
    | SloganStoryblok
    | StepsStoryblok
    | TestimonialsStoryblok
    | TimelineStoryblok
    | TimelineServicesStoryblok
    | TimezoneStoryblok
    | VerticalListStoryblok
    | WorkRecognitionsStoryblok
  )[];
  _uid: string;
  component: 'landing-page';
  [k: string]: any;
}

export interface LinkStoryblok {
  label?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'link';
  [k: string]: any;
}

export interface ListStoryblok {
  type?: 'regular' | 'large';
  border_bottom?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  blocks?: (
    | BenefitsEntryBlockStoryblok
    | DeliverablesEntryBlockStoryblok
    | OtherEntryBlockStoryblok
  )[];
  _uid: string;
  component: 'list';
  [k: string]: any;
}

export interface MeasurementEntryStoryblok {
  title: string;
  popover: string;
  value: string;
  icon?: AssetStoryblok;
  _uid: string;
  component: 'measurement_entry';
  [k: string]: any;
}

export interface NewtonStoryblok {
  title1?: string;
  title2?: string;
  description?: string;
  cta_label?: string;
  cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'newton';
  [k: string]: any;
}

export interface NotepadCardStoryblok {
  text?: string;
  _uid: string;
  component: 'notepad_card';
  [k: string]: any;
}

export interface OfficeCardsStoryblok {
  variant?: boolean;
  office_title1?: string;
  office_title2?: string;
  btn_label?: string;
  btn_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  office_description?: string;
  office_cards?: (NotepadCardStoryblok | PhotoCardStoryblok)[];
  _uid: string;
  component: 'office-cards';
  [k: string]: any;
}

export interface OpenPositionsStoryblok {
  open_positions_title?: string;
  open_positions_description?: string;
  _uid: string;
  component: 'open-positions';
  [k: string]: any;
}

export interface OtherEntryBlockStoryblok {
  icon?: AssetStoryblok;
  title?: string;
  description?: string;
  link_title?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  _uid: string;
  component: 'other-entry-block';
  [k: string]: any;
}

export interface PackagesStoryblok {
  section_title?: string;
  subtitle?: string;
  section_description?: string;
  title?: string;
  _uid: string;
  component: 'packages';
  [k: string]: any;
}

export interface PageStoryblok {
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  seo_canonical_url?: string;
  change_frequency?: '' | 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  structure_data_markup?: string;
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
  blocks?: (
    | AboutGridStoryblok
    | AwardsGridStoryblok
    | AwardsListStoryblok
    | BlogListStoryblok
    | CanvasStoryblok
    | CareersListStoryblok
    | ClientsStoryblok
    | ContactUsFormStoryblok
    | CoreValuesStoryblok
    | CtaCardStoryblok
    | DrawSeggStoryblok
    | EstimationStoryblok
    | FormBudgetRangeStoryblok
    | HeroStoryblok
    | ListStoryblok
    | NewtonStoryblok
    | OfficeCardsStoryblok
    | OpenPositionsStoryblok
    | PackagesStoryblok
    | PhysicsStoryblok
    | PrefooterFormStoryblok
    | ProjectsStoryblok
    | ProjectsTwoColumnsStoryblok
    | ServicesStoryblok
    | SlideshowStoryblok
    | SloganStoryblok
    | StepsStoryblok
    | TestimonialsStoryblok
    | TimelineStoryblok
    | TimelineServicesStoryblok
    | TimezoneStoryblok
    | VerticalListStoryblok
    | WorkRecognitionsStoryblok
  )[];
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

export interface PhysicsStoryblok {
  variant?: 'hero' | 'section';
  hero_title?: string;
  section_title1?: string;
  section_title2?: string;
  section_description?: string;
  cta_label?: string;
  cta_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  physics_blocks?: (
    | PhysicsBalloonCardStoryblok
    | PhysicsInputStoryblok
    | PhysicsStickerStoryblok
    | PhysicsRectangleCardStoryblok
  )[];
  _uid: string;
  component: 'physics';
  [k: string]: any;
}

export interface PhysicsBalloonCardStoryblok {
  text?: string;
  theme?: 'inverted' | 'panel' | 'offset' | 'yellow';
  is_desktop_only?: boolean;
  _uid: string;
  component: 'physics-balloon-card';
  [k: string]: any;
}

export interface PhysicsInputStoryblok {
  placeholder?: string;
  is_desktop_only?: boolean;
  _uid: string;
  component: 'physics-input';
  [k: string]: any;
}

export interface PhysicsRectangleCardStoryblok {
  text?: string;
  theme?: 'transparent' | 'yellow';
  is_desktop_only?: boolean;
  _uid: string;
  component: 'physics-rectangle-card';
  [k: string]: any;
}

export interface PhysicsStickerStoryblok {
  photo?: AssetStoryblok;
  is_desktop_only?: boolean;
  _uid: string;
  component: 'physics-sticker';
  [k: string]: any;
}

export interface PrefooterFormStoryblok {
  _uid: string;
  component: 'prefooter-form';
  [k: string]: any;
}

export interface ProjectStoryblok {
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  structure_data_markup?: string;
  cover?: AssetStoryblok;
  reel?: AssetStoryblok;
  reel_button?: any;
  reel_button_theme?: '' | 'light' | 'dark';
  reel_button_label?: string;
  thumbnail: MultiassetStoryblok;
  tagline: string;
  intro: string;
  team?: (StoryblokStory<TeamMemberStoryblok> | string)[];
  measurements?: MeasurementEntryStoryblok[];
  client?: string;
  deliverables?: (number | string)[];
  services?: (number | string)[];
  links?: LinkStoryblok[];
  body?: RichtextStoryblok;
  _uid: string;
  component: 'project';
  [k: string]: any;
}

export interface ProjectDetailedEntryStoryblok {
  thumbnail: MultiassetStoryblok;
  name: string;
  tagline: string;
  link_text: string;
  link: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  measurements?: MeasurementEntryStoryblok[];
  testimonial?: RichtextTestimonialStoryblok[];
  _uid: string;
  component: 'project-detailed-entry';
  [k: string]: any;
}

export interface ProjectsStoryblok {
  work_title?: string;
  projects?: (StoryblokStory<ProjectStoryblok> | string)[];
  _uid: string;
  component: 'projects';
  [k: string]: any;
}

export interface ProjectsIndexStoryblok {
  _uid: string;
  component: 'projects-index';
  [k: string]: any;
}

export interface ProjectsTwoColumnsStoryblok {
  project?: ProjectDetailedEntryStoryblok[];
  note?: string;
  _uid: string;
  component: 'projects-two-columns';
  [k: string]: any;
}

export interface ProposalStoryblok {
  password: string;
  title: string;
  description: string;
  cover: AssetStoryblok;
  versions?: (ProposalVersionPackageStoryblok | ProposalVersionStoryblok)[];
  created_by: StoryblokStory<TeamMemberStoryblok> | string;
  client: string;
  validity_days: string;
  company_name?: string;
  _uid: string;
  component: 'proposal';
  [k: string]: any;
}

export interface ProposalDeliverableStoryblok {
  title: string;
  description?: string;
  color?: '' | '#0055FF' | '#FF9500' | '#078366' | '#171717';
  manpower: string;
  services?: ProposalServiceStoryblok[];
  team: ProposalDeliverableTeamEntryStoryblok[];
  _uid: string;
  component: 'proposal-deliverable';
  [k: string]: any;
}

export interface ProposalDeliverableTeamEntryStoryblok {
  duration: string;
  offset: string;
  _uid: string;
  component: 'proposal-deliverable-team-entry';
  [k: string]: any;
}

export interface ProposalDepartmentStoryblok {
  title: string;
  description?: string;
  why?: string;
  _uid: string;
  component: 'proposal-department';
  [k: string]: any;
}

export interface ProposalEstimateEntryStoryblok {
  title: string;
  description?: string;
  color: '' | '#0055FF' | '#FF9500' | '#078366' | '#171717';
  phases: ProposalPhaseEntryStoryblok[];
  _uid: string;
  component: 'proposal-estimate-entry';
  [k: string]: any;
}

export interface ProposalPackagePricingStoryblok {
  department: StoryblokStory<ProposalDepartmentStoryblok> | string;
  rate_type: '' | 'fulltime' | 'percentage';
  rate_value: string;
  team_size: string;
  _uid: string;
  component: 'proposal-package-pricing';
  [k: string]: any;
}

export interface ProposalPackageTeamEntryStoryblok {
  department: StoryblokStory<ProposalDepartmentStoryblok> | string;
  role: ProposalRoleStoryblok[];
  _uid: string;
  component: 'proposal-package-team-entry';
  [k: string]: any;
}

export interface ProposalPhaseEntryStoryblok {
  title: string;
  description?: string;
  team: ProposalPhaseTeamEntryStoryblok[];
  _uid: string;
  component: 'proposal-phase-entry';
  [k: string]: any;
}

export interface ProposalPhaseTeamEntryStoryblok {
  duration: string;
  offset: string;
  _uid: string;
  component: 'proposal-phase-team-entry';
  [k: string]: any;
}

export interface ProposalRoleStoryblok {
  title: string;
  description?: string;
  _uid: string;
  component: 'proposal-role';
  [k: string]: any;
}

export interface ProposalScopeEntryStoryblok {
  title: string;
  description?: string;
  services?: ('' | 'Design' | 'Development' | 'Project management')[];
  features?: string;
  _uid: string;
  component: 'proposal-scope-entry';
  [k: string]: any;
}

export interface ProposalSectionStoryblok {
  title: string;
  body: RichtextStoryblok;
  data?: '' | 'scope' | 'team' | 'estimates' | 'timeline' | 'pricing' | 'deliverables';
  _uid: string;
  component: 'proposal-section';
  [k: string]: any;
}

export interface ProposalServiceStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: 'proposal-service';
  [k: string]: any;
}

export interface ProposalTeamEntryStoryblok {
  department: StoryblokStory<ProposalDepartmentStoryblok> | string;
  role: ProposalRoleStoryblok[];
  rate_type?: '' | 'value' | 'percentage' | 'free';
  rate_value?: string;
  _uid: string;
  component: 'proposal-team-entry';
  [k: string]: any;
}

export interface ProposalVersionStoryblok {
  version_name: string;
  discount_percentage?: string;
  date: string;
  scope: ProposalScopeEntryStoryblok[];
  team: ProposalTeamEntryStoryblok[];
  estimates: ProposalEstimateEntryStoryblok[];
  body?: ProposalSectionStoryblok[];
  show_team_members?: boolean;
  show_manpower?: boolean;
  _uid: string;
  component: 'proposal-version';
  [k: string]: any;
}

export interface ProposalVersionPackageStoryblok {
  version_name: string;
  show_team_members?: boolean;
  show_manpower?: boolean;
  discount_percentage?: string;
  date: string;
  deliverables?: ProposalDeliverableStoryblok[];
  pricing?: ProposalPackagePricingStoryblok[];
  team?: ProposalPackageTeamEntryStoryblok[];
  body?: ProposalSectionStoryblok[];
  _uid: string;
  component: 'proposal-version-package';
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

export interface RecognitionEntryStoryblok {
  recognition: StoryblokStory<RecognitionTypeStoryblok> | string;
  project: StoryblokStory<ProjectStoryblok> | string;
  external_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  year: string;
  _uid: string;
  component: 'recognition-entry';
  [k: string]: any;
}

export interface RecognitionTypeStoryblok {
  title: string;
  label: string;
  image: AssetStoryblok;
  _uid: string;
  component: 'recognition-type';
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
  line_numbers_start?: string;
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

export interface ServicesStoryblok {
  services_title?: string;
  services_subtitle?: string;
  services_description?: string;
  services?: ServicesDeppartmentStoryblok[];
  _uid: string;
  component: 'services';
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
  awards_db: (StoryblokStory<RecognitionEntryStoryblok> | string)[];
  showreel?: AssetStoryblok;
  showreel_button_label?: string;
  services_title?: string;
  services_subtitle?: string;
  services_description?: string;
  services?: ServicesDeppartmentStoryblok[];
  deliverables_title?: string;
  deliverables_subtitle?: string;
  deliverables?: DeliverablesEntryStoryblok[];
  testimonials_title1?: string;
  testimonials_title2?: string;
  size?: 'h3' | 'h2';
  variant?: 'one' | 'two';
  testimonials_cta_label?: string;
  testimonials_cta_link?: Exclude<
    MultilinkStoryblok,
    { linktype?: 'email' } | { linktype?: 'asset' }
  >;
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
  left_offset?: string;
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

export interface SlideshowStoryblok {
  images?: MultiassetStoryblok;
  _uid: string;
  component: 'slideshow';
  [k: string]: any;
}

export interface SloganStoryblok {
  heading?: string;
  subheading?: string;
  _uid: string;
  component: 'slogan';
  [k: string]: any;
}

export interface StaticPageStoryblok {
  body?: RichtextStoryblok;
  _uid: string;
  component: 'static-page';
  [k: string]: any;
}

export interface StepsStoryblok {
  steps_title?: string;
  steps_subtitle?: string;
  variant?: 'get_a_quote' | 'block';
  steps?: GetAQuoteStepStoryblok[];
  _uid: string;
  component: 'steps';
  [k: string]: any;
}

export interface TeamButtonsStoryblok {
  link_type?: 'email' | 'phone' | 'url';
  title?: string;
  link?: string;
  email_subject?: string;
  _uid: string;
  component: 'team-buttons';
  [k: string]: any;
}

export interface TeamMemberStoryblok {
  photo?: AssetStoryblok;
  email?: string;
  position?: string;
  team?: number | string;
  bio?: string;
  buttons?: TeamButtonsStoryblok[];
  cover_image_light?: AssetStoryblok;
  cover_image_dark?: AssetStoryblok;
  links?: TeamMemberLinkStoryblok[];
  is_active?: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_og_image?: AssetStoryblok;
  priority?: string;
  change_frequency?: '' | 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
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

export interface TestimonialsStoryblok {
  testimonials_title1?: string;
  testimonials_title2?: string;
  testimonials_cta_label?: string;
  variant?: 'one' | 'two';
  size?: 'h3' | 'h2';
  testimonials_cta_link?: Exclude<
    MultilinkStoryblok,
    { linktype?: 'email' } | { linktype?: 'asset' }
  >;
  testimonials?: RichtextTestimonialStoryblok[];
  _uid: string;
  component: 'testimonials';
  [k: string]: any;
}

export interface TimelineStoryblok {
  has_border_top?: boolean;
  title1?: string;
  title2?: string;
  description?: string;
  timeline?: TimelineSectionStoryblok[];
  _uid: string;
  component: 'timeline';
  [k: string]: any;
}

export interface TimelineArrowStoryblok {
  variant: '' | 'one' | 'two' | 'three' | 'four' | 'five';
  flip?: boolean;
  top: string;
  left: string;
  scale?: string;
  rotate?: string;
  _uid: string;
  component: 'timeline-arrow';
  [k: string]: any;
}

export interface TimelineImageStoryblok {
  image?: AssetStoryblok;
  border?: boolean;
  top: string;
  left: string;
  scale?: string;
  rotate?: string;
  _uid: string;
  component: 'timeline-image';
  [k: string]: any;
}

export interface TimelineSectionStoryblok {
  items?: (TimelineArrowStoryblok | TimelineImageStoryblok | TimelineTextStoryblok)[];
  width: string;
  _uid: string;
  component: 'timeline-section';
  [k: string]: any;
}

export interface TimelineServicesStoryblok {
  title?: string;
  description?: string;
  timeline?: ServiceTimelineRowStoryblok[];
  _uid: string;
  component: 'timeline-services';
  [k: string]: any;
}

export interface TimelineTextStoryblok {
  title?: string;
  text?: string;
  link?: LinkStoryblok[];
  width: string;
  top: string;
  left: string;
  _uid: string;
  component: 'timeline-text';
  [k: string]: any;
}

export interface TimezoneStoryblok {
  text?: RichtextStoryblok;
  _uid: string;
  component: 'timezone';
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
  illustration:
    | 'people'
    | 'teamwork'
    | 'aspiration'
    | 'playfullness'
    | 'integrity'
    | 'empathy'
    | 'ambition';
  title?: string;
  description?: string;
  _uid: string;
  component: 'value';
  [k: string]: any;
}

export interface VerticalListStoryblok {
  airplane?: boolean;
  link_text?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  secondary_link_text?: string;
  secondary_link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
  entry?: VerticalListEntryStoryblok[];
  _uid: string;
  component: 'vertical-list';
  [k: string]: any;
}

export interface VerticalListEntryStoryblok {
  title?: string;
  description?: string;
  _uid: string;
  component: 'vertical-list-entry';
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

export interface WordEntryStoryblok {
  word?: string;
  _uid: string;
  component: 'word_entry';
  [k: string]: any;
}

export interface WorkRecognitionsStoryblok {
  title?: string;
  small_highlights_title?: string;
  small_highlights?: (
    | StoryblokStory<CareerStoryblok>
    | StoryblokStory<ProjectStoryblok>
    | StoryblokStory<HandbookStoryblok>
    | StoryblokStory<BlogPostStoryblok>
    | string
  )[];
  awards_title?: string;
  _uid: string;
  component: 'work-recognitions';
  [k: string]: any;
}
