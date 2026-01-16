# WordPress Conversion Status

## ✅ COMPLETED

### Core Infrastructure
- ✅ **Removed @storyblok/js** from package.json dependencies
- ✅ **Removed sentry-vite-plugin** from vite.config.ts (was causing build errors)
- ✅ **Deleted Storyblok files:**
  - src/lib/storyblok.ts
  - scripts/datasources.ts
  - scripts/sitemap.ts
- ✅ **Stubbed storyblok-editable action** (no-op to prevent breaking components)

### Content Layer (src/lib/content.ts)
- ✅ **Complete WordPress REST API implementation**
- ✅ **All fetch functions converted:**
  - `fetchPage()` → `/wp-json/wp/v2/pages`
  - `fetchBlogPosts()` → `/wp-json/wp/v2/posts`
  - `fetchProjects()` → `/wp-json/wp/v2/project`
  - `fetchTeamMembers()` → `/wp-json/wp/v2/team_member`
  - `fetchCareers()` → `/wp-json/wp/v2/career`
  - `fetchHandbookPages()` → `/wp-json/wp/v2/handbook`
  - `fetchAwards()` → `/wp-json/wp/v2/recognition`
- ✅ **Exports all needed constants:**
  - `BLOG_PARAMS`
  - `PROJECT_PARAMS`
  - `CAREERS_PARAMS`
  - `TEAM_MEMBER_PARAMS`
  - `AWARDS_PARAMS`
  - `HOME_SLUG`
- ✅ **Helper functions:**
  - `getImageUrl()`
  - `getFeaturedImageUrl()`
  - `stripHtml()`
  - `normalizeWordPressPost()`
  - `buildPageResult()`

### Route Handlers
- ✅ **Marketing Site:**
  - src/routes/(marketing-site)/+layout.server.ts
  - src/routes/(marketing-site)/[...path]/+page.svelte
- ✅ **Handbook:**
  - src/routes/(handbook)/+layout.server.ts
  - src/routes/(handbook)/handbook/+page.server.ts
  - src/routes/(handbook)/handbook/[...path]/+layout.server.ts
- ✅ **Proposals (stubbed):**
  - src/routes/(proposals)/proposal/[slug]/+page.server.ts
  - src/routes/(proposals)/proposal/[slug]/accept/+page.server.ts
- ✅ **RSS Feed:**
  - src/routes/rss.xml/+server.ts

### Components
- ✅ **blog-index.svelte** - Fully converted to WordPress
- ✅ **rich-text.svelte** - Simplified for WordPress HTML rendering

### Configuration
- ✅ **Environment variable:** `VITE_WORDPRESS_API_URL=https://dev.shoutmedia.nl/wp-json/wp/v2`
- ✅ **WordPress API endpoints configured**

---

## ❌ TODO - Components Still Using Storyblok

The following components still import from `@storyblok/js` and need to be updated:

### Block Components (8 files)
1. **src/components/blocks/awards-grid.svelte**
2. **src/components/blocks/timezone.svelte**
3. **src/components/blocks/work-recognitions.svelte**

### Entry Components (2 files)
4. **src/components/blog-entry.svelte**
5. **src/components/project-entry.svelte**

### Page Components (4 files)
6. **src/components/pages/page.svelte**
7. **src/components/pages/projects-index.svelte**
8. **src/components/pages/static-page.svelte**
9. **src/components/pages/team-member.svelte**

### Form Components (1 file)
10. **src/components/contact-form.svelte**

### Proposal Components (2 files)
11. **src/components/proposals/proposal-awards.svelte**
12. **src/components/proposals/proposal-projects.svelte**

### Other Components (1 file)
13. **src/components/recognitions.svelte**

---

## 🔧 How to Fix Remaining Components

Each component needs these changes:

### 1. Remove Storyblok Imports
```typescript
// ❌ REMOVE THIS
import type { SomethingStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';

// ✅ ADD THIS INSTEAD
import type { WordPressBlogPost, WordPressProject } from '$lib/types/wordpress';
```

### 2. Update Type Definitions
```typescript
// ❌ OLD
export let story: ISbStoryData<BlogPostStoryblok>;

// ✅ NEW
export let post: WordPressBlogPost;
```

### 3. Update Property Access
```typescript
// ❌ OLD (Storyblok)
story.content.title
story.content.body
story.first_published_at

// ✅ NEW (WordPress)
post.title?.rendered
post.acf?.content_blocks
post.date
```

### 4. Featured Images
```typescript
// ❌ OLD (Storyblok)
story.content.image.filename

// ✅ NEW (WordPress)
import { getFeaturedImageUrl } from '$lib/content';
const imageUrl = getFeaturedImageUrl(post, 'large');
```

