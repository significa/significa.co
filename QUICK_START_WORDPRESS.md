# Quick Start: WordPress Integratie

## 🚀 Start Hier - Eerste 3 Dagen

Deze guide helpt je om **binnen 3 dagen** een werkende WordPress setup te hebben waar je mee kunt experimenteren.

---

## Dag 1: WordPress Installatie & Basis Setup (4 uur)

### Stap 1: Installeer WordPress Lokaal (30 min)

**Optie A: Local by Flywheel** (Aanbevolen - makkelijkst)
```bash
# Download van: https://localwp.com/
# 1. Installeer Local
# 2. Klik op "+ CREATE A NEW SITE"
# 3. Naam: "stachly-wordpress"
# 4. Environment: Preferred
# 5. WordPress username: admin
# 6. WordPress password: [kies sterk wachtwoord]
# 7. Klik "ADD SITE"
```

**Optie B: Docker** (Voor developers)
```bash
# Maak docker-compose.yml in nieuwe folder:
mkdir wordpress-stachly
cd wordpress-stachly

# Gebruik deze docker-compose.yml:
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - ./wp-content:/var/www/html/wp-content
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
EOF

# Start containers:
docker-compose up -d

# Open: http://localhost:8080
# Volg WordPress setup wizard
```

### Stap 2: Download & Installeer ACF PRO (15 min)

1. **Koop licentie**: https://www.advancedcustomfields.com/pro/
   - **Personal**: $49/jaar (1 site) ← neem deze voor nu
   - **Freelancer**: $149/jaar (10 sites)
   - **Agency**: $249/jaar (unlimited)

2. **Download plugin**:
   - Log in op ACF account
   - Download `advanced-custom-fields-pro.zip`

3. **Installeer in WordPress**:
   - Ga naar `Plugins → Add New`
   - Klik `Upload Plugin`
   - Kies `advanced-custom-fields-pro.zip`
   - Klik `Install Now` → `Activate`

4. **Activeer licentie**:
   - Ga naar `ACF → Updates`
   - Voer license key in
   - Klik `Activate License`

### Stap 3: Installeer Andere Plugins (15 min)

```
WordPress Admin → Plugins → Add New → Search:

1. "ACF to REST API"
   → Install → Activate

2. "Yoast SEO"
   → Install → Activate

3. "Query Monitor" (voor debugging)
   → Install → Activate
```

### Stap 4: Basis WordPress Configuratie (30 min)

```
Settings → General:
- Site Title: "Stachly"
- Tagline: [laat leeg of vul in]
- WordPress Address (URL): http://localhost:8080
- Site Address (URL): http://localhost:8080
- Timezone: Amsterdam
→ Save Changes

Settings → Permalinks:
- Select: "Post name" (/%postname%/)
→ Save Changes

Settings → Media:
- Thumbnail size: 300 x 300
- Medium size: 800 x 600
- Large size: 1920 x 1080
→ Save Changes

Settings → Reading:
- Your homepage displays: "A static page"
- Homepage: [we maken deze later]
- Posts page: [laat leeg voor nu]
→ Save Changes
```

### Stap 5: Maak Theme Folder (30 min)

```bash
# Navigeer naar wp-content/themes
cd wp-content/themes

# Maak nieuwe theme folder
mkdir stachly-theme
cd stachly-theme

# Maak basis bestanden
touch style.css
touch functions.php
touch index.php
```

**style.css:**
```css
/*
Theme Name: Stachly Theme
Theme URI: https://stachly.com
Description: Headless WordPress theme voor Stachly website
Author: Stachly
Version: 1.0
*/

/* Dit bestand kan leeg blijven - we gebruiken Tailwind in SvelteKit */
```

**functions.php:**
```php
<?php
// Kopieer de inhoud van wordpress-integration-example.php hier
// Of download het bestand en include het:
require_once get_template_directory() . '/inc/custom-post-types.php';
require_once get_template_directory() . '/inc/rest-api.php';
?>
```

**index.php:**
```php
<?php
/**
 * Basis template - niet gebruikt bij headless setup
 * Maar vereist voor WordPress theme
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php bloginfo('name'); ?></title>
</head>
<body>
    <h1>Headless WordPress</h1>
    <p>Deze site gebruikt een headless setup met SvelteKit frontend.</p>
    <p>Bezoek de SvelteKit site op: http://localhost:5173</p>
</body>
</html>
```

**Activeer het theme:**
```
WordPress Admin → Appearance → Themes
→ Activate "Stachly Theme"
```

### Stap 6: Test REST API (30 min)

Open in browser of gebruik cURL:

