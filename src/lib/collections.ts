import { getCollection, getEntry } from "astro:content";

/**
 * Get all published projects (non-draft), sorted by date descending.
 */
export async function getPublishedProjects() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get all published blog posts (non-draft), sorted by date descending.
 */
export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get all published labs entries (non-draft), sorted by date descending.
 */
export async function getPublishedLabs() {
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  return labs.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
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
