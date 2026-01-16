/**
 * WordPress REST API TypeScript Definitions
 *
 * These types match the structure of data returned from WordPress REST API
 * with ACF (Advanced Custom Fields) integration.
 */

// Base WordPress Post Type
export interface WordPressPostBase {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: any[];
  acf?: any;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          thumbnail?: { source_url: string };
          medium?: { source_url: string };
          large?: { source_url: string };
          full?: { source_url: string };
        };
      };
    }>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      avatar_urls: Record<string, string>;
    }>;
  };
}

// ACF Image Field Type
export interface ACFImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  url: string;
  alt: string;
  description: string;
  caption: string;
  mime_type: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    full: string;
    'full-width': number;
    'full-height': number;
  };
}

// Content Block Types (ACF Flexible Content)
export type ContentBlock =
  | HeroBlock
  | BoxBlock
  | TwoColumnsBlock
  | ImageBlock
  | ImageGridBlock
  | ListBlock
  | TableBlock
  | BlogListBlock
  | ProjectsBlock
  | ProjectsTwoColumnsBlock
  | AboutGridBlock
  | AwardsGridBlock
  | AwardsListBlock
  | ClientsBlock
  | ContactFormBlock
  | PrefooterFormBlock
  | FormBudgetRangeBlock
  | PhysicsBlock
  | CanvasBlock
  | DrawSeggBlock
  | EstimationBlock
  | FaqsListBlock
  | ComparisonBlock
  | SlideshowBlock
  | TimelineBlock
  | TimelineServicesBlock
  | StepsBlock
  | ServicesBlock
  | PackagesBlock
  | TimezoneBlock
  | MeasurementsBlock
  | RichtextBoxBlock
  | RichtextTestimonialBlock
  | RichtextCodeBlockBlock
  | CTACardBlock
  | OpenPositionsBlock
  | OfficeCardsBlock
  | CareersListBlock
  | SloganBlock
  | TestimonialsBlock
  | VideoBlock
  | SpacerBlock
  | DividerBlock
  | ButtonGroupBlock
  | EmbedHtmlBlock
  | SocialLinksBlock;

// Individual Block Type Definitions
export interface HeroBlock {
  acf_fc_layout: 'hero';
  title?: string;
  subtitle?: string;
  background_image?: ACFImage;
  background_video?: any;
  height?: 'small' | 'medium' | 'large' | 'full';
  text_color?: string;
  alignment?: 'left' | 'center' | 'right';
  cta_buttons?: Array<{
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
  }>;
}

export interface BoxBlock {
  acf_fc_layout: 'box';
  background_color?: string;
  padding?: 'small' | 'medium' | 'large';
  border_radius?: 'none' | 'small' | 'medium' | 'large';
  content_blocks?: ContentBlock[];
}

export interface TwoColumnsBlock {
  acf_fc_layout: 'two_columns';
  column_ratio?: '50/50' | '60/40' | '40/60' | '70/30' | '30/70';
  gap?: 'small' | 'medium' | 'large';
  vertical_alignment?: 'top' | 'center' | 'bottom';
  reverse_on_mobile?: boolean;
  left_column?: ContentBlock[];
  right_column?: ContentBlock[];
}

export interface ImageBlock {
  acf_fc_layout: 'image';
  image?: ACFImage;
  alt_text?: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  alignment?: 'left' | 'center' | 'right';
  border_radius?: 'none' | 'small' | 'medium' | 'large';
  link?: string;
  open_in_lightbox?: boolean;
}

export interface ImageGridBlock {
  acf_fc_layout: 'image_grid';
  columns?: 2 | 3 | 4 | 5;
  gap?: 'small' | 'medium' | 'large';
  aspect_ratio?: 'square' | 'landscape' | 'portrait' | 'auto';
  images?: Array<{
    image: ACFImage;
    alt_text?: string;
    caption?: string;
    link?: string;
  }>;
}

export interface ListBlock {
  acf_fc_layout: 'list';
  title?: string;
  style?: 'bullet' | 'numbered' | 'checkmark' | 'none';
  items?: Array<{
    text: string;
    icon?: ACFImage;
  }>;
}

export interface TableBlock {
  acf_fc_layout: 'table';
  title?: string;
  has_header?: boolean;
  striped_rows?: boolean;
  compact?: boolean;
  table_data?: any;
}

