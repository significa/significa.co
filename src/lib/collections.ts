import { getCollection } from "astro:content";

/**
 * Get all published projects (non-draft), sorted by date descending.
 */
export async function getPublishedProjects() {
  const projects = await getCollection(
    "projects",
    ({ data }) => !data.draft
  );
  return projects.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

/**
 * Get all published blog posts (non-draft), sorted by date descending.
 */
export async function getPublishedPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

/**
 * Get all published labs entries (non-draft), sorted by date descending.
 */
export async function getPublishedLabs() {
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  return labs.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}
