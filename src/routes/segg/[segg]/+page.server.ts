import { isValidDrawing } from '$components/draw-your-segg/types.js';
import { error } from '@sveltejs/kit';
import { getDrawing } from '$lib/drawings.server.js';

export const load = async ({ params }) => {
  if (!params.segg) {
    throw error(400, 'Not found');
  }

  const drawing = await getDrawing(params.segg);

  if (!isValidDrawing(drawing)) throw error(404, 'Not found');

  return { drawing };
};