export interface BlogListBlock {
  acf_fc_layout: 'blog_list';
  title?: string;
  subtitle?: string;
  number_of_posts?: number;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
  show_excerpt?: boolean;
  show_author?: boolean;
  show_date?: boolean;
  filter_by_category?: any;
  load_more_button?: boolean;
}

export interface ProjectsBlock {
  acf_fc_layout: 'projects';
  title?: string;
  subtitle?: string;
  number_of_projects?: number;
  columns?: 2 | 3 | 4;
  show_excerpt?: boolean;
  show_tags?: boolean;
  filter_by_tag?: any;
  specific_projects?: number[];
}

export interface ProjectsTwoColumnsBlock {
  acf_fc_layout: 'projects_two_columns';
  title?: string;
  number_of_projects?: number;
  show_excerpt?: boolean;
  show_tags?: boolean;
}

export interface AboutGridBlock {
  acf_fc_layout: 'about_grid';
  title?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: ACFImage;
    link?: string;
  }>;
}

export interface AwardsGridBlock {
  acf_fc_layout: 'awards_grid';
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'carousel';
  columns?: 2 | 3 | 4 | 5;
  awards?: number[];
}

export interface AwardsListBlock {
  acf_fc_layout: 'awards_list';
  title?: string;
  grouped_by_year?: boolean;
  awards?: number[];
}

export interface ClientsBlock {
  acf_fc_layout: 'clients';
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'carousel' | 'marquee';
  columns?: 3 | 4 | 5 | 6;
  client_logos?: Array<{
    logo: ACFImage;
    client_name: string;
    website?: string;
  }>;
}

export interface ContactFormBlock {
  acf_fc_layout: 'contact_us_form';
  title?: string;
  subtitle?: string;
  form_id?: string;
  success_message?: string;
  fields?: Array<{
    field_type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string;
  }>;
  submit_button_text?: string;
}

export interface PrefooterFormBlock {
  acf_fc_layout: 'prefooter_form';
  title?: string;
  description?: string;
  form_type?: 'quote' | 'contact' | 'newsletter';
  background_color?: string;
}

export interface FormBudgetRangeBlock {
  acf_fc_layout: 'form_budget_range';
  label?: string;
  min_value?: number;
  max_value?: number;
  step?: number;
  currency?: string;
  default_value?: number;
}

export interface PhysicsBlock {
  acf_fc_layout: 'physics';
  title?: string;
  enable_interaction?: boolean;
  gravity_strength?: number;
  physics_items?: Array<{
    item_type: 'circle' | 'rectangle' | 'image' | 'text';
    text_content?: string;
    image?: ACFImage;
    width?: number;
    height?: number;
    color?: string;
    mass?: number;
    friction?: number;
  }>;
  background_color?: string;
}

export interface CanvasBlock {
  acf_fc_layout: 'canvas';
  title?: string;
  canvas_width?: number;
  canvas_height?: number;
  enable_mini_map?: boolean;
  enable_drag_scroll?: boolean;
  canvas_items?: Array<{
    item_type: 'text' | 'image' | 'video' | 'arrow' | 'checkbox' | 'sticker';
    content?: any;
    x_position?: number;
    y_position?: number;
    width?: number;
    height?: number;
    rotation?: number;
    style?: string;
  }>;
}

export interface DrawSeggBlock {
  acf_fc_layout: 'draw_segg';
  title?: string;
  instructions?: string;
  canvas_background_color?: string;
  brush_colors?: Array<{ color: string }>;
  enable_save?: boolean;
  api_endpoint?: string;
}

export interface EstimationBlock {
  acf_fc_layout: 'estimation';
  title?: string;
  description?: string;
  questions?: Array<{
    question_text: string;
    question_type: 'multiple_choice' | 'range' | 'checkboxes';
    options?: Array<{
      option_text: string;
      hours_impact?: number;
      cost_impact?: number;
    }>;
  }>;
  hourly_rate?: number;
}

export interface FaqsListBlock {
  acf_fc_layout: 'faqs_list';
  title?: string;
  style?: 'accordion' | 'expandable';
  faqs?: Array<{
    question: string;
    answer: string;
    is_open_by_default?: boolean;
  }>;
}

