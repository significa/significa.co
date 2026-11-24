import { serveMarkdownTwin } from '$lib/markdown/handle';
import type { RequestHandler } from './$types';

/**
 * The handbook index twin needs its own route in the handbook group.
 *
 * On Vercel each group of routes with the same config is its own function, and
 * a function only knows its own routes. Without this route, /handbook.md would
 * match the marketing catch-all (an ISR function), which cannot render the
 * /handbook page and returned 404. Here it runs next to that page.
 * (The markdown handle in hooks.server.ts normally answers first; this route
 * mainly makes Vercel send the request to the right function.)
 */
export const GET: RequestHandler = (event) => serveMarkdownTwin(event, '/handbook');
