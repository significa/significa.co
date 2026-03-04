---
title: Hello World
date: 2024-06-01
author: Significa
thumbnail: https://assets.significa.co/website/test-TKzoOc.png
tags:
  - announcement
---

We rebuilt our website from scratch. Here's why, and what we learned along the way.

## Why rebuild?

Our old site was showing its age. Built three years ago on a different stack, it had accumulated enough tech debt that adding a new case study meant fighting the tooling instead of telling the story.

We wanted something that gets out of the way — fast builds, typed content, and a workflow where our marketing team can publish without waiting for a developer.

## The stack

We landed on Astro with MDX for content, TypeScript for safety, and Cloudflare Pages for deployment. Zero JavaScript by default. Content lives in the repo as typed files, validated at build time.

The key insight: for a studio website, content _is_ the product. Everything else should be invisible infrastructure.

## What changed

Three things we did differently this time:

1. **Content-first architecture.** We wrote the schemas before we wrote a single component. Every field, every relationship, every validation rule — defined upfront.

2. **Build-time everything.** If something can break, it breaks during the build, not in production. Our marketing team gets instant feedback when a reference is wrong or a field is missing.

3. **Progressive enhancement.** The site works without JavaScript. Interactive features are islands — hydrated only when needed, only where needed.

## What's next

This is version one. We'll be iterating on the design, adding case studies, and sharing more about our process here on the blog.

If you're curious about the technical details, keep an eye on our [Playground](/playground) — we plan to open source some of the tools we built along the way.