export interface ComparisonBlock {
  acf_fc_layout: 'comparison';
  title?: string;
  options?: Array<{
    name: string;
    price?: string;
    description?: string;
    is_highlighted?: boolean;
    features?: Array<{
      feature_name: string;
      included: boolean;
    }>;
  }>;
  cta_text?: string;
}

export interface SlideshowBlock {
  acf_fc_layout: 'slideshow';
  autoplay?: boolean;
  autoplay_speed?: number;
  show_arrows?: boolean;
  show_dots?: boolean;
  infinite_loop?: boolean;
  slides?: Array<{
    image: ACFImage;
    title?: string;
    description?: string;
    link?: string;
    link_text?: string;
  }>;
}

export interface TimelineBlock {
  acf_fc_layout: 'timeline';
  title?: string;
  orientation?: 'vertical' | 'horizontal';
  events?: Array<{
    date: string;
    title: string;
    description?: string;
    icon?: ACFImage;
    color?: string;
  }>;
}

export interface TimelineServicesBlock {
  acf_fc_layout: 'timeline_services';
  title?: string;
  services?: Array<{
    phase_name: string;
    duration?: string;
    description?: string;
    deliverables?: Array<{ deliverable: string }>;
  }>;
}

export interface StepsBlock {
  acf_fc_layout: 'steps';
  title?: string;
  layout?: 'vertical' | 'horizontal' | 'numbered';
  steps?: Array<{
    step_number?: number;
    title: string;
    description?: string;
    icon?: ACFImage;
    color?: string;
  }>;
}

export interface ServicesBlock {
  acf_fc_layout: 'services';
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'list' | 'cards';
  columns?: 2 | 3 | 4;
  services?: Array<{
    service_name: string;
    icon?: ACFImage;
    description?: string;
    features?: Array<{ feature: string }>;
    link?: string;
    link_text?: string;
  }>;
}

export interface PackagesBlock {
  acf_fc_layout: 'packages';
  title?: string;
  subtitle?: string;
  packages?: Array<{
    package_name: string;
    price?: string;
    billing_period?: 'monthly' | 'yearly' | 'one-time';
    description?: string;
    is_featured?: boolean;
    features?: Array<{ feature: string }>;
    cta_text?: string;
    cta_url?: string;
  }>;
}

export interface TimezoneBlock {
  acf_fc_layout: 'timezone';
  title?: string;
  show_multiple_zones?: boolean;
  timezones?: Array<{
    location_name: string;
    timezone: string;
    icon?: ACFImage;
  }>;
}

export interface MeasurementsBlock {
  acf_fc_layout: 'measurements';
  title?: string;
  metrics?: Array<{
    metric_name: string;
    value: string;
    unit?: string;
    icon?: ACFImage;
    color?: string;
    description?: string;
  }>;
}

export interface RichtextBoxBlock {
  acf_fc_layout: 'richtext_box';
  content?: string;
  background_color?: string;
  text_color?: string;
  padding?: 'small' | 'medium' | 'large';
  border?: boolean;
  border_color?: string;
  max_width?: 'narrow' | 'medium' | 'wide' | 'full';
}

export interface RichtextTestimonialBlock {
  acf_fc_layout: 'richtext_testimonial';
  quote?: string;
  author_name?: string;
  author_role?: string;
  author_company?: string;
  author_photo?: ACFImage;
  company_logo?: ACFImage;
  rating?: number;
  background_color?: string;
}

export interface RichtextCodeBlockBlock {
  acf_fc_layout: 'richtext_code_block';
  code?: string;
  language?: string;
  show_line_numbers?: boolean;
  highlight_lines?: string;
  title?: string;
  theme?: 'light' | 'dark';
}

export interface CTACardBlock {
  acf_fc_layout: 'cta_card';
  title?: string;
  description?: string;
  background_image?: ACFImage;
  background_color?: string;
  text_color?: string;
  alignment?: 'left' | 'center' | 'right';
  buttons?: Array<{
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
  }>;
}

export interface OpenPositionsBlock {
  acf_fc_layout: 'open_positions';
  title?: string;
  subtitle?: string;
  show_all_positions?: boolean;
  specific_positions?: number[];
  group_by_department?: boolean;
  no_positions_message?: string;
}

export interface OfficeCardsBlock {
  acf_fc_layout: 'office_cards';
  title?: string;
  offices?: Array<{
    office_name: string;
    address?: string;
    phone?: string;
    email?: string;
    image?: ACFImage;
    map_link?: string;
    is_headquarters?: boolean;
  }>;
}

