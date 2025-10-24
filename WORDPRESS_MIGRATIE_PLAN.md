# WordPress Migratie Plan - Stachly Website

## 📋 Inhoudsopgave

1. [Huidige Situatie](#huidige-situatie)
2. [WordPress Architectuur](#wordpress-architectuur)
3. [Content Types & Custom Fields](#content-types--custom-fields)
4. [Alle Content Blokken (45+)](#alle-content-blokken)
5. [Stap-voor-Stap Implementatie](#stap-voor-stap-implementatie)
6. [Code Aanpassingen](#code-aanpassingen)
7. [Testing & Deployment](#testing--deployment)

---

## 🎯 Huidige Situatie

### Technische Stack
- **Frontend**: SvelteKit 1.30.4 met TypeScript
- **Huidige CMS**: Storyblok (headless CMS)
- **Animaties**: Matter.js (physics engine), custom canvas animations
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

### Content Structuur
De website heeft momenteel **8 content types** en **45+ herbruikbare blokken**:

**Content Types:**
1. Pages (standaard pagina's)
2. Blog Posts (blog artikelen)
3. Projects (portfolio projecten)
4. Team Members (teamleden)
5. Careers (vacatures)
6. Handbook (documentatie)
7. Landing Pages (speciale landing pages)
8. Recognition Entries (awards)

**Blokken:** 45+ verschillende content blokken (zie volledige lijst hieronder)

---

## 🏗️ WordPress Architectuur

### Aanpak: Headless WordPress

We behouden de **SvelteKit frontend** (om alle animaties te behouden) en vervangen Storyblok door **WordPress als headless CMS**.

```
┌─────────────────┐         ┌──────────────────┐
│   WordPress     │ ◄─────► │   SvelteKit      │
│   (Backend)     │  REST   │   (Frontend)     │
│                 │   API   │                  │
│ - Custom Posts  │         │ - Animaties      │
│ - ACF Blocks    │         │ - Svelte Code    │
│ - Gutenberg     │         │ - Matter.js      │
└─────────────────┘         └──────────────────┘
```

### Benodigde WordPress Plugins

1. **Advanced Custom Fields (ACF) PRO** ⭐ ESSENTIEEL
   - Custom post types
   - Flexible content (blokken systeem)
   - Repeater fields
   - Relationship fields
   - REST API support

2. **ACF to REST API** of **WPGraphQL + WPGraphQL for ACF**
   - Maakt ACF fields beschikbaar via API

3. **Custom Post Type UI** (optioneel)
   - Eenvoudiger maken van custom post types

4. **Yoast SEO** (voor SEO meta data)

5. **Enable Media Replace** (handig voor content beheer)

---

## 📝 Content Types & Custom Fields

### 1. Page (Standaard Pagina)

**WordPress Post Type**: `page`

**ACF Fields:**
```
├── seo_title (text)
├── seo_description (textarea)
├── og_image (image)
├── hide_from_listings (true/false)
└── content_blocks (flexible content) ← ALLE BLOKKEN HIER
```

---

### 2. Blog Post

**WordPress Post Type**: `blog_post`

**ACF Fields:**
```
├── title (text)
├── slug (text)
├── content_blocks (flexible content)
├── featured_image (image)
├── excerpt (textarea)
├── author (relationship → team_member)
├── published_date (date picker)
├── categories (taxonomy)
├── tags (taxonomy)
├── hide_from_listings (true/false)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 3. Project (Portfolio Item)

**WordPress Post Type**: `project`

**ACF Fields:**
```
├── title (text)
├── slug (text)
├── content_blocks (flexible content)
├── featured_image (image)
├── excerpt (textarea)
├── client_name (text)
├── project_url (url)
├── tags (taxonomy)
├── team_members (relationship → team_member)
├── hide_from_listings (true/false)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 4. Team Member

**WordPress Post Type**: `team_member`

**ACF Fields:**
```
├── name (text)
├── slug (text)
├── role (text)
├── bio (wysiwyg)
├── photo (image)
├── email (email)
├── linkedin (url)
├── twitter (url)
├── github (url)
├── website (url)
├── order (number) ← voor sortering
├── is_active (true/false)
├── content_blocks (flexible content)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 5. Career (Vacature)

**WordPress Post Type**: `career`

**ACF Fields:**
```
├── title (text)
├── slug (text)
├── job_description (wysiwyg)
├── requirements (wysiwyg)
├── location (text)
├── employment_type (select: full-time, part-time, contract)
├── salary_range (text)
├── application_deadline (date picker)
├── content_blocks (flexible content)
├── is_active (true/false)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 6. Handbook (Documentatie)

**WordPress Post Type**: `handbook`

**ACF Fields:**
```
├── title (text)
├── slug (text)
├── content_blocks (flexible content)
├── parent_page (relationship → handbook)
├── order (number)
├── icon (image)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 7. Landing Page

**WordPress Post Type**: `landing_page`

**ACF Fields:**
```
├── title (text)
├── slug (text)
├── content_blocks (flexible content)
├── hide_header (true/false)
├── hide_footer (true/false)
├── custom_css (textarea)
├── seo_title (text)
├── seo_description (textarea)
└── og_image (image)
```

---

### 8. Recognition Entry (Award)

**WordPress Post Type**: `recognition`

**ACF Fields:**
```
├── title (text)
├── award_name (text)
├── award_category (text)
├── date (date picker)
├── description (textarea)
├── logo (image)
├── url (url)
├── project (relationship → project)
└── order (number)
```

---

## 🧱 Alle Content Blokken (45+)

Dit is de complete lijst van **alle blokken** die als ACF Flexible Content moeten worden opgezet.

### Layout Blokken

#### 1. Hero
```
hero
├── title (text)
├── subtitle (text)
├── background_image (image)
├── background_video (file)
├── height (select: small, medium, large, full)
├── text_color (color picker)
├── alignment (select: left, center, right)
└── cta_buttons (repeater)
    ├── text (text)
    ├── url (url)
    └── style (select: primary, secondary, outline)
```

#### 2. Box
```
box
├── background_color (color picker)
├── padding (select: small, medium, large)
├── border_radius (select: none, small, medium, large)
└── content_blocks (nested flexible content)
```

#### 3. Two Columns
```
two_columns
├── column_ratio (select: 50/50, 60/40, 40/60, 70/30, 30/70)
├── gap (select: small, medium, large)
├── vertical_alignment (select: top, center, bottom)
├── reverse_on_mobile (true/false)
├── left_column (flexible content)
└── right_column (flexible content)
```

#### 4. Image
```
image
├── image (image)
├── alt_text (text)
├── caption (text)
├── size (select: small, medium, large, full)
├── alignment (select: left, center, right)
├── border_radius (select: none, small, medium, large)
├── link (url)
└── open_in_lightbox (true/false)
```

#### 5. Image Grid
```
image_grid
├── columns (select: 2, 3, 4, 5)
├── gap (select: small, medium, large)
├── aspect_ratio (select: square, landscape, portrait, auto)
└── images (repeater)
    ├── image (image)
    ├── alt_text (text)
    ├── caption (text)
    └── link (url)
```

#### 6. List
```
list
├── title (text)
├── style (select: bullet, numbered, checkmark, none)
└── items (repeater)
    ├── text (text)
    └── icon (image) ← optioneel custom icon
```

#### 7. Table
```
table
├── title (text)
├── has_header (true/false)
├── striped_rows (true/false)
├── compact (true/false)
└── table_data (table field - ACF PRO)
```

---

### Content Blokken

#### 8. Blog List
```
blog_list
├── title (text)
├── subtitle (text)
├── number_of_posts (number)
├── layout (select: grid, list)
├── columns (select: 2, 3, 4)
├── show_excerpt (true/false)
├── show_author (true/false)
├── show_date (true/false)
├── filter_by_category (taxonomy term)
└── load_more_button (true/false)
```

#### 9. Projects (Grid)
```
projects
├── title (text)
├── subtitle (text)
├── number_of_projects (number)
├── columns (select: 2, 3, 4)
├── show_excerpt (true/false)
├── show_tags (true/false)
├── filter_by_tag (taxonomy term)
└── specific_projects (relationship → project)
```

#### 10. Projects Two Columns
```
projects_two_columns
├── title (text)
├── number_of_projects (number)
├── show_excerpt (true/false)
└── show_tags (true/false)
```

#### 11. About Grid
```
about_grid
├── title (text)
├── items (repeater)
    ├── title (text)
    ├── description (textarea)
    ├── icon (image)
    └── link (url)
```

#### 12. Awards Grid
```
awards_grid
├── title (text)
├── subtitle (text)
├── layout (select: grid, carousel)
├── columns (select: 2, 3, 4, 5)
└── awards (relationship → recognition)
```

#### 13. Awards List
```
awards_list
├── title (text)
├── grouped_by_year (true/false)
└── awards (relationship → recognition)
```

#### 14. Clients
```
clients
├── title (text)
├── subtitle (text)
├── layout (select: grid, carousel, marquee)
├── columns (select: 3, 4, 5, 6)
└── client_logos (repeater)
    ├── logo (image)
    ├── client_name (text)
    └── website (url)
```

---

### Form Blokken

#### 15. Contact Us Form
```
contact_us_form
├── title (text)
├── subtitle (text)
├── form_id (text) ← voor tracking
├── success_message (wysiwyg)
├── fields (repeater)
    ├── field_type (select: text, email, textarea, select, checkbox)
    ├── label (text)
    ├── placeholder (text)
    ├── required (true/false)
    └── options (textarea) ← voor select/checkbox
└── submit_button_text (text)
```

#### 16. Prefooter Form
```
prefooter_form
├── title (text)
├── description (wysiwyg)
├── form_type (select: quote, contact, newsletter)
└── background_color (color picker)
```

#### 17. Form Budget Range
```
form_budget_range
├── label (text)
├── min_value (number)
├── max_value (number)
├── step (number)
├── currency (text)
└── default_value (number)
```

---

### Interactieve Blokken

#### 18. Physics
```
physics
├── title (text)
├── enable_interaction (true/false)
├── gravity_strength (number: 0.0001 - 0.01)
├── physics_items (repeater)
    ├── item_type (select: circle, rectangle, image, text)
    ├── text_content (text)
    ├── image (image)
    ├── width (number)
    ├── height (number)
    ├── color (color picker)
    ├── mass (number)
    └── friction (number)
└── background_color (color picker)
```

#### 19. Canvas
```
canvas
├── title (text)
├── canvas_width (number)
├── canvas_height (number)
├── enable_mini_map (true/false)
├── enable_drag_scroll (true/false)
└── canvas_items (repeater)
    ├── item_type (select: text, image, video, arrow, checkbox, sticker)
    ├── content (text/image/url)
    ├── x_position (number)
    ├── y_position (number)
    ├── width (number)
    ├── height (number)
    ├── rotation (number)
    └── style (wysiwyg)
```

#### 20. Draw SEGG
```
draw_segg
├── title (text)
├── instructions (wysiwyg)
├── canvas_background_color (color picker)
├── brush_colors (repeater)
    └── color (color picker)
├── enable_save (true/false)
└── api_endpoint (text)
```

#### 21. Estimation Tool
```
estimation
├── title (text)
├── description (wysiwyg)
├── questions (repeater)
    ├── question_text (text)
    ├── question_type (select: multiple_choice, range, checkboxes)
    ├── options (repeater)
        ├── option_text (text)
        ├── hours_impact (number)
        └── cost_impact (number)
└── hourly_rate (number)
```

#### 22. FAQs List
```
faqs_list
├── title (text)
├── style (select: accordion, expandable)
└── faqs (repeater)
    ├── question (text)
    ├── answer (wysiwyg)
    └── is_open_by_default (true/false)
```

#### 23. Comparison Table
```
comparison
├── title (text)
├── options (repeater)
    ├── name (text)
    ├── price (text)
    ├── description (textarea)
    ├── is_highlighted (true/false)
    └── features (repeater)
        ├── feature_name (text)
        └── included (true/false)
└── cta_text (text)
```

#### 24. Slideshow
```
slideshow
├── autoplay (true/false)
├── autoplay_speed (number) ← milliseconds
├── show_arrows (true/false)
├── show_dots (true/false)
├── infinite_loop (true/false)
└── slides (repeater)
    ├── image (image)
    ├── title (text)
    ├── description (wysiwyg)
    ├── link (url)
    └── link_text (text)
```

---

### Speciale Blokken

#### 25. Timeline
```
timeline
├── title (text)
├── orientation (select: vertical, horizontal)
└── events (repeater)
    ├── date (text)
    ├── title (text)
    ├── description (wysiwyg)
    ├── icon (image)
    └── color (color picker)
```

#### 26. Timeline Services
```
timeline_services
├── title (text)
└── services (repeater)
    ├── phase_name (text)
    ├── duration (text)
    ├── description (wysiwyg)
    └── deliverables (repeater)
        └── deliverable (text)
```

#### 27. Steps
```
steps
├── title (text)
├── layout (select: vertical, horizontal, numbered)
└── steps (repeater)
    ├── step_number (number)
    ├── title (text)
    ├── description (wysiwyg)
    ├── icon (image)
    └── color (color picker)
```

#### 28. Services
```
services
├── title (text)
├── subtitle (text)
├── layout (select: grid, list, cards)
├── columns (select: 2, 3, 4)
└── services (repeater)
    ├── service_name (text)
    ├── icon (image)
    ├── description (wysiwyg)
    ├── features (repeater)
        └── feature (text)
    ├── link (url)
    └── link_text (text)
```

#### 29. Packages
```
packages
├── title (text)
├── subtitle (text)
└── packages (repeater)
    ├── package_name (text)
    ├── price (text)
    ├── billing_period (select: monthly, yearly, one-time)
    ├── description (textarea)
    ├── is_featured (true/false)
    ├── features (repeater)
        └── feature (text)
    ├── cta_text (text)
    └── cta_url (url)
```

#### 30. Timezone Display
```
timezone
├── title (text)
├── show_multiple_zones (true/false)
└── timezones (repeater)
    ├── location_name (text)
    ├── timezone (select: all timezones)
    └── icon (image)
```

#### 31. Measurements
```
measurements
├── title (text)
└── metrics (repeater)
    ├── metric_name (text)
    ├── value (text)
    ├── unit (text)
    ├── icon (image)
    ├── color (color picker)
    └── description (text)
```

---

### Rich Text Blokken

#### 32. Richtext Box
```
richtext_box
├── content (wysiwyg)
├── background_color (color picker)
├── text_color (color picker)
├── padding (select: small, medium, large)
├── border (true/false)
├── border_color (color picker)
└── max_width (select: narrow, medium, wide, full)
```

#### 33. Richtext Testimonial
```
richtext_testimonial
├── quote (wysiwyg)
├── author_name (text)
├── author_role (text)
├── author_company (text)
├── author_photo (image)
├── company_logo (image)
├── rating (number: 1-5)
└── background_color (color picker)
```

#### 34. Richtext Code Block
```
richtext_code_block
├── code (textarea)
├── language (select: javascript, typescript, python, php, css, html, etc.)
├── show_line_numbers (true/false)
├── highlight_lines (text) ← bijv. "1,3-5,10"
├── title (text)
└── theme (select: light, dark)
```

---

### UI Element Blokken

#### 35. CTA Card
```
cta_card
├── title (text)
├── description (wysiwyg)
├── background_image (image)
├── background_color (color picker)
├── text_color (color picker)
├── alignment (select: left, center, right)
└── buttons (repeater)
    ├── text (text)
    ├── url (url)
    └── style (select: primary, secondary, outline)
```

#### 36. Open Positions
```
open_positions
├── title (text)
├── subtitle (text)
├── show_all_positions (true/false)
├── specific_positions (relationship → career)
├── group_by_department (true/false)
└── no_positions_message (wysiwyg)
```

#### 37. Office Cards
```
office_cards
├── title (text)
└── offices (repeater)
    ├── office_name (text)
    ├── address (wysiwyg)
    ├── phone (text)
    ├── email (email)
    ├── image (image)
    ├── map_link (url)
    └── is_headquarters (true/false)
```

#### 38. Careers List
```
careers_list
├── title (text)
├── layout (select: list, grid, table)
├── show_location (true/false)
├── show_type (true/false)
├── show_department (true/false)
└── filter_by_department (text)
```

#### 39. Slogan
```
slogan
├── text (text)
├── font_size (select: small, medium, large, xlarge)
├── font_weight (select: normal, medium, bold)
├── text_color (color picker)
├── alignment (select: left, center, right)
├── background_color (color picker)
├── padding (select: small, medium, large)
└── animate_on_scroll (true/false)
```

#### 40. Testimonials
```
testimonials
├── title (text)
├── layout (select: grid, carousel, masonry)
├── columns (select: 1, 2, 3)
└── testimonials (repeater)
    ├── quote (wysiwyg)
    ├── author_name (text)
    ├── author_role (text)
    ├── author_company (text)
    ├── author_photo (image)
    ├── company_logo (image)
    └── rating (number: 1-5)
```

---

### Extra Blokken

#### 41. Video
```
video
├── video_source (select: upload, youtube, vimeo, url)
├── video_file (file)
├── video_url (url)
├── poster_image (image)
├── autoplay (true/false)
├── loop (true/false)
├── muted (true/false)
├── controls (true/false)
└── caption (text)
```

#### 42. Spacer
```
spacer
├── height_desktop (number) ← pixels
└── height_mobile (number) ← pixels
```

#### 43. Divider
```
divider
├── style (select: solid, dashed, dotted)
├── thickness (number)
├── color (color picker)
├── width (select: full, narrow, medium, wide)
└── spacing (select: small, medium, large)
```

#### 44. Button Group
```
button_group
├── alignment (select: left, center, right)
├── spacing (select: tight, normal, loose)
└── buttons (repeater)
    ├── text (text)
    ├── url (url)
    ├── style (select: primary, secondary, outline, text)
    ├── size (select: small, medium, large)
    ├── icon (image)
    └── open_in_new_tab (true/false)
```

#### 45. Embed / HTML
```
embed_html
├── title (text)
├── html_code (textarea)
├── javascript_code (textarea)
├── css_code (textarea)
└── sandbox (true/false) ← voor security
```

#### 46. Social Links
```
social_links
├── title (text)
├── style (select: icons, buttons, text)
├── size (select: small, medium, large)
├── alignment (select: left, center, right)
└── links (repeater)
    ├── platform (select: facebook, twitter, linkedin, instagram, youtube, github, etc.)
    ├── url (url)
    └── custom_icon (image) ← optioneel
```

---

## 🚀 Stap-voor-Stap Implementatie

### Fase 1: WordPress Setup (Week 1)

#### Stap 1.1: WordPress Installatie
```bash
# Optie A: Lokale ontwikkeling met Local by Flywheel
# Download van: https://localwp.com/

# Optie B: Docker setup
docker-compose up -d

# Optie C: Traditionele installatie
# Download WordPress van wordpress.org
```

#### Stap 1.2: Installeer Benodigde Plugins
```
1. Advanced Custom Fields PRO
   → Koop licentie op: https://www.advancedcustomfields.com/pro/

2. ACF to REST API
   → Of: WPGraphQL + WPGraphQL for ACF

3. Custom Post Type UI (optioneel)

4. Yoast SEO

5. Enable Media Replace
```

#### Stap 1.3: Activeer REST API
```php
// In wp-config.php of functions.php
// REST API is standaard enabled, maar check:
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    return true;
});
```

---

### Fase 2: Custom Post Types Aanmaken (Week 1-2)

#### Stap 2.1: Maak Custom Post Types

Je kunt dit doen via **Custom Post Type UI** plugin of handmatig in `functions.php`:

```php
// In functions.php of custom plugin
function stachly_register_post_types() {

    // Blog Post
    register_post_type('blog_post', array(
        'labels' => array(
            'name' => 'Blog Posts',
            'singular_name' => 'Blog Post'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true, // BELANGRIJK voor REST API
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-welcome-write-blog'
    ));

    // Project
    register_post_type('project', array(
        'labels' => array(
            'name' => 'Projects',
            'singular_name' => 'Project'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-portfolio'
    ));

    // Team Member
    register_post_type('team_member', array(
        'labels' => array(
            'name' => 'Team Members',
            'singular_name' => 'Team Member'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups'
    ));

    // Career
    register_post_type('career', array(
        'labels' => array(
            'name' => 'Careers',
            'singular_name' => 'Career'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-businessman'
    ));

    // Handbook
    register_post_type('handbook', array(
        'labels' => array(
            'name' => 'Handbook',
            'singular_name' => 'Handbook Page'
        ),
        'public' => true,
        'hierarchical' => true, // Voor parent/child structuur
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'page-attributes'),
        'menu_icon' => 'dashicons-book'
    ));

    // Landing Page
    register_post_type('landing_page', array(
        'labels' => array(
            'name' => 'Landing Pages',
            'singular_name' => 'Landing Page'
        ),
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-admin-page'
    ));

    // Recognition
    register_post_type('recognition', array(
        'labels' => array(
            'name' => 'Recognition',
            'singular_name' => 'Recognition Entry'
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-awards'
    ));
}
add_action('init', 'stachly_register_post_types');
```

#### Stap 2.2: Maak Taxonomies

```php
function stachly_register_taxonomies() {

    // Project Tags
    register_taxonomy('project_tag', 'project', array(
        'labels' => array(
            'name' => 'Project Tags',
            'singular_name' => 'Project Tag'
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false
    ));

    // Blog Categories
    register_taxonomy('blog_category', 'blog_post', array(
        'labels' => array(
            'name' => 'Blog Categories',
            'singular_name' => 'Blog Category'
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true
    ));
}
add_action('init', 'stachly_register_taxonomies');
```

---

### Fase 3: ACF Field Groups Aanmaken (Week 2-3)

Dit is het **meest tijdrovende** deel. Je moet alle 46+ blokken configureren in ACF.

#### Stap 3.1: Maak Field Group voor Pages

1. Ga naar **ACF → Field Groups → Add New**
2. Naam: "Page Content Blocks"
3. Location Rules: **Post Type is equal to Page**

#### Stap 3.2: Voeg Flexible Content Field Toe

```
Field Label: Content Blocks
Field Name: content_blocks
Field Type: Flexible Content
```

#### Stap 3.3: Voeg Alle 46 Layouts Toe

Voor elk blok (bijv. Hero):

```
Layout: hero
Layout Label: Hero
Layout Name: hero

Sub fields:
├── title (Text)
├── subtitle (Textarea)
├── background_image (Image)
├── background_video (File)
├── height (Select: small, medium, large, full)
├── text_color (Color Picker)
├── alignment (Select: left, center, right)
└── cta_buttons (Repeater)
    ├── text (Text)
    ├── url (URL)
    └── style (Select: primary, secondary, outline)
```

**HERHAAL DIT VOOR ALLE 46 BLOKKEN** (zie lijst hierboven)

#### Stap 3.4: Export ACF Fields (voor backup)

```php
// In ACF → Tools → Generate PHP
// Of export als JSON (automatisch opslaan in /acf-json/)
```

---

### Fase 4: REST API Configuratie (Week 3)

#### Stap 4.1: Zorg dat ACF Fields in REST API komen

```php
// In functions.php
function stachly_add_acf_to_rest_api() {

    // Voor alle post types
    $post_types = array('page', 'blog_post', 'project', 'team_member', 'career', 'handbook', 'landing_page', 'recognition');

    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'acf', array(
            'get_callback' => function($object) {
                return get_fields($object['id']);
            },
            'schema' => null,
        ));
    }
}
add_action('rest_api_init', 'stachly_add_acf_to_rest_api');
```

#### Stap 4.2: Test REST API Endpoints

```bash
# Test of het werkt
curl https://jouw-wordpress-site.com/wp-json/wp/v2/pages

# Check ACF fields
curl https://jouw-wordpress-site.com/wp-json/wp/v2/pages/1

# Test custom post types
curl https://jouw-wordpress-site.com/wp-json/wp/v2/blog_post
curl https://jouw-wordpress-site.com/wp-json/wp/v2/project
curl https://jouw-wordpress-site.com/wp-json/wp/v2/team_member
```

#### Stap 4.3: Enable CORS (als WordPress op ander domein staat)

```php
// In functions.php
function stachly_enable_cors() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}
add_action('rest_api_init', 'stachly_enable_cors');
```

---

### Fase 5: SvelteKit Code Aanpassingen (Week 4-5)

#### Stap 5.1: Maak WordPress API Client

Maak nieuw bestand: `/src/lib/wordpress.ts`

```typescript
// src/lib/wordpress.ts
import type { BlogPost, Project, TeamMember, Career, Page } from './types/wordpress';

const WORDPRESS_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://jouw-wordpress-site.com/wp-json/wp/v2';

/**
 * Fetch data from WordPress REST API
 */
async function fetchFromWordPress<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${WORDPRESS_API_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch single page by slug
 */
export async function fetchPage(slug: string): Promise<Page> {
    const pages = await fetchFromWordPress<Page[]>('/pages', { slug, _embed: true });
    if (!pages || pages.length === 0) {
        throw new Error(`Page not found: ${slug}`);
    }
    return pages[0];
}

/**
 * Fetch all blog posts
 */
export async function fetchBlogPosts(params?: { per_page?: number; page?: number; category?: string }): Promise<BlogPost[]> {
    return fetchFromWordPress<BlogPost[]>('/blog_post', {
        per_page: params?.per_page || 10,
        page: params?.page || 1,
        _embed: true,
        ...params
    });
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<BlogPost> {
    const posts = await fetchFromWordPress<BlogPost[]>('/blog_post', { slug, _embed: true });
    if (!posts || posts.length === 0) {
        throw new Error(`Blog post not found: ${slug}`);
    }
    return posts[0];
}

/**
 * Fetch all projects
 */
export async function fetchProjects(params?: { per_page?: number }): Promise<Project[]> {
    return fetchFromWordPress<Project[]>('/project', {
        per_page: params?.per_page || 50,
        _embed: true
    });
}

/**
 * Fetch single project by slug
 */
export async function fetchProject(slug: string): Promise<Project> {
    const projects = await fetchFromWordPress<Project[]>('/project', { slug, _embed: true });
    if (!projects || projects.length === 0) {
        throw new Error(`Project not found: ${slug}`);
    }
    return projects[0];
}

/**
 * Fetch all team members
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
    return fetchFromWordPress<TeamMember[]>('/team_member', {
        per_page: 100,
        _embed: true,
        orderby: 'menu_order',
        order: 'asc'
    });
}

/**
 * Fetch single team member by slug
 */
export async function fetchTeamMember(slug: string): Promise<TeamMember> {
    const members = await fetchFromWordPress<TeamMember[]>('/team_member', { slug, _embed: true });
    if (!members || members.length === 0) {
        throw new Error(`Team member not found: ${slug}`);
    }
    return members[0];
}

/**
 * Fetch all careers/job openings
 */
export async function fetchCareers(): Promise<Career[]> {
    return fetchFromWordPress<Career[]>('/career', {
        per_page: 50,
        _embed: true,
        meta_query: {
            key: 'is_active',
            value: '1'
        }
    });
}

/**
 * Fetch single career by slug
 */
export async function fetchCareer(slug: string): Promise<Career> {
    const careers = await fetchFromWordPress<Career[]>('/career', { slug, _embed: true });
    if (!careers || careers.length === 0) {
        throw new Error(`Career not found: ${slug}`);
    }
    return careers[0];
}

/**
 * Fetch awards/recognition
 */
export async function fetchAwards(): Promise<any[]> {
    return fetchFromWordPress<any[]>('/recognition', {
        per_page: 100,
        _embed: true,
        orderby: 'date',
        order: 'desc'
    });
}
```

#### Stap 5.2: Maak TypeScript Types

Maak nieuw bestand: `/src/lib/types/wordpress.d.ts`

```typescript
// src/lib/types/wordpress.d.ts

export interface WordPressPost {
    id: number;
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: 'publish' | 'draft' | 'pending';
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    featured_media: number;
    acf: any; // Will be more specific based on post type
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        author?: Array<{
            id: number;
            name: string;
            avatar_urls: Record<string, string>;
        }>;
    };
}

export interface Page extends WordPressPost {
    acf: {
        seo_title?: string;
        seo_description?: string;
        og_image?: any;
        hide_from_listings?: boolean;
        content_blocks?: ContentBlock[];
    };
}

export interface BlogPost extends WordPressPost {
    acf: {
        author?: number; // Relationship to team_member
        hide_from_listings?: boolean;
        seo_title?: string;
        seo_description?: string;
        og_image?: any;
        content_blocks?: ContentBlock[];
    };
}

export interface Project extends WordPressPost {
    acf: {
        client_name?: string;
        project_url?: string;
        team_members?: number[]; // Relationships
        hide_from_listings?: boolean;
        seo_title?: string;
        seo_description?: string;
        og_image?: any;
        content_blocks?: ContentBlock[];
    };
}

export interface TeamMember extends WordPressPost {
    acf: {
        role?: string;
        bio?: string;
        photo?: any;
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

export interface Career extends WordPressPost {
    acf: {
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

// Content Block Types
export type ContentBlock =
    | HeroBlock
    | BoxBlock
    | TwoColumnsBlock
    | ImageBlock
    | BlogListBlock
    | ProjectsBlock
    | ContactFormBlock
    | PhysicsBlock
    | CanvasBlock
    | TimelineBlock
    | TestimonialsBlock
    | CTACardBlock
    // ... add all 46 block types
    ;

export interface HeroBlock {
    acf_fc_layout: 'hero';
    title?: string;
    subtitle?: string;
    background_image?: any;
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
    load_more_button?: boolean;
}

export interface PhysicsBlock {
    acf_fc_layout: 'physics';
    title?: string;
    enable_interaction?: boolean;
    gravity_strength?: number;
    physics_items?: Array<{
        item_type: 'circle' | 'rectangle' | 'image' | 'text';
        text_content?: string;
        image?: any;
        width?: number;
        height?: number;
        color?: string;
        mass?: number;
        friction?: number;
    }>;
    background_color?: string;
}

// ... Define alle 46 block types
```

#### Stap 5.3: Update Page Routes

Update `/src/routes/(marketing-site)/[...path]/+page.server.ts`:

```typescript
// src/routes/(marketing-site)/[...path]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPage } from '$lib/wordpress';

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.path || 'home';

    try {
        const page = await fetchPage(slug);

        return {
            page,
            title: page.acf?.seo_title || page.title.rendered,
            description: page.acf?.seo_description || page.excerpt.rendered,
        };
    } catch (err) {
        throw error(404, 'Page not found');
    }
};
```

#### Stap 5.4: Update Dynamic Block Component

Update `/src/components/blocks/dynamic-block.svelte`:

```svelte
<!-- src/components/blocks/dynamic-block.svelte -->
<script lang="ts">
    import type { ContentBlock } from '$lib/types/wordpress';

    // Import alle block components
    import Hero from './hero.svelte';
    import Box from './box.svelte';
    import TwoColumns from './two-columns.svelte';
    import Image from './image.svelte';
    import BlogList from './blog-list.svelte';
    import Projects from './projects.svelte';
    import Physics from './physics.svelte';
    import Canvas from './canvas.svelte';
    // ... import alle 46 components

    export let block: ContentBlock;

    // Map WordPress ACF layout names to Svelte components
    const blockComponents: Record<string, any> = {
        hero: Hero,
        box: Box,
        two_columns: TwoColumns,
        image: Image,
        blog_list: BlogList,
        projects: Projects,
        physics: Physics,
        canvas: Canvas,
        // ... map alle 46 blocks
    };

    $: component = blockComponents[block.acf_fc_layout];
</script>

{#if component}
    <svelte:component this={component} {...block} />
{:else}
    <div class="bg-red-100 border border-red-400 p-4">
        <p>Unknown block type: {block.acf_fc_layout}</p>
    </div>
{/if}
```

#### Stap 5.5: Update Individuele Block Components

Elke block component moet aangepast worden om WordPress data te gebruiken.

**Voorbeeld: Hero Block**

```svelte
<!-- src/components/blocks/hero.svelte -->
<script lang="ts">
    import type { HeroBlock } from '$lib/types/wordpress';

    // Props komen nu van WordPress ACF
    export let title: string = '';
    export let subtitle: string = '';
    export let background_image: any = null;
    export let background_video: any = null;
    export let height: 'small' | 'medium' | 'large' | 'full' = 'large';
    export let text_color: string = '#ffffff';
    export let alignment: 'left' | 'center' | 'right' = 'center';
    export let cta_buttons: Array<{
        text: string;
        url: string;
        style: 'primary' | 'secondary' | 'outline';
    }> = [];

    // Height classes mapping
    const heightClasses = {
        small: 'h-64',
        medium: 'h-96',
        large: 'h-screen/2',
        full: 'h-screen'
    };

    // Alignment classes
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };
</script>

<section
    class="relative flex items-center justify-center {heightClasses[height]}"
    style="color: {text_color};"
>
    <!-- Background image/video -->
    {#if background_video}
        <video
            class="absolute inset-0 w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
        >
            <source src={background_video.url} type="video/mp4" />
        </video>
    {:else if background_image}
        <img
            src={background_image.url}
            alt={background_image.alt || title}
            class="absolute inset-0 w-full h-full object-cover"
        />
    {/if}

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 {alignmentClasses[alignment]}">
        {#if title}
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
                {title}
            </h1>
        {/if}

        {#if subtitle}
            <p class="text-xl md:text-2xl mb-8">
                {subtitle}
            </p>
        {/if}

        {#if cta_buttons.length > 0}
            <div class="flex gap-4 {alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}">
                {#each cta_buttons as button}
                    <a
                        href={button.url}
                        class="btn btn-{button.style}"
                    >
                        {button.text}
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</section>
```

**HERHAAL DIT VOOR ALLE 46 COMPONENTS**

#### Stap 5.6: Update Physics Component

De physics component is complex. Update `/src/components/blocks/physics.svelte`:

```svelte
<!-- src/components/blocks/physics.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Matter from 'matter-js';
    import type { PhysicsBlock } from '$lib/types/wordpress';

    export let title: string = '';
    export let enable_interaction: boolean = true;
    export let gravity_strength: number = 0.0017;
    export let physics_items: Array<{
        item_type: 'circle' | 'rectangle' | 'image' | 'text';
        text_content?: string;
        image?: any;
        width?: number;
        height?: number;
        color?: string;
        mass?: number;
        friction?: number;
    }> = [];
    export let background_color: string = '#ffffff';

    let container: HTMLElement;
    let engine: Matter.Engine;
    let render: Matter.Render;

    onMount(() => {
        // Initialize Matter.js
        engine = Matter.Engine.create();
        engine.gravity.y = gravity_strength;

        render = Matter.Render.create({
            element: container,
            engine: engine,
            options: {
                width: container.clientWidth,
                height: 600,
                wireframes: false,
                background: background_color
            }
        });

        // Add walls
        const walls = [
            Matter.Bodies.rectangle(container.clientWidth / 2, 0, container.clientWidth, 10, { isStatic: true }),
            Matter.Bodies.rectangle(container.clientWidth / 2, 600, container.clientWidth, 10, { isStatic: true }),
            Matter.Bodies.rectangle(0, 300, 10, 600, { isStatic: true }),
            Matter.Bodies.rectangle(container.clientWidth, 300, 10, 600, { isStatic: true })
        ];

        Matter.World.add(engine.world, walls);

        // Add physics items from WordPress
        physics_items.forEach(item => {
            let body;

            if (item.item_type === 'circle') {
                body = Matter.Bodies.circle(
                    Math.random() * container.clientWidth,
                    Math.random() * 300,
                    item.width || 50,
                    {
                        mass: item.mass || 1,
                        friction: item.friction || 1,
                        render: {
                            fillStyle: item.color || '#3b82f6'
                        }
                    }
                );
            } else if (item.item_type === 'rectangle') {
                body = Matter.Bodies.rectangle(
                    Math.random() * container.clientWidth,
                    Math.random() * 300,
                    item.width || 80,
                    item.height || 80,
                    {
                        mass: item.mass || 1,
                        friction: item.friction || 1,
                        render: {
                            fillStyle: item.color || '#3b82f6'
                        }
                    }
                );
            }

            if (body) {
                Matter.World.add(engine.world, body);
            }
        });

        // Add mouse control if interaction is enabled
        if (enable_interaction) {
            const mouse = Matter.Mouse.create(render.canvas);
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

            Matter.World.add(engine.world, mouseConstraint);
        }

        // Run the engine
        Matter.Engine.run(engine);
        Matter.Render.run(render);

        return () => {
            Matter.Render.stop(render);
            Matter.Engine.clear(engine);
        };
    });
</script>

<section class="physics-section">
    {#if title}
        <h2 class="text-3xl font-bold text-center mb-8">{title}</h2>
    {/if}

    <div bind:this={container} class="physics-container"></div>
</section>

<style>
    .physics-container {
        width: 100%;
        height: 600px;
    }
</style>
```

#### Stap 5.7: Environment Variables

Update `.env`:

```bash
# .env
VITE_WORDPRESS_API_URL=https://jouw-wordpress-site.com/wp-json/wp/v2

# Als WordPress authentication nodig is
VITE_WORDPRESS_USERNAME=admin
VITE_WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

---

### Fase 6: Content Migratie (Week 5-6)

#### Stap 6.1: Export Storyblok Content

```typescript
// scripts/export-storyblok.ts
import StoryblokClient from 'storyblok-js-client';
import fs from 'fs';

const Storyblok = new StoryblokClient({
    accessToken: 'jouw-storyblok-token'
});

async function exportAllContent() {
    const stories = await Storyblok.getAll('cdn/stories', {
        version: 'published'
    });

    fs.writeFileSync('storyblok-export.json', JSON.stringify(stories, null, 2));
    console.log(`Exported ${stories.length} stories`);
}

exportAllContent();
```

#### Stap 6.2: Maak Import Script voor WordPress

```typescript
// scripts/import-to-wordpress.ts
import fs from 'fs';
import fetch from 'node-fetch';

const WORDPRESS_API = 'https://jouw-wordpress-site.com/wp-json/wp/v2';
const USERNAME = 'admin';
const APP_PASSWORD = 'xxxx xxxx xxxx xxxx';

const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

async function createPost(postType: string, data: any) {
    const response = await fetch(`${WORDPRESS_API}/${postType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Failed to create ${postType}: ${await response.text()}`);
    }

    return response.json();
}

async function importContent() {
    const stories = JSON.parse(fs.readFileSync('storyblok-export.json', 'utf-8'));

    for (const story of stories) {
        console.log(`Importing: ${story.name}`);

        // Map Storyblok content to WordPress structure
        const wordpressData = {
            title: story.name,
            slug: story.slug,
            status: 'publish',
            acf: {
                content_blocks: story.content.body // Map blocks
            }
        };

        // Determine post type
        let postType = 'page';
        if (story.content.component === 'blog-post') postType = 'blog_post';
        else if (story.content.component === 'project') postType = 'project';
        // ... etc

        await createPost(postType, wordpressData);
    }
}

importContent();
```

#### Stap 6.3: Handmatige Content Check

Na automatische import:
1. Check elke pagina in WordPress
2. Verifieer dat alle blokken correct zijn
3. Upload ontbrekende afbeeldingen
4. Controleer relationships (author, projects, etc.)

---

### Fase 7: Testing (Week 7)

#### Stap 7.1: Lokale Development Setup

```bash
# Start WordPress lokaal
cd wordpress-site
php -S localhost:8000

# Of met Docker
docker-compose up

# Start SvelteKit development
cd stachly
npm run dev
```

#### Stap 7.2: Test Alle Functionaliteit

**Checklist:**
- [ ] Alle pagina's laden correct
- [ ] Blog posts tonen correct
- [ ] Projects tonen correct
- [ ] Team members tonen correct
- [ ] Alle 46 blokken renderen correct
- [ ] Physics animatie werkt
- [ ] Canvas animatie werkt
- [ ] Forms werken (AWS SES integratie behouden)
- [ ] Images laden correct
- [ ] Responsive design werkt
- [ ] Dark mode werkt
- [ ] SEO meta tags correct
- [ ] RSS feed werkt

#### Stap 7.3: Performance Testing

```bash
# Lighthouse test
npm run build
npm run preview

# Open Chrome DevTools → Lighthouse → Run
```

---

### Fase 8: Deployment (Week 8)

#### Stap 8.1: WordPress Hosting

**Opties:**
1. **WP Engine** (managed WordPress)
2. **Kinsta** (managed WordPress)
3. **DigitalOcean** + Laravel Forge
4. **AWS EC2** (meer controle)

#### Stap 8.2: SvelteKit Deployment (Vercel)

Update `svelte.config.js`:

```javascript
// svelte.config.js
export default {
    kit: {
        adapter: adapter({
            runtime: 'nodejs18.x'
        }),
        env: {
            publicPrefix: 'VITE_'
        }
    }
};
```

Update Vercel environment variables:
```
VITE_WORDPRESS_API_URL=https://production-wordpress.com/wp-json/wp/v2
```

#### Stap 8.3: CDN Setup voor WordPress Media

```php
// In WordPress functions.php
define('WP_CONTENT_URL', 'https://cdn.jouw-site.com/wp-content');
```

---

## 🔄 Alternatieve Aanpak: WordPress Volledig Frontend

Als je **volledig WordPress wilt gebruiken** (niet headless), moet je:

### Optie B: Traditionele WordPress Theme

1. **Converteer SvelteKit naar WordPress Theme**
   - Build SvelteKit naar static assets
   - Laad compiled JS/CSS in WordPress theme
   - Gebruik PHP templates met Svelte hydration

2. **Benodigde Plugins**
   - Advanced Custom Fields PRO
   - Gutenberg Blocks
   - Custom Post Types

3. **Theme Structure**
```
wp-content/themes/stachly/
├── functions.php
├── header.php
├── footer.php
├── index.php
├── single.php
├── page.php
├── assets/
│   ├── svelte-build/ ← compiled Svelte code
│   ├── css/
│   └── js/
└── template-parts/
```

**NADELEN VAN DEZE AANPAK:**
- Moeilijker om Svelte reactivity te behouden
- Complexere build setup
- Minder developer experience
- Langzamere development

**DAAROM RADEN WE HEADLESS WORDPRESS AAN** ✅

---

## 📚 Extra Resources

### WordPress REST API Documentatie
- https://developer.wordpress.org/rest-api/
- https://developer.wordpress.org/rest-api/reference/

### ACF Documentation
- https://www.advancedcustomfields.com/resources/
- https://www.advancedcustomfields.com/resources/rest-api/

### SvelteKit Documentation
- https://kit.svelte.dev/docs

### Headless WordPress Tutorials
- https://www.wpgraphql.com/
- https://developers.wpengine.com/headless-wordpress

---

## ⚠️ Belangrijke Overwegingen

### 1. Licentiekosten

**ACF PRO:** $49/jaar (per site) of $249/jaar (unlimited)

### 2. Performance

Headless WordPress + SvelteKit is **sneller** dan traditionele WordPress omdat:
- Frontend is statically generated
- Geen PHP rendering on request
- CDN caching mogelijk
- Alleen API calls voor data

### 3. Hosting Kosten

- **WordPress:** $20-100/maand (afhankelijk van traffic)
- **Vercel (frontend):** Gratis tot $20/maand

### 4. Developer Experience

- **WordPress admin:** Gebruiksvriendelijk voor content editors
- **ACF:** Veel klikwerk om 46 blokken op te zetten (eenmalig)
- **SvelteKit:** Behoud alle development benefits

### 5. Maintenance

- **WordPress updates:** Maandelijks (plugins, core, theme)
- **SvelteKit updates:** Per release cycle
- **API compatibility:** Check na elke WordPress update

---

## 🎯 Samenvatting

### Wat je moet doen:

1. ✅ **Installeer WordPress** + ACF PRO
2. ✅ **Maak 8 custom post types**
3. ✅ **Configureer 46 ACF flexible content blokken**
4. ✅ **Enable REST API** met ACF fields
5. ✅ **Update SvelteKit code** om WordPress API te gebruiken
6. ✅ **Migreer content** van Storyblok naar WordPress
7. ✅ **Test alles grondig**
8. ✅ **Deploy** WordPress en SvelteKit

### Geschatte tijdsinvestering:

- **WordPress setup:** 1-2 weken
- **ACF configuratie:** 2-3 weken (46 blokken!)
- **Code aanpassingen:** 1-2 weken
- **Content migratie:** 1-2 weken
- **Testing & fixes:** 1 week
- **Deployment:** 3-5 dagen

**TOTAAL: 6-8 weken** voor complete migratie

---

## 💡 Tip: Gefaseerde Migratie

Als 8 weken te lang is, overweeg:

1. **Fase 1:** Migreer alleen Pages (geen blokken)
2. **Fase 2:** Voeg 10 meest gebruikte blokken toe
3. **Fase 3:** Voeg resterende blokken toe
4. **Fase 4:** Migreer blog, projects, etc.

Dit zorgt ervoor dat je **sneller live kunt** met basis functionaliteit.

---

Heb je vragen over specifieke stappen? Laat het me weten!
