# Significa Website — AI Assistant Instructions

Read these files **in order** before writing any code.

| File | What it covers |
|------|---------------|
| `01-PROJECT-BOOTSTRAP.md` | Stack, init commands, project structure, key principles |
| `02-CONTENT-SCHEMA.md` | Content collections, Zod schemas, how relationships work |
| `03-MDX-COMPONENTS.md` | Custom components for use inside MDX files |
| `04-MEDIA-ASSETS.md` | Where media lives (not in git), CDN setup |
| `05-RULES.md` | Do's, don'ts, and common mistakes |
| `06-EXAMPLES.md` | Copy-paste reference for each content type |

## Critical Reminders

1. **This is a static site.** No server, no API, no database. Just HTML generated at build time.
2. **When unsure, read the Astro docs.** Do not guess. https://docs.astro.build
3. **Relationships are slug strings.** Resolve them with `getEntry()` at build time.
4. **Media is external.** Images and videos live on a CDN, never in git.
5. **Astro components first.** React only for interactive islands.