export interface CareersListBlock {
  acf_fc_layout: 'careers_list';
  title?: string;
  layout?: 'list' | 'grid' | 'table';
  show_location?: boolean;
  show_type?: boolean;
  show_department?: boolean;
  filter_by_department?: string;
}

export interface SloganBlock {
  acf_fc_layout: 'slogan';
  text?: string;
  font_size?: 'small' | 'medium' | 'large' | 'xlarge';
  font_weight?: 'normal' | 'medium' | 'bold';
  text_color?: string;
  alignment?: 'left' | 'center' | 'right';
  background_color?: string;
  padding?: 'small' | 'medium' | 'large';
  animate_on_scroll?: boolean;
}

export interface TestimonialsBlock {
  acf_fc_layout: 'testimonials';
  title?: string;
  layout?: 'grid' | 'carousel' | 'masonry';
  columns?: 1 | 2 | 3;
  testimonials?: Array<{
    quote: string;
    author_name: string;
    author_role?: string;
    author_company?: string;
    author_photo?: ACFImage;
    company_logo?: ACFImage;
    rating?: number;
  }>;
}

export interface VideoBlock {
  acf_fc_layout: 'video';
  video_source?: 'upload' | 'youtube' | 'vimeo' | 'url';
  video_file?: any;
  video_url?: string;
  poster_image?: ACFImage;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  caption?: string;
}

export interface SpacerBlock {
  acf_fc_layout: 'spacer';
  height_desktop?: number;
  height_mobile?: number;
}

export interface DividerBlock {
  acf_fc_layout: 'divider';
  style?: 'solid' | 'dashed' | 'dotted';
  thickness?: number;
  color?: string;
  width?: 'full' | 'narrow' | 'medium' | 'wide';
  spacing?: 'small' | 'medium' | 'large';
}

export interface ButtonGroupBlock {
  acf_fc_layout: 'button_group';
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'tight' | 'normal' | 'loose';
  buttons?: Array<{
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    icon?: ACFImage;
    open_in_new_tab?: boolean;
  }>;
}

export interface EmbedHtmlBlock {
  acf_fc_layout: 'embed_html';
  title?: string;
  html_code?: string;
  javascript_code?: string;
  css_code?: string;
  sandbox?: boolean;
}

export interface SocialLinksBlock {
  acf_fc_layout: 'social_links';
  title?: string;
  style?: 'icons' | 'buttons' | 'text';
  size?: 'small' | 'medium' | 'large';
  alignment?: 'left' | 'center' | 'right';
  links?: Array<{
    platform: string;
    url: string;
    custom_icon?: ACFImage;
  }>;
}

// Post Type Specific Interfaces
export interface WordPressPage extends WordPressPostBase {
  acf?: {
    seo_title?: string;
    seo_description?: string;
    og_image?: ACFImage;
    hide_from_listings?: boolean;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressBlogPost extends WordPressPostBase {
  acf?: {
    author?: number;
    hide_from_listings?: boolean;
    seo_title?: string;
    seo_description?: string;
    og_image?: ACFImage;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressProject extends WordPressPostBase {
  acf?: {
    client_name?: string;
    project_url?: string;
    team_members?: number[];
    hide_from_listings?: boolean;
    seo_title?: string;
    seo_description?: string;
    og_image?: ACFImage;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressTeamMember extends WordPressPostBase {
  acf?: {
    role?: string;
    bio?: string;
    photo?: ACFImage;
    email?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
    order?: number;
    is_active?: boolean;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressCareer extends WordPressPostBase {
  acf?: {
    job_description?: string;
    requirements?: string;
    location?: string;
    employment_type?: 'full-time' | 'part-time' | 'contract';
    salary_range?: string;
    application_deadline?: string;
    is_active?: boolean;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressHandbook extends WordPressPostBase {
  acf?: {
    parent_page?: number;
    order?: number;
    icon?: ACFImage;
    seo_title?: string;
    seo_description?: string;
    og_image?: ACFImage;
    content_blocks?: ContentBlock[];
  };
}

export interface WordPressRecognition extends WordPressPostBase {
  acf?: {
    award_name?: string;
    award_category?: string;
    date?: string;
    description?: string;
    logo?: ACFImage;
    url?: string;
    project?: number;
    order?: number;
  };
}
