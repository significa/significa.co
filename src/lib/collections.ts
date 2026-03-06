import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * Get all projects, sorted by date descending.
 */
export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get all blog posts, sorted by date descending.
 */
export async function getPosts() {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get all playground entries, sorted by date descending.
 */
export async function getPlayground() {
  const playground = await getCollection("playground");
  return playground.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get all clients, sorted by order ascending.
 */
export async function getClients() {
  const clients = await getCollection("clients");
  return clients.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get all testimonials, sorted by order ascending.
 */
export async function getTestimonials() {
  const testimonials = await getCollection("testimonials");
  return testimonials.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get homepage highlights with their referenced entries resolved.
 * Returns entries sorted by order, with the full referenced content entry attached.
 */
export async function getResolvedHighlights() {
  const allHighlights = await getCollection("highlights");
  const sorted = allHighlights.sort((a, b) => a.data.order - b.data.order);

  const resolved = await Promise.all(
    sorted.map(async (h) => {
      const entry = await getEntry(h.data.source.collection, h.data.source.entry.id);
      return {
        label: h.data.label,
        collection: h.data.source.collection,
        entry,
      };
    })
  );

  return resolved;
}

/**
 * Get awards for a specific project by its id.
 * Returns awards sorted by order.
 */
export async function getAwardsForProject(projectId: string) {
  const allAwards = await getCollection("awards");
  return allAwards.filter((a) => a.data.project.id === projectId).sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get all awards with their referenced projects resolved.
 * Returns awards sorted by order, with the full project entry attached.
 */
export async function getAwards() {
  const allAwards = await getCollection("awards");
  const sorted = allAwards.sort((a, b) => a.data.order - b.data.order);

  const resolved = await Promise.all(
    sorted.map(async (a) => {
      const project = await getEntry("projects", a.data.project.id);
      return {
        award: a.data.award,
        year: a.data.year,
        url: a.data.url,
        project,
      };
    })
  );

  return resolved;
}

// ============================================================
// Handbook helpers
// ============================================================

export type HandbookEntry = CollectionEntry<"handbook">;
export type HandbookGroupEntry = CollectionEntry<"handbook-groups">;

/**
 * Get all handbook groups, sorted by order ascending.
 */
export async function getHandbookGroups() {
  const groups = await getCollection("handbook-groups");
  return groups.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get all handbook pages, sorted by order ascending within each group.
 */
export async function getHandbookPages() {
  const pages = await getCollection("handbook");
  return pages.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get only top-level handbook pages (no "/" in their id).
 * These are the pages shown directly under groups on the index.
 */
export async function getTopLevelHandbookPages() {
  const pages = await getHandbookPages();
  return pages.filter((p) => !p.id.includes("/"));
}

/**
 * Get child pages of a given parent handbook page.
 * Children are pages whose id starts with `parentId + "/"`.
 */
export async function getHandbookChildren(parentId: string) {
  const pages = await getHandbookPages();
  const prefix = parentId + "/";
  // Only direct children — one level deep (no nested slashes after the prefix)
  return pages.filter((p) => {
    if (!p.id.startsWith(prefix)) return false;
    const remainder = p.id.slice(prefix.length);
    return !remainder.includes("/");
  });
}

/**
 * Get the parent page of a handbook entry, if it has one.
 * Returns null for top-level pages.
 */
export async function getHandbookParent(entry: HandbookEntry) {
  const parts = entry.id.split("/");
  if (parts.length < 2) return null;
  const parentId = parts.slice(0, -1).join("/");
  const pages = await getHandbookPages();
  return pages.find((p) => p.id === parentId) ?? null;
}

/**
 * Build the breadcrumb trail for a handbook page.
 * Returns entries from root to the current page (exclusive).
 */
export async function getHandbookBreadcrumbs(entry: HandbookEntry) {
  const parts = entry.id.split("/");
  if (parts.length < 2) return [];

  const pages = await getHandbookPages();
  const breadcrumbs: HandbookEntry[] = [];

  for (let i = 1; i < parts.length; i++) {
    const ancestorId = parts.slice(0, i).join("/");
    const ancestor = pages.find((p) => p.id === ancestorId);
    if (ancestor) breadcrumbs.push(ancestor);
  }

  return breadcrumbs;
}

/**
 * Get the full grouped handbook structure for the index page.
 * Returns groups in order, each with their top-level pages.
 * Pages with children have a `children` array attached.
 */
export async function getHandbookIndex() {
  const [groups, allPages] = await Promise.all([getHandbookGroups(), getHandbookPages()]);

  const topLevel = allPages.filter((p) => !p.id.includes("/"));

  return groups.map((group) => {
    const pages = topLevel
      .filter((p) => p.data.group.id === group.id)
      .map((page) => {
        const prefix = page.id + "/";
        const children = allPages.filter((p) => {
          if (!p.id.startsWith(prefix)) return false;
          return !p.id.slice(prefix.length).includes("/");
        });
        return { page, children };
      });

    return { group, pages };
  });
}
