# WordPress Integratie Status

## ✅ Wat is al gedaan

### 1. WordPress API Client (`src/lib/wordpress.ts`)
- Complete WordPress REST API client gemaakt
- Functies voor alle content types:
  - `fetchPage(slug)` - Ophalen van pagina's
  - `fetchBlogPosts()` - Blog posts met filtering
  - `fetchProjects()` - Projecten
  - `fetchTeamMembers()` - Team leden
  - `fetchCareers()` - Vacatures
  - `fetchHandbookPages()` - Handbook pages
  - `fetchAwards()` - Awards/recognition
- Helper functies voor images en gerelateerde content

### 2. TypeScript Types (`src/lib/types/wordpress.d.ts`)
- Complete type definitions voor WordPress REST API
- Alle 46 content blokken gedefineerd:
  - Layout blokken (Hero, Box, Two Columns, etc.)
  - Content blokken (Blog List, Projects, etc.)
  - Interactive blokken (Physics, Canvas, etc.)
  - En alle andere blokken
- ACF image types
- Post type interfaces (Page, Blog Post, Project, etc.)

### 3. Environment Variables
- `.env` en `.env.example` updated
- `VITE_WORDPRESS_API_URL` toegevoegd
- Oude Storyblok variabelen gemarkeerd als deprecated

### 4. Content Layer Migratie (`src/lib/content.ts`)
- Oude Storyblok `content.ts` backed-up naar `content.storyblok.bak`
- Nieuwe `content.ts` gemaakt met WordPress integration
- **Backwards compatible** API - bestaande code blijft werken
- Normalisatie functies om WordPress data compatible te maken

### 5. Build Scripts
- `scripts/datasources.ts` - Graceful fallback zonder Storyblok token
- `scripts/sitemap.ts` - Graceful fallback zonder Storyblok token

---

## 🔨 Wat nu moet gebeuren

### Stap 1: WordPress Configuratie Controleren

Controleer dat je WordPress installatie klaar is:

```bash
# Test of WordPress API bereikbaar is
curl http://localhost:8080/wp-json/wp/v2/pages

# Als dit werkt, zie je JSON output
```

Update `.env` met je WordPress URL:
```bash
VITE_WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
# Of je productie URL:
# VITE_WORDPRESS_API_URL=https://jouw-wordpress.com/wp-json/wp/v2
```

### Stap 2: Test de WordPress Verbinding

Maak een test pagina in WordPress:
1. Ga naar WordPress Admin → Pages → Add New
2. Titel: "Test Page"
3. Slug: `test-page`
4. Publish
5. Voeg wat content blocks toe (als je ACF hebt geconfigureerd)

Test via SvelteKit:
```bash
npm run dev
# Open: http://localhost:5173/test-page
```

### Stap 3: Content in WordPress Aanmaken

**Minimaal nodig voor de site:**

1. **Homepage**
   - Slug: `home`
   - Type: Page
   - Voeg Hero block toe met welkomst tekst

2. **Blog Posts** (minstens 1-2 voor testing)
   - Type: Blog Post
   - Voeg content blocks toe

3. **Team Members** (minstens 1 voor testing)
   - Type: Team Member
   - Vul naam, rol, foto in

4. **Projects** (optioneel voor testing)
   - Type: Project
   - Voeg project details toe

### Stap 4: ACF Field Groups Configureren

**Je moet deze ACF field groups aanmaken in WordPress:**

#### Voor alle Post Types:
- SEO Title (text)
- SEO Description (textarea)
- OG Image (image)
- Hide from Listings (true/false)
- **Content Blocks (Flexible Content)** ← Hier komen alle 46 blokken

#### Content Blocks Layouts:

Start met deze **essentiële** blokken:
1. **Hero** - voor homepage headers
2. **Richtext Box** - voor text content
3. **Image** - voor afbeeldingen
4. **Two Columns** - voor layouts
5. **Blog List** - voor blog overzichten
6. **Projects** - voor project grids

Zie `WORDPRESS_MIGRATIE_PLAN.md` voor de complete configuratie van alle 46 blokken.

---

## 🧪 Testing Checklist

- [ ] WordPress API is bereikbaar op configured URL
- [ ] `.env` heeft correcte `VITE_WORDPRESS_API_URL`
- [ ] Test pagina in WordPress aangemaakt
- [ ] SvelteKit kan WordPress data ophalen
- [ ] Homepage (`/home` of `/`) laadt
- [ ] Blog listing werkt
- [ ] Minimaal 1 content block werkt (bijv. Hero)
- [ ] Images laden correct
- [ ] No console errors

---

## 🐛 Troubleshooting

### "Failed to fetch" errors

**Probleem:** CORS errors in browser console

