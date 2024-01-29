import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';

import { createHmac } from 'crypto';
import { createOrUpdateDrawing } from '$lib/drawings.server.js';
import { isValidDrawing } from '$components/draw-your-segg/types.js';

const getAuthToken = (id: string) => {
  if (!env.SESSION_SECRET_KEY) {
    throw error(500, 'Required env var SESSION_SECRET_KEY not set');
  }
  const hmac = createHmac('sha256', env.SESSION_SECRET_KEY);
  hmac.update(id);
  return hmac.digest('hex');
};

const isValidUUID4 = (uuid: string) => {
  const UUID_REGEX = /^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/;

  if (!uuid) {
    return false;
  }
  const uuidString = uuid.toString();
  return uuidString.match(UUID_REGEX) !== null;
};

export const POST = async ({ request }) => {
  const body = await request.json();

  let id = body.id;
  const drawing = body.drawing;

  if (!isValidDrawing(drawing)) throw error(422);

  if (id && (!isValidUUID4(id) || getAuthToken(id) !== body.authToken)) {
    throw error(403);
  }

  id = await createOrUpdateDrawing(drawing, id);

  return json({
    id,
    authToken: getAuthToken(id)
  });
};
