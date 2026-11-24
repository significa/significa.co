# Structured data (JSON-LD)

Every page renders exactly one `<script type="application/ld+json">` with a `@graph`, server-side, from `src/components/seo.svelte`. The graph is built in code from Storyblok data. The `structure_data_markup` field in Storyblok is optional and only adds extras.

## Files

| File                | What it does                                                                         |
| ------------------- | ------------------------------------------------------------------------------------ |
| `constants.ts`      | Site URL, language, node ids, Organization fallback, service landing page slugs.     |
| `urls.ts`           | Canonical URLs (`https://significa.co/<path>`, no query, no trailing slash) and ids. |
| `content.ts`        | Images from Storyblok assets, rich text to plain text, dates.                        |
| `from-storyblok.ts` | The only file that knows CMS field names: maps each story to schema input.           |
| `builders/*.ts`     | One function per schema type. Pure, typed with `schema-dts`.                         |
| `manual.ts`         | Parses and filters the manual field.                                                 |
| `graph.ts`          | Assembles the page graph, merges manual extras, drops duplicates and dangling refs.  |
| `serialize.ts`      | `JSON.stringify` with `<`, `>`, `&` escaped so content cannot close the script tag.  |
| `validate.ts`       | Graph invariants. Used by the tests and logged as a warning in `npm run dev`.        |

## Ids

- `https://significa.co/#organization`, `https://significa.co/#website`, `https://significa.co/#logo`
- `<canonical url>#webpage`, `#breadcrumb`, `#primaryimage`, `#article`, `#person`, `#project`, `#service`, `#faq`, `#itemlist`

The canonical URL is always built on `https://significa.co`, also on staging and locally, and matches `<link rel="canonical">` and `og:url`. A `seo_canonical_url` set in Storyblok wins.

## What each template generates

Every page gets `Organization`, the logo `ImageObject`, `WebSite` and a `WebPage` (`name` = `<title>`, `description` = meta description, `inLanguage`, `isPartOf`, `datePublished` / `dateModified` from the story). Every page except the home gets a `BreadcrumbList`. Pages with a main image get a `#primaryimage` `ImageObject`.

| Page                                 | Content type   | Extra nodes                                                                  |
| ------------------------------------ | -------------- | ---------------------------------------------------------------------------- |
| Home (`home`)                        | `page`         | WebPage `about` and `mainEntity` → Organization                              |
| `/about`, `/get-a-quote`             | `page`         | `AboutPage`, `ContactPage`                                                   |
| Blog post (`/blog/*`)                | `blog-post`    | `BlogPosting`                                                                |
| Team member (`/about/*`)             | `team-member`  | `ProfilePage` with the `Person` nested in `mainEntity` (Google profile page) |
| Project (`/projects/*`)              | `project`      | `CreativeWork`                                                               |
| `/blog`, `/projects`, `/handbook`    | `page`, code   | `CollectionPage` + `ItemList` of the items shown on first load               |
| Industry / deliverable landing pages | `landing-page` | `Service` (slugs in `SERVICE_LANDING_PAGE_SLUGS`)                            |
| Other landing pages (`/b-corp`)      | `landing-page` | WebPage only                                                                 |
| Handbook pages                       | `handbook`     | `Article` (author and publisher: Significa)                                  |
| Careers, legal, etc.                 | various        | WebPage only                                                                 |
| Error pages, proposals               | n/a            | Organization, logo and WebSite only                                          |

Any page with a visible `faqs` block also gets a `FAQPage` generated from that block.

## Where each field comes from