**Oplossing:**
```php
// Voeg toe aan WordPress functions.php:
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});
```

### "Page not found" errors

**Probleem:** Routes werken niet

**Oorzaak:** WordPress permalinks niet correct

**Oplossing:**
```
WordPress Admin → Settings → Permalinks
→ Klik "Save Changes" (refresht rewrite rules)
```

### ACF fields niet in API

**Probleem:** `acf` object is leeg of undefined in API response

**Oplossing:**
```php
// Voeg toe aan functions.php:
add_filter('acf/settings/rest_api_enabled', '__return_true');

// Of installeer plugin: "ACF to REST API"
```

### Build fails lokaal

**Probleem:** `npm run build` faalt

**Mogelijke oorzaken:**
1. Environment variabele `VITE_WORDPRESS_API_URL` niet gezet
2. WordPress niet bereikbaar tijdens build

**Oplossing:**
```bash
# Check environment variables
echo $VITE_WORDPRESS_API_URL

# Als build-time data fetch nodig is, update svelte.config.js
```

---

## 📋 Volgende Taken (in volgorde)

### 1. Route Updates
Bestanden die moeten worden aangepast:
- `/src/routes/(marketing-site)/[...path]/+page.server.ts`
- `/src/routes/(marketing-site)/blog/[...path]/+page.server.ts`
- `/src/routes/(marketing-site)/projecten/[...path]/+page.server.ts`
- `/src/routes/(marketing-site)/team/[...path]/+page.server.ts`
- En andere route bestanden

Deze bestanden moeten:
- `normalizeWordPressPost()` gebruiken voor data transformatie
- `buildPageResult()` gebruiken voor page structure
- Error handling updaten

### 2. Component Updates
Bestanden die moeten worden aangepast:
- `/src/components/pages/dynamic-page.svelte`
- `/src/components/blocks/dynamic-block.svelte`
- Individuele block components (Hero, Blog List, etc.)

Deze components moeten:
- WordPress `acf_fc_layout` block type gebruiken
- ACF field structure ondersteunen
- Image helpers gebruiken (`getImageUrl`, `getFeaturedImageUrl`)

### 3. Physics & Canvas Blocks
Speciale aandacht voor:
- `/src/components/blocks/physics.svelte`
- `/src/components/blocks/canvas.svelte`
- Matter.js integration moet blijven werken
- WordPress ACF data moet correct worden gemapped

### 4. Forms Integration
- Contact forms blijven AWS SES gebruiken
- Notion integration blijft werken
- Alleen data source verandert naar WordPress

---

## 🔄 Rollback Plan

Als je terug wilt naar Storyblok:

```bash
# 1. Herstel oude content.ts
mv src/lib/content.storyblok.bak src/lib/content.ts

# 2. Verwijder WordPress files
rm src/lib/wordpress.ts
rm src/lib/types/wordpress.d.ts

# 3. Update .env
# Commentaar VITE_WORDPRESS_API_URL
# Uncomment PUBLIC_STORYBLOK_TOKEN

# 4. Commit en push
git add .
git commit -m "Rollback to Storyblok"
git push
```

---

## 💡 Tips

### Development Workflow

1. **WordPress eerst**
   - Maak content in WordPress
   - Test API endpoints in browser
   - Dan pas SvelteKit starten

2. **Incremental Testing**
   - Test 1 post type tegelijk
   - Test 1 block tegelijk
   - Fix errors voordat je verder gaat

3. **Use Browser DevTools**
   - Network tab: check API calls
   - Console: check voor errors
   - React DevTools: inspect component state

### WordPress Content Strategie

1. **Start Simple**
   - Begin met 1-2 pages
   - Voeg geleidelijk meer content toe
   - Test elke stap

2. **Block Priorities**
   - Essentieel: Hero, Text, Image, Two Columns
   - Belangrijk: Blog List, Projects, Team
   - Later: Physics, Canvas, Advanced blocks

3. **ACF Configuration**
   - Export field groups als JSON
   - Version control in `/acf-json/`
   - Makkelijk deployen naar productie

---

## 📞 Hulp Nodig?

Check deze resources:
- `WORDPRESS_MIGRATIE_PLAN.md` - Complete migration guide
- `QUICK_START_WORDPRESS.md` - 3-day quick start
- `MIGRATIE_CHECKLIST.md` - Detailed checklist
- `wordpress-integration-example.php` - WordPress setup code

---

## 🎯 Current Status: **FOUNDATION COMPLETE** ✅

De basis WordPress integratie is klaar. Nu is het aan jou om:
1. WordPress te configureren met je content
2. ACF field groups aan te maken
3. Te testen of alles werkt

**Volgende stap:** Test de WordPress verbinding en maak je eerste content!