```bash
# Test basis API
curl http://localhost:8080/wp-json/wp/v2/pages

# Test posts
curl http://localhost:8080/wp-json/wp/v2/posts

# Expected: JSON response met lege array of demo posts
```

**Als je 404 krijgt:**
```
WordPress Admin → Settings → Permalinks
→ Klik gewoon "Save Changes" (refresht rewrite rules)
```

---

## Dag 2: Eerste Custom Post Type + ACF Fields (4 uur)

### Stap 1: Maak "Blog Post" Custom Post Type (30 min)

**Optie A: Via functions.php** (kopieer van `wordpress-integration-example.php`)

**Optie B: Via plugin**
```
WordPress Admin → Plugins → Add New
→ Search: "Custom Post Type UI"
→ Install → Activate

CPT UI → Add/Edit Post Types:
- Post Type Slug: blog_post
- Plural Label: Blog Posts
- Singular Label: Blog Post
- Has Archive: true
- Show in REST API: true
→ Add Post Type
```

**Verifieer:**
```bash
curl http://localhost:8080/wp-json/wp/v2/blog_post
# Should return: []
```

### Stap 2: Maak Eerste ACF Field Group (1 uur)

```
WordPress Admin → ACF → Field Groups → Add New

Field Group Title: "Blog Post Fields"

Location Rules:
- Post Type is equal to Blog Post

Add Fields:

1. Field Label: Featured Image Alt Text
   Field Name: featured_image_alt
   Field Type: Text

2. Field Label: Author
   Field Name: author
   Field Type: Relationship
   Post Type: (we maken dit later - skip voor nu)

3. Field Label: Hide from Listings
   Field Name: hide_from_listings
   Field Type: True / False

4. Field Label: SEO Title
   Field Name: seo_title
   Field Type: Text

5. Field Label: SEO Description
   Field Name: seo_description
   Field Type: Textarea

→ Publish
```

### Stap 3: Maak Test Blog Post (30 min)

```
WordPress Admin → Blog Posts → Add New

Title: "Test Blog Post"
Content: "Dit is een test blog post voor de WordPress migratie."

Featured Image: [upload een test afbeelding]

ACF Fields (rechter sidebar):
- SEO Title: "Test Blog Post - Stachly"
- SEO Description: "Een test blog post"
- Hide from Listings: unchecked

→ Publish
```

### Stap 4: Verifieer ACF in REST API (30 min)

```bash
# Haal blog posts op met ACF fields
curl http://localhost:8080/wp-json/wp/v2/blog_post

# Expected: JSON met je blog post + acf object:
{
  "id": 1,
  "title": {"rendered": "Test Blog Post"},
  "acf": {
    "featured_image_alt": "",
    "author": null,
    "hide_from_listings": false,
    "seo_title": "Test Blog Post - Stachly",
    "seo_description": "Een test blog post"
  }
}
```

**Als je GEEN acf field ziet:**

Controleer of `ACF to REST API` plugin actief is:
```
WordPress Admin → Plugins
→ Check "ACF to REST API" is activated
```

Of voeg handmatig toe aan functions.php:
```php
// In functions.php
add_action('rest_api_init', function() {
    register_rest_field('blog_post', 'acf', array(
        'get_callback' => function($object) {
            return get_fields($object['id']);
        }
    ));
});
```

### Stap 5: Maak Eerste Content Block (1.5 uur)

```
WordPress Admin → ACF → Field Groups → Add New

Field Group Title: "Content Blocks - Blog Post"

Location Rules:
- Post Type is equal to Blog Post

Add Field:
- Field Label: Content Blocks
- Field Name: content_blocks
- Field Type: Flexible Content
- Button Label: Add Block
→ Click "Add Layout"

LAYOUT 1: HERO
- Layout Title: Hero
- Layout Name: hero

Sub Fields:
1. Title (Text)
2. Subtitle (Textarea)
3. Background Color (Color Picker)
   - Default: #ffffff

LAYOUT 2: TEXT BLOCK
- Layout Title: Text Block
- Layout Name: text_block

Sub Fields:
1. Content (WYSIWYG Editor)

LAYOUT 3: IMAGE
- Layout Title: Image
- Layout Name: image

Sub Fields:
1. Image (Image)
2. Alt Text (Text)
3. Caption (Text)

→ Publish
```

### Stap 6: Test Content Blocks (30 min)

