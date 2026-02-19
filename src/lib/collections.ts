import { getCollection, getEntry } from "astro:content";

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
 * Get all labs entries, sorted by date descending.
 */
export async function getLabs() {
  const labs = await getCollection("labs");
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