| Property                                                                                                     | Source                                                                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Organization `name`, `url`, `description`, `foundingDate`, `logo`, `email`, `telephone`, `address`, `sameAs` | `configuration` story fields `org_*` if present, else `ORGANIZATION_FALLBACK` (confirmed with the team) |
| Organization `contactPoint`                                                                                  | Sales contact from `email` and `telephone`                                                              |
| Organization `hasCredential`, `memberOf`                                                                     | `ORGANIZATION_FALLBACK`: B Corp and 1% for the Planet, both shown on the site                           |
| `WebPage.name` / `description`                                                                               | Same values as `<title>` and `<meta name="description">`                                                |
| `datePublished` / `dateModified`                                                                             | `first_published_at` / `published_at` (handbook: `content.last_updated`)                                |
| `BlogPosting.headline`                                                                                       | Story name (the H1)                                                                                     |
| `BlogPosting.author`                                                                                         | `authors` (team members, linked to `/about/<slug>#person`) and `external_authors`; Organization if none |
| `BlogPosting.keywords`                                                                                       | Story tags                                                                                              |
| `BlogPosting.image`, `Article.image`                                                                         | `cover` (else `seo_og_image`) plus 16:9, 4:3 and 1:1 Storyblok crops at 1200px wide                     |
| `BlogPosting.timeRequired`, `wordCount`                                                                      | `reading_time`, words in the body                                                                       |
| `CreativeWork.image`                                                                                         | `cover`, else `seo_og_image`                                                                            |
| `CreativeWork.award`                                                                                         | Recognition entries for the project (shown on the project page)                                         |
| `Person.jobTitle`, `description`, `image`                                                                    | `position`, `bio`, `photo`                                                                              |
| `Person.worksFor`                                                                                            | Only when `is_active` is true                                                                           |
| `Person.sameAs`                                                                                              | `links` and URL `buttons` on known profile hosts (`PROFILE_HOSTS`)                                      |
| `CreativeWork.sourceOrganization`                                                                            | `client`                                                                                                |
| `CreativeWork.keywords`                                                                                      | `services` and `deliverables`                                                                           |
| `CreativeWork.contributor`                                                                                   | `team`                                                                                                  |
| `Service.name` / `description`                                                                               | Story name / `seo_description`, enriched by a manual `Service` if present                               |
| `Service.audience` / `serviceType`                                                                           | The page name, for industry / deliverable landing pages                                                 |
| `FAQPage`                                                                                                    | `faqs` blocks (question + answer as plain text)                                                         |

Properties without data are omitted. Nothing is invented: no ratings, reviews, awards or dates that are not in the CMS.

## The manual field (`structure_data_markup`)

Accepted node types: `FAQPage`, `HowTo`, `Service`, `ItemList`. They are merged into the same `@graph`.

Everything else is ignored (Organization, WebSite, WebPage, BreadcrumbList, BlogPosting, Article, Person, CreativeWork, ...). The code is the only source for those types.

Rules applied to accepted nodes:

1. `@context` is removed and `@id` is rewritten to `<canonical url>#<fragment>`.
2. An inline Significa Organization or WebSite (by name, or by url or `@id` on the Significa host) becomes a reference to its `@id`. References between manual nodes follow their rewritten ids. Site URLs become canonical; external URLs keep their query string and only lose tracking parameters. Known references (`#organization`, `#website`, `#webpage`, `#homepage`) are mapped to the generated ids; references to nodes that do not exist are removed.
3. Never two nodes with the same `@id` or of the same main type. On a service landing page the manual `Service` enriches the generated one (code keeps `@id`, `url` and `provider`). A manual `ItemList` is ignored on collection pages.
4. `FAQPage`: if the page has a `faqs` block, the generated FAQPage wins. Otherwise a manual FAQPage is accepted only if every question and every answer appears in the text the template renders (only the fields each template shows are checked). FAQs must always be visible on the page; do not add FAQ schema for content that is not shown.
5. Invalid JSON is ignored and logged as a server warning; the page still renders.

`docs/seo/jsonld-field-audit.md` lists what each story has in the field today (`npm run seo:audit` regenerates it).

## Proposed Organization fields in Storyblok

Not created yet. When approved, add an "Organization" tab to the `configuration` content type with: `org_name`, `org_url`, `org_description`, `org_founding_date`, `org_email`, `org_telephone` (text), `org_logo` (asset), `org_street_address`, `org_address_locality`, `org_postal_code`, `org_address_country` (text) and `org_same_as` (blocks or a list of links with a `url`). `organizationFromConfiguration` already reads them and falls back to the constants per field.

## Adding a new type

1. Add a builder in `builders/` returning a `schema-dts` type.
2. Add a variant to `SchemaEntity` in `types.ts` and handle it in `buildMainNode` in `graph.ts` (the `never` check fails the build until you do).
3. Map the story to the new variant in `from-storyblok.ts`.
4. Add a fixture and a case to `graph.test.ts` and `src/components/seo.test.ts`.

New service landing page in Storyblok? Add its slug to `INDUSTRY_LANDING_PAGE_SLUGS` or `DELIVERABLE_LANDING_PAGE_SLUGS`.

## Validation

Before releasing schema changes, paste a page's JSON-LD (or the preview URL) into the [Schema Markup Validator](https://validator.schema.org/) and the [Rich Results Test](https://search.google.com/test/rich-results). Google only recognises a `ProfilePage` when the `Person` is nested in `mainEntity`, which is why that page type nests it.
