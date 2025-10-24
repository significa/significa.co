# WordPress Migratie Checklist

## 📋 Pre-Migration Checklist

### Voorbereiding
- [ ] Maak backup van huidige Storyblok content
- [ ] Export alle assets (afbeeldingen, video's, documenten)
- [ ] Documenteer alle custom functionaliteit
- [ ] Maak lijst van alle gebruikte animaties
- [ ] Inventariseer alle formulieren en integraties
- [ ] Check welke third-party services gebruikt worden (AWS, Notion, etc.)

### WordPress Licenties & Accounts
- [ ] Koop ACF PRO licentie ($49 of $249)
- [ ] Kies WordPress hosting provider
- [ ] Maak hosting account aan
- [ ] Registreer domeinnaam (indien nodig)

---

## 🔧 Week 1: WordPress Setup

### WordPress Installatie
- [ ] Installeer WordPress (vers 6.0+)
- [ ] Configureer permalink structuur (Settings → Permalinks → Post name)
- [ ] Stel timezone in (Settings → General)
- [ ] Configureer media settings (Settings → Media)
- [ ] Maak admin gebruiker aan met sterk wachtwoord

### Plugins Installeren
- [ ] Installeer Advanced Custom Fields PRO
- [ ] Installeer ACF to REST API (of WPGraphQL + WPGraphQL for ACF)
- [ ] Installeer Yoast SEO
- [ ] Installeer Custom Post Type UI (optioneel)
- [ ] Installeer Enable Media Replace
- [ ] Installeer WP Migrate DB (voor database sync)
- [ ] Installeer Query Monitor (voor debugging)

### Basis Configuratie
- [ ] Activeer alle plugins
- [ ] Test of REST API werkt: `/wp-json/wp/v2`
- [ ] Configureer permalinks voor custom post types
- [ ] Maak site instellingen pagina (ACF Options)

---

## 📝 Week 2: Custom Post Types

### Post Types Aanmaken
- [ ] Maak 'Blog Post' custom post type
- [ ] Maak 'Project' custom post type
- [ ] Maak 'Team Member' custom post type
- [ ] Maak 'Career' custom post type
- [ ] Maak 'Handbook' custom post type (hierarchical)
- [ ] Maak 'Landing Page' custom post type
- [ ] Maak 'Recognition' custom post type

### Taxonomies Aanmaken
- [ ] Maak 'Project Tag' taxonomy
- [ ] Maak 'Blog Category' taxonomy
- [ ] Maak 'Blog Tag' taxonomy

### REST API Verificatie
- [ ] Test `/wp-json/wp/v2/blog_post`
- [ ] Test `/wp-json/wp/v2/project`
- [ ] Test `/wp-json/wp/v2/team_member`
- [ ] Test `/wp-json/wp/v2/career`
- [ ] Test `/wp-json/wp/v2/handbook`
- [ ] Test `/wp-json/wp/v2/landing_page`
- [ ] Test `/wp-json/wp/v2/recognition`

---

## 🎨 Week 3-4: ACF Field Groups

### Basis Fields (voor alle post types)
- [ ] SEO Title field
- [ ] SEO Description field
- [ ] OG Image field
- [ ] Hide from listings (true/false)

### Page Fields
- [ ] Content Blocks (flexible content) - basisconfiguratie

### Blog Post Fields
- [ ] Author (relationship → team_member)
- [ ] Published Date
- [ ] Categories
- [ ] Tags
- [ ] Content Blocks

### Project Fields
- [ ] Client Name
- [ ] Project URL
- [ ] Team Members (relationship)
- [ ] Project Tags
- [ ] Content Blocks

### Team Member Fields
- [ ] Role
- [ ] Bio
- [ ] Photo
- [ ] Email
- [ ] LinkedIn
- [ ] Twitter
- [ ] GitHub
- [ ] Website
- [ ] Order (number)
- [ ] Is Active (true/false)
- [ ] Content Blocks

### Career Fields
- [ ] Job Description
- [ ] Requirements
- [ ] Location
- [ ] Employment Type
- [ ] Salary Range
- [ ] Application Deadline
- [ ] Is Active
- [ ] Content Blocks

### Handbook Fields
- [ ] Parent Page (relationship)
- [ ] Order
- [ ] Icon
- [ ] Content Blocks

### Landing Page Fields
- [ ] Hide Header
- [ ] Hide Footer
- [ ] Custom CSS
- [ ] Content Blocks

### Recognition Fields
- [ ] Award Name
- [ ] Award Category
- [ ] Date
- [ ] Description
- [ ] Logo
- [ ] URL
- [ ] Project (relationship)
- [ ] Order

---

## 🧱 Week 3-4: Content Blokken (Flexible Content)

### Layout Blokken (7)
- [ ] 1. Hero
- [ ] 2. Box
- [ ] 3. Two Columns
- [ ] 4. Image
- [ ] 5. Image Grid
- [ ] 6. List
- [ ] 7. Table

### Content Blokken (7)
- [ ] 8. Blog List
- [ ] 9. Projects (Grid)
- [ ] 10. Projects Two Columns
- [ ] 11. About Grid
- [ ] 12. Awards Grid
- [ ] 13. Awards List
- [ ] 14. Clients

### Form Blokken (3)
- [ ] 15. Contact Us Form
- [ ] 16. Prefooter Form
- [ ] 17. Form Budget Range

### Interactieve Blokken (7)
- [ ] 18. Physics
- [ ] 19. Canvas
- [ ] 20. Draw SEGG
- [ ] 21. Estimation Tool
- [ ] 22. FAQs List
- [ ] 23. Comparison Table
- [ ] 24. Slideshow

### Speciale Blokken (7)
- [ ] 25. Timeline
- [ ] 26. Timeline Services
- [ ] 27. Steps
- [ ] 28. Services
- [ ] 29. Packages
- [ ] 30. Timezone Display
- [ ] 31. Measurements

### Rich Text Blokken (3)
- [ ] 32. Richtext Box
- [ ] 33. Richtext Testimonial
- [ ] 34. Richtext Code Block

### UI Element Blokken (6)
- [ ] 35. CTA Card
- [ ] 36. Open Positions
- [ ] 37. Office Cards
- [ ] 38. Careers List
- [ ] 39. Slogan
- [ ] 40. Testimonials

### Extra Blokken (6)
- [ ] 41. Video
- [ ] 42. Spacer
- [ ] 43. Divider
- [ ] 44. Button Group
- [ ] 45. Embed / HTML
- [ ] 46. Social Links

### ACF Export
- [ ] Export alle field groups als JSON
- [ ] Bewaar backup in version control
- [ ] Test import op staging environment

---

## 💻 Week 5: SvelteKit Code Aanpassingen

### API Client Setup
- [ ] Maak `/src/lib/wordpress.ts`
- [ ] Maak `/src/lib/types/wordpress.d.ts`
- [ ] Configureer environment variables
- [ ] Test API connectie

### Content Fetching
- [ ] Implementeer `fetchPage()`
- [ ] Implementeer `fetchBlogPosts()`
- [ ] Implementeer `fetchBlogPost()`
- [ ] Implementeer `fetchProjects()`
- [ ] Implementeer `fetchProject()`
- [ ] Implementeer `fetchTeamMembers()`
- [ ] Implementeer `fetchTeamMember()`
- [ ] Implementeer `fetchCareers()`
- [ ] Implementeer `fetchCareer()`
- [ ] Implementeer `fetchAwards()`

### Route Updates
- [ ] Update `[...path]/+page.server.ts`
- [ ] Update blog routes
- [ ] Update project routes
- [ ] Update team routes
- [ ] Update career routes
- [ ] Update handbook routes

### Component Updates
- [ ] Update `dynamic-block.svelte`
- [ ] Update `dynamic-page.svelte`
- [ ] Map alle 46 blokken naar components

---

## 🎨 Week 5-6: Block Components Update

### Layout Components (7)
- [ ] Update `hero.svelte`
- [ ] Update `box.svelte`
- [ ] Update `two-columns.svelte`
- [ ] Update `image.svelte`
- [ ] Update `image-grid.svelte`
- [ ] Update `list.svelte`
- [ ] Update `table.svelte`

### Content Components (7)
- [ ] Update `blog-list.svelte`
- [ ] Update `projects.svelte`
- [ ] Update `projects-two-columns.svelte`
- [ ] Update `about-grid.svelte`
- [ ] Update `awards-grid.svelte`
- [ ] Update `awards-list.svelte`
- [ ] Update `clients.svelte`

### Form Components (3)
- [ ] Update `contact-us-form.svelte`
- [ ] Update `prefooter-form.svelte`
- [ ] Update `form-budget-range.svelte`

### Interactive Components (7)
- [ ] Update `physics.svelte` (Matter.js integratie)
- [ ] Update `canvas.svelte`
- [ ] Update `draw-segg.svelte`
- [ ] Update `estimation.svelte`
- [ ] Update `faqs-list.svelte`
- [ ] Update `comparison.svelte`
- [ ] Update `slideshow.svelte`

### Special Components (7)
- [ ] Update `timeline.svelte`
- [ ] Update `timeline-services.svelte`
- [ ] Update `steps.svelte`
- [ ] Update `services.svelte`
- [ ] Update `packages.svelte`
- [ ] Update `timezone.svelte`
- [ ] Update `measurements.svelte`

### Rich Text Components (3)
- [ ] Update `richtext-box.svelte`
- [ ] Update `richtext-testimonial.svelte`
- [ ] Update `richtext-code-block.svelte`

### UI Element Components (6)
- [ ] Update `cta-card.svelte`
- [ ] Update `open-positions.svelte`
- [ ] Update `office-cards.svelte`
- [ ] Update `careers-list.svelte`
- [ ] Update `slogan.svelte`
- [ ] Update `testimonials.svelte`

### Extra Components (6)
- [ ] Update `video.svelte`
- [ ] Update `spacer.svelte`
- [ ] Update `divider.svelte`
- [ ] Update `button-group.svelte`
- [ ] Update `embed-html.svelte`
- [ ] Update `social-links.svelte`

---

## 📦 Week 6: Content Migratie

### Storyblok Export
- [ ] Run export script
- [ ] Download alle assets
- [ ] Verifieer export completeness
- [ ] Maak backup van export

### WordPress Import - Pages
- [ ] Importeer homepage
- [ ] Importeer about pagina
- [ ] Importeer contact pagina
- [ ] Importeer andere standaard paginas
- [ ] Check alle blokken per pagina

### WordPress Import - Blog Posts
- [ ] Importeer blog posts
- [ ] Upload featured images
- [ ] Link authors (team members)
- [ ] Set categories & tags
- [ ] Check publicatiedatums

### WordPress Import - Projects
- [ ] Importeer projecten
- [ ] Upload project images
- [ ] Link team members
- [ ] Set project tags
- [ ] Verifieer project URLs

### WordPress Import - Team Members
- [ ] Importeer team leden
- [ ] Upload foto's
- [ ] Set social media links
- [ ] Set order/volgorde
- [ ] Mark actieve leden

### WordPress Import - Careers
- [ ] Importeer vacatures
- [ ] Check actieve status
- [ ] Set deadline dates
- [ ] Verifieer content

### WordPress Import - Handbook
- [ ] Importeer handbook pages
- [ ] Set parent/child structuur
- [ ] Set order
- [ ] Upload icons

### WordPress Import - Recognition
- [ ] Importeer awards
- [ ] Upload logos
- [ ] Link projects
- [ ] Set dates & order

### Asset Management
- [ ] Upload alle afbeeldingen
- [ ] Upload alle video's
- [ ] Upload alle documenten
- [ ] Optimaliseer afbeeldingen (compression)
- [ ] Configureer CDN (optioneel)

---

## 🧪 Week 7: Testing

### Functionaliteit Tests
- [ ] Test homepage
- [ ] Test alle standaard pagina's
- [ ] Test blog listing
- [ ] Test individuele blog posts
- [ ] Test project listing
- [ ] Test individuele projecten
- [ ] Test team page
- [ ] Test individuele team leden
- [ ] Test careers page
- [ ] Test individuele vacatures
- [ ] Test handbook navigation
- [ ] Test search functionaliteit (indien aanwezig)

### Block Tests - Layout (7)
- [ ] Test Hero block
- [ ] Test Box block
- [ ] Test Two Columns block
- [ ] Test Image block
- [ ] Test Image Grid block
- [ ] Test List block
- [ ] Test Table block

### Block Tests - Content (7)
- [ ] Test Blog List block
- [ ] Test Projects block
- [ ] Test Projects Two Columns block
- [ ] Test About Grid block
- [ ] Test Awards Grid block
- [ ] Test Awards List block
- [ ] Test Clients block

### Block Tests - Forms (3)
- [ ] Test Contact Form (inclusief email verzending)
- [ ] Test Prefooter Form
- [ ] Test Budget Range slider

### Block Tests - Interactive (7)
- [ ] Test Physics block (Matter.js animatie)
- [ ] Test Canvas block (drag scroll)
- [ ] Test Draw SEGG tool
- [ ] Test Estimation calculator
- [ ] Test FAQs accordion
- [ ] Test Comparison table
- [ ] Test Slideshow carousel

### Block Tests - Special (7)
- [ ] Test Timeline
- [ ] Test Timeline Services
- [ ] Test Steps
- [ ] Test Services
- [ ] Test Packages
- [ ] Test Timezone display
- [ ] Test Measurements

### Block Tests - Rich Text (3)
- [ ] Test Richtext Box
- [ ] Test Testimonial
- [ ] Test Code Block (syntax highlighting)

### Block Tests - UI Elements (6)
- [ ] Test CTA Card
- [ ] Test Open Positions
- [ ] Test Office Cards
- [ ] Test Careers List
- [ ] Test Slogan
- [ ] Test Testimonials carousel

### Block Tests - Extra (6)
- [ ] Test Video block
- [ ] Test Spacer
- [ ] Test Divider
- [ ] Test Button Group
- [ ] Test Embed/HTML
- [ ] Test Social Links

### Animation Tests
- [ ] Test alle physics animaties
- [ ] Test canvas interactions
- [ ] Test scroll animations
- [ ] Test hover effects
- [ ] Test transitions
- [ ] Test mobile touch interactions

### Responsive Tests
- [ ] Test op desktop (1920px)
- [ ] Test op laptop (1440px)
- [ ] Test op tablet landscape (1024px)
- [ ] Test op tablet portrait (768px)
- [ ] Test op mobile (375px)
- [ ] Test op small mobile (320px)

### Browser Tests
- [ ] Test op Chrome
- [ ] Test op Firefox
- [ ] Test op Safari
- [ ] Test op Edge
- [ ] Test op mobile Safari (iOS)
- [ ] Test op Chrome mobile (Android)

### Performance Tests
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Check page load times (target: < 3s)
- [ ] Check Time to Interactive (target: < 5s)
- [ ] Check Largest Contentful Paint (target: < 2.5s)
- [ ] Check Cumulative Layout Shift (target: < 0.1)
- [ ] Check Core Web Vitals
- [ ] Test API response times

### SEO Tests
- [ ] Verifieer meta titles
- [ ] Verifieer meta descriptions
- [ ] Verifieer OG images
- [ ] Verifieer canonical URLs
- [ ] Test sitemap.xml
- [ ] Test robots.txt
- [ ] Test structured data
- [ ] Run Yoast SEO check

### Integration Tests
- [ ] Test AWS SES (email verzending)
- [ ] Test AWS S3 (file uploads)
- [ ] Test Notion integration (form submissions)
- [ ] Test PostHog analytics
- [ ] Test Sentry error tracking
- [ ] Test external API calls

### Accessibility Tests
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Check ARIA labels
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Test focus states
- [ ] Run axe DevTools audit

---

## 🚀 Week 8: Deployment

### Pre-Deployment
- [ ] Maak production database backup
- [ ] Maak file system backup
- [ ] Document alle credentials
- [ ] Prepare rollback plan

### WordPress Production Setup
- [ ] Configure production domain
- [ ] Setup SSL certificate
- [ ] Configure CDN (Cloudflare/CloudFront)
- [ ] Setup database backups (daily)
- [ ] Setup file backups (daily)
- [ ] Configure caching (Redis/Memcached)
- [ ] Install security plugins (Wordfence/Sucuri)
- [ ] Configure firewall rules

### WordPress Optimalisatie
- [ ] Install WP Rocket (caching)
- [ ] Configure object caching
- [ ] Enable GZIP compression
- [ ] Optimize database tables
- [ ] Install image optimization plugin (Imagify/ShortPixel)
- [ ] Configure lazy loading
- [ ] Minify CSS/JS

### SvelteKit Deployment
- [ ] Update environment variables in Vercel
- [ ] Configure production API URL
- [ ] Setup custom domain
- [ ] Configure build settings
- [ ] Enable edge caching
- [ ] Setup preview deployments

### DNS Configuration
- [ ] Point domain to WordPress
- [ ] Configure CDN
- [ ] Setup email DNS (if needed)
- [ ] Configure SPF/DKIM records
- [ ] Test DNS propagation

### SSL & Security
- [ ] Install SSL certificate
- [ ] Force HTTPS redirects
- [ ] Configure HSTS headers
- [ ] Setup CSP headers
- [ ] Configure CORS correctly
- [ ] Disable file editing in WordPress
- [ ] Change database prefix (if not done)
- [ ] Disable directory listing

### Monitoring Setup
- [ ] Setup uptime monitoring (UptimeRobot)
- [ ] Configure error alerts (Sentry)
- [ ] Setup performance monitoring
- [ ] Configure log aggregation
- [ ] Setup Google Analytics (if needed)
- [ ] Configure PostHog events

### Final Tests
- [ ] Test complete site in production
- [ ] Test all forms
- [ ] Test all animations
- [ ] Test mobile responsiveness
- [ ] Run final Lighthouse audit
- [ ] Test backup restoration

### Go Live
- [ ] Update DNS to point to new site
- [ ] Monitor for errors
- [ ] Check analytics tracking
- [ ] Test all integrations
- [ ] Verify email delivery
- [ ] Check search console

---

## 📚 Post-Launch

### Week 1 After Launch
- [ ] Monitor server resources
- [ ] Check error logs daily
- [ ] Monitor uptime
- [ ] Check form submissions
- [ ] Monitor API performance
- [ ] Review analytics data

### Documentation
- [ ] Document WordPress admin workflow
- [ ] Create content editor guide
- [ ] Document block usage
- [ ] Create troubleshooting guide
- [ ] Document backup procedures
- [ ] Create runbook for common issues

### Training
- [ ] Train content editors op WordPress
- [ ] Explain ACF block systeem
- [ ] Show hoe nieuwe content toe te voegen
- [ ] Explain media management
- [ ] Show preview/publish workflow

### Optimization
- [ ] Review slow queries
- [ ] Optimize images further
- [ ] Review caching effectiveness
- [ ] Analyze bundle sizes
- [ ] Check API response times
- [ ] Review Core Web Vitals

### Decommission Storyblok
- [ ] Export final backup
- [ ] Cancel subscription (or keep archive)
- [ ] Update documentation
- [ ] Remove API keys from code
- [ ] Archive old codebase

---

## 🔧 Maintenance Checklist (Ongoing)

### Weekly
- [ ] Check error logs
- [ ] Review uptime reports
- [ ] Check backup success
- [ ] Monitor disk space
- [ ] Review security logs

### Monthly
- [ ] Update WordPress core
- [ ] Update all plugins
- [ ] Update theme
- [ ] Test backups (restore test)
- [ ] Review performance metrics
- [ ] Optimize database
- [ ] Update dependencies (npm)

### Quarterly
- [ ] Security audit
- [ ] Performance review
- [ ] Content audit
- [ ] SEO review
- [ ] Accessibility audit
- [ ] Review hosting plan

---

## 🆘 Troubleshooting Checklist

### Als Content Niet Laadt
- [ ] Check WordPress REST API endpoint
- [ ] Verify CORS headers
- [ ] Check browser console voor errors
- [ ] Test API endpoint direct in browser
- [ ] Check ACF fields zijn correct configured
- [ ] Verify post is published (not draft)

### Als Blokken Niet Renderen
- [ ] Check `acf_fc_layout` naam klopt
- [ ] Verify component mapping in dynamic-block
- [ ] Check console voor React/Svelte errors
- [ ] Verify ACF field names match component props
- [ ] Check block data structure in API response

### Als Animaties Niet Werken
- [ ] Check Matter.js is loaded
- [ ] Verify canvas container exists
- [ ] Check for JavaScript errors
- [ ] Test in different browsers
- [ ] Verify viewport size calculations
- [ ] Check physics item configuration

### Als Forms Niet Werken
- [ ] Check AWS credentials
- [ ] Verify Notion API connection
- [ ] Test email delivery (SES)
- [ ] Check form validation
- [ ] Verify CORS for API calls
- [ ] Check network tab voor failed requests

---

## ✅ Launch Criteria

**Minimale vereisten voor go-live:**

- [ ] Alle pagina's laden zonder errors
- [ ] Alle 46 blokken werken correct
- [ ] Alle animaties werken (physics, canvas, etc.)
- [ ] Formulieren werken en verzenden emails
- [ ] Mobile responsive op alle devices
- [ ] Lighthouse score > 90
- [ ] Geen console errors
- [ ] SSL geconfigureerd
- [ ] Backups configured
- [ ] Monitoring actief
- [ ] Content editors getraind
- [ ] Documentatie compleet

---

## 📊 Progress Tracking

**Huidige Status:** ☐ Niet gestart

### Fase Voortgang
- [ ] Voorbereiding (0%)
- [ ] WordPress Setup (0%)
- [ ] Custom Post Types (0%)
- [ ] ACF Field Groups (0%)
- [ ] Content Blokken (0/46)
- [ ] Code Aanpassingen (0%)
- [ ] Content Migratie (0%)
- [ ] Testing (0%)
- [ ] Deployment (0%)
- [ ] Post-Launch (0%)

### Geschatte Voltooiing
**Start datum:** __________
**Verwachte launch:** __________ (6-8 weken)
**Actuele launch:** __________

---

**Succes met de migratie! 🚀**
