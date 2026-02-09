# Significa Website: Documentation

Reference documentation for the Significa website project. For AI agent instructions, see `CLAUDE.md` in the project root.

| File | What it covers |
|------|---------------|
| `01-PROJECT-BOOTSTRAP.md` | Stack, commands, project structure, key principles |
| `02-CONTENT-SCHEMA.md` | Content collections, Zod schemas, relationships |
| `03-MDX-COMPONENTS.md` | Custom components for use inside MDX files |
| `04-MEDIA-ASSETS.md` | Where media lives, image handling strategy |
| `05-RULES.md` | Do's, don'ts, and common mistakes |
| `06-ASTRO-REFERENCE.md` | Astro framework deep reference (components, collections, islands, transitions) |
| `07-TEAM-DECISIONS.md` | Team discussion log and architectural decisions |

## Quick Reminders

1. **Static site.** No server, no API, no database. HTML generated at build time.
2. **Astro v6 (latest stable).** Always use latest stable to avoid near-future breaking changes.
3. **Content Collections are the database.** Use `getCollection()` and `getEntry()`. Never `import.meta.glob`.
4. **References use `reference()`.** Build-time validated cross-collection links. Broken slugs break the build, not production.
5. **Media via S3 + Bunny CDN.** Uploaded via asset manager, served from `https://significa.b-cdn.net` with Bunny Optimizer transforms.
6. **Astro components first.** React only for interactive islands.
7. **When unsure, read the Astro docs.** Do not guess. https://docs.astro.build