```
WordPress Admin → Blog Posts → Edit "Test Blog Post"

Scroll naar beneden → Content Blocks
→ Click "Add Block"
→ Select "Hero"

Fill in:
- Title: "Welkom bij Stachly"
- Subtitle: "We bouwen geweldige websites"
- Background Color: #3b82f6

→ Click "Add Block" again
→ Select "Text Block"

Content: "Lorem ipsum dolor sit amet..."

→ Update

Check REST API:
curl http://localhost:8080/wp-json/wp/v2/blog_post/1

Expected acf.content_blocks:
[
  {
    "acf_fc_layout": "hero",
    "title": "Welkom bij Stachly",
    "subtitle": "We bouwen geweldige websites",
    "background_color": "#3b82f6"
  },
  {
    "acf_fc_layout": "text_block",
    "content": "Lorem ipsum dolor sit amet..."
  }
]
```

---

## Dag 3: SvelteKit Integratie (4 uur)

### Stap 1: WordPress API Client Maken (1 uur)

```bash
# In je stachly project
cd /home/user/stachly

# Maak WordPress lib bestand
touch src/lib/wordpress.ts
```

**src/lib/wordpress.ts:**
```typescript
const WP_API = 'http://localhost:8080/wp-json/wp/v2';

interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    featured_media: number;
    acf?: any;
}

export async function fetchBlogPosts(): Promise<WPPost[]> {
    const response = await fetch(`${WP_API}/blog_post?_embed=true`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return response.json();
}

export async function fetchBlogPost(slug: string): Promise<WPPost> {
    const response = await fetch(`${WP_API}/blog_post?slug=${slug}&_embed=true`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    const posts = await response.json();
    if (posts.length === 0) throw new Error('Blog post not found');
    return posts[0];
}
```

### Stap 2: Test Route Maken (30 min)

```bash
# Maak test route
mkdir -p src/routes/wp-test
touch src/routes/wp-test/+page.server.ts
touch src/routes/wp-test/+page.svelte
```

**src/routes/wp-test/+page.server.ts:**
```typescript
import { fetchBlogPosts } from '$lib/wordpress';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const posts = await fetchBlogPosts();
        return { posts };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { posts: [], error: 'Failed to load posts' };
    }
};
```

**src/routes/wp-test/+page.svelte:**
```svelte
<script lang="ts">
    export let data;
</script>

<div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8">WordPress Blog Posts Test</h1>

    {#if data.error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {data.error}
        </div>
    {/if}

    {#if data.posts.length === 0}
        <p>Geen blog posts gevonden.</p>
    {:else}
        <div class="grid gap-6">
            {#each data.posts as post}
                <article class="border p-6 rounded-lg">
                    <h2 class="text-2xl font-bold mb-2">
                        {post.title.rendered}
                    </h2>

                    <div class="prose mb-4">
                        {@html post.excerpt.rendered}
                    </div>

                    {#if post.acf}
                        <div class="bg-gray-100 p-4 rounded">
                            <h3 class="font-bold mb-2">ACF Fields:</h3>
                            <pre class="text-sm">{JSON.stringify(post.acf, null, 2)}</pre>
                        </div>
                    {/if}

                    {#if post.acf?.content_blocks}
                        <div class="mt-4">
                            <h3 class="font-bold mb-2">Content Blocks:</h3>
                            {#each post.acf.content_blocks as block}
                                <div class="mb-4 p-4 border rounded">
                                    <strong>Type:</strong> {block.acf_fc_layout}
                                    <pre class="mt-2 text-sm">{JSON.stringify(block, null, 2)}</pre>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </article>
            {/each}
        </div>
    {/if}
</div>
```

### Stap 3: Test de Integratie (30 min)

```bash
# Start SvelteKit dev server
npm run dev

# Open in browser:
# http://localhost:5173/wp-test
```

**Verwachte output:**
- Je ziet "Test Blog Post" met alle ACF fields
- Content blocks worden getoond met hun data
- JSON is correct geformatteerd

**Troubleshooting:**

1. **CORS errors?**
```php
// Voeg toe aan WordPress functions.php:
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        return $value;
    });
}, 15);
```

2. **No ACF fields?**
```bash
# Check in browser:
http://localhost:8080/wp-json/wp/v2/blog_post/1

# Moet acf object hebben
```

3. **Empty response?**
```bash
# Check WordPress permalinks
WordPress Admin → Settings → Permalinks → Save Changes
```

### Stap 4: Maak Eerste Dynamic Block Component (1 uur)

```bash
# Maak test block component
mkdir -p src/components/wp-blocks
touch src/components/wp-blocks/hero.svelte
touch src/components/wp-blocks/dynamic-block.svelte
```

**src/components/wp-blocks/hero.svelte:**
```svelte
<script lang="ts">
    export let title: string = '';
    export let subtitle: string = '';
    export let background_color: string = '#ffffff';
</script>

<section
    class="hero py-20 px-8 text-center"
    style="background-color: {background_color};"
>
    {#if title}
        <h1 class="text-5xl font-bold mb-4">{title}</h1>
    {/if}

    {#if subtitle}
        <p class="text-xl">{subtitle}</p>
    {/if}
</section>
```