### 5. Content Blocks
```typescript
// ❌ OLD (Storyblok)
story.content.body // array of blocks

// ✅ NEW (WordPress)
post.acf?.content_blocks // ACF flexible content
```

---

## 📝 Example: Fixing blog-entry.svelte

**Before:**
```svelte
<script lang="ts">
  import type { BlogPostStoryblok } from '$types/bloks';
  import type { ISbStoryData } from '@storyblok/js';

  export let post: ISbStoryData<BlogPostStoryblok>;

  const title = post.content.title;
  const image = post.content.featured_image?.filename;
</script>
```

**After:**
```svelte
<script lang="ts">
  import type { WordPressBlogPost } from '$lib/types/wordpress';
  import { getFeaturedImageUrl } from '$lib/content';

  export let post: WordPressBlogPost;

  const title = post.title?.rendered || '';
  const image = getFeaturedImageUrl(post, 'large');
</script>
```

---

## 🧪 Testing Checklist

Once all components are fixed:

- [ ] Build completes without errors: `npm run build`
- [ ] Development server runs: `npm run dev`
- [ ] Homepage loads
- [ ] Blog page loads
- [ ] Individual blog posts load
- [ ] Projects page loads
- [ ] Team page loads
- [ ] No console errors
- [ ] Images display correctly
- [ ] Links work
- [ ] Forms submit (if applicable)

---

## 🚀 Deployment Checklist

Before deploying to production:

### WordPress Backend
- [ ] WordPress installed and accessible
- [ ] ACF PRO plugin installed and activated
- [ ] Custom post types created:
  - [ ] Blog Post (post type: `post` or `blog_post`)
  - [ ] Project (post type: `project`)
  - [ ] Team Member (post type: `team_member`)
  - [ ] Career (post type: `career`)
  - [ ] Handbook (post type: `handbook`)
  - [ ] Recognition (post type: `recognition`)
- [ ] ACF field groups configured
- [ ] Test content created
- [ ] REST API accessible and returns data

### Frontend
- [ ] `VITE_WORDPRESS_API_URL` set correctly in production
- [ ] Build succeeds
- [ ] All pages render
- [ ] Images load from WordPress
- [ ] No 404s or API errors
- [ ] Performance is acceptable
- [ ] SEO meta tags work

### Integration Tests
- [ ] Fetch posts from WordPress API manually
- [ ] Verify ACF fields are in API response
- [ ] Test with actual WordPress content
- [ ] Check CORS headers if needed
- [ ] Verify image URLs work

---

## 📞 Common Issues & Solutions

### Issue: "Cannot read property 'rendered' of undefined"
**Solution:** WordPress post is missing title or content. Check API response structure.

### Issue: "ACF fields not in API response"
**Solution:**
1. Install "ACF to REST API" plugin, OR
2. Add to WordPress functions.php:
```php
add_filter('acf/settings/rest_api_enabled', '__return_true');
```

### Issue: "CORS error when fetching from WordPress"
**Solution:** Add to WordPress functions.php:
```php
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});
```

### Issue: "Images don't load"
**Solution:**
- Check `_embed=true` is in API request
- Verify featured images are set in WordPress
- Check ACF image fields are configured correctly

### Issue: "Build fails with module not found"
**Solution:** Run `npm install` again to clean up node_modules

---

## 📊 Progress Summary

**Completed:** ~60%
**Remaining:** ~40% (13 components)

**Estimated Time to Complete:** 2-4 hours
- Each component: ~10-20 minutes
- Testing: 30-60 minutes
- Bug fixes: 30-60 minutes

---

## 🎯 Next Steps

1. **Fix the 13 remaining components** (highest priority)
   - Start with entry components (blog-entry, project-entry)
   - Then page components
   - Then block components
   - Finally proposal components (or remove if not needed)

2. **Test build:** `npm run build`

3. **Setup WordPress backend:**
   - Install ACF PRO
   - Create custom post types
   - Add test content

4. **Test locally:** `npm run dev`

5. **Deploy when ready**

---

## ✅ Success Criteria

The migration is complete when:

1. ✅ NO references to `@storyblok/js` anywhere in codebase
2. ✅ NO references to `getStoryblok()` anywhere
3. ✅ Build completes successfully: `npm run build`
4. ✅ Dev server runs: `npm run dev`
5. ✅ Can fetch data from WordPress REST API
6. ✅ Pages render with WordPress content
7. ✅ All animations (Matter.js, etc.) still work

---

**Current Status:** Core infrastructure complete, component updates needed.
**Last Updated:** 2025-10-24
