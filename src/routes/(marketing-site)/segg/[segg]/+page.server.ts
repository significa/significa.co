import { error } from '@sveltejs/kit';
import { getDrawing } from '$lib/drawings-api.js';

export const load = async ({ params }) => {
  if (!params.segg) {
    throw error(400, 'Not found');
  }

  const drawing = await getDrawing(params.segg);

  return { drawing: drawing };
};