**src/components/wp-blocks/dynamic-block.svelte:**
```svelte
<script lang="ts">
    import Hero from './hero.svelte';

    export let block: any;

    const components: Record<string, any> = {
        hero: Hero,
    };

    $: component = components[block.acf_fc_layout];
</script>

{#if component}
    <svelte:component this={component} {...block} />
{:else}
    <div class="bg-yellow-100 border border-yellow-400 p-4">
        Unknown block type: {block.acf_fc_layout}
    </div>
{/if}
```

### Stap 5: Update Test Page om Blocks te Renderen (30 min)

**Update src/routes/wp-test/+page.svelte:**
```svelte
<script lang="ts">
    import DynamicBlock from '$components/wp-blocks/dynamic-block.svelte';
    export let data;
</script>

<div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8">WordPress Integration Test</h1>

    {#if data.posts.length > 0}
        {#each data.posts as post}
            <article class="mb-12">
                <h2 class="text-3xl font-bold mb-4">{post.title.rendered}</h2>

                <!-- Render content blocks -->
                {#if post.acf?.content_blocks}
                    <div class="content-blocks">
                        {#each post.acf.content_blocks as block}
                            <DynamicBlock {block} />
                        {/each}
                    </div>
                {:else}
                    <div class="prose" contenteditable="false">
                        {@html post.content.rendered}
                    </div>
                {/if}
            </article>
        {/each}
    {/if}
</div>
```

### Stap 6: Test Complete Flow (30 min)

**1. Update je blog post in WordPress:**
```
WordPress Admin → Blog Posts → Edit "Test Blog Post"

Content Blocks:
1. Hero Block:
   - Title: "WordPress + SvelteKit"
   - Subtitle: "Werkt perfect samen!"
   - Background Color: #3b82f6

2. Text Block:
   - Content: "Dit is een test van de headless WordPress setup."

→ Update
```

**2. Refresh SvelteKit:**
```
http://localhost:5173/wp-test
```

**3. Verifieer:**
- ✅ Hero block toont met blauwe achtergrond
- ✅ Titel en subtitle zijn zichtbaar
- ✅ Text block toont eronder
- ✅ Styling werkt (Tailwind classes)

---

## 🎉 Gefeliciteerd!

Je hebt nu een **werkende WordPress + SvelteKit setup**!

### Wat je hebt bereikt:

✅ WordPress draait lokaal
✅ ACF PRO geïnstalleerd en geconfigureerd
✅ Custom post type "Blog Post" aangemaakt
✅ ACF field groups met flexible content blocks
✅ REST API werkt met ACF fields
✅ SvelteKit kan WordPress data ophalen
✅ Dynamic block rendering werkt
✅ Hero block component werkt

---

## 🚀 Volgende Stappen

### Korte termijn (deze week):

1. **Voeg meer blocks toe:**
   - Image block
   - Text block
   - Two Columns block

2. **Maak meer post types:**
   - Project
   - Team Member

3. **Voeg meer ACF fields toe:**
   - Author relationship
   - Categories
   - Tags

### Middellange termijn (volgende week):

1. **Converteer bestaande components:**
   - Update alle 46 blokken om WordPress data te gebruiken
   - Test elke block afzonderlijk

2. **Migreer content:**
   - Export Storyblok content
   - Import in WordPress
   - Verifieer alles werkt

### Lange termijn (week 3-4):

1. **Production setup:**
   - WordPress hosting kiezen
   - Deploy WordPress
   - Update SvelteKit API URL
   - Test in production

---

## 📚 Hulpbronnen

### Documentatie
- WordPress REST API: https://developer.wordpress.org/rest-api/
- ACF Docs: https://www.advancedcustomfields.com/resources/
- SvelteKit Docs: https://kit.svelte.dev/docs

### Support
- WordPress Forums: https://wordpress.org/support/
- ACF Support: https://support.advancedcustomfields.com/
- SvelteKit Discord: https://svelte.dev/chat

---

## 🆘 Problemen?

### WordPress laadt niet
```bash
# Local by Flywheel: rechter muisknop op site → Restart

# Docker:
docker-compose restart
```

### ACF fields niet in REST API
```php
// functions.php - forceer REST API registratie:
add_filter('acf/settings/rest_api_enabled', '__return_true');
```

### CORS errors
```php
// functions.php:
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
});
```

### SvelteKit kan WordPress niet bereiken
```bash
# Check of WordPress draait:
curl http://localhost:8080/wp-json

# Check CORS:
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     http://localhost:8080/wp-json/wp/v2/blog_post
```

---

**Klaar om te beginnen? Start met Dag 1! 🚀**
