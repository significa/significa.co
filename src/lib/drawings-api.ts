import createClient from 'openapi-fetch';
import { toast } from '@significa/svelte-ui';
import type { paths } from '$types/seggs-api.js';
import { PUBLIC_SEGGS_BACKEND_BASE_API_URL } from '$env/static/public';
import { error as svelteError } from '@sveltejs/kit';
import type { Drawing } from '$components/draw-your-segg/types';

export const apiClient = createClient<paths>({
  baseUrl: PUBLIC_SEGGS_BACKEND_BASE_API_URL,
  fetch: async (input: Request) => {
    const response = await fetch(input);

    if (response.status >= 500) {
      toast.error({
        message: 'Something went wrong',
        description: 'Could not complete your request. Please try again later.',
        timeout: 0
      });
    }

    return response;
  }
});

export const getDrawing = async (id: string): Promise<Drawing> => {
  const { data: drawing, error: responseError } = await apiClient.GET(
    '/api/public/drawings/{drawing_id}',
    {
      params: {
        path: {
          drawing_id: id
        }
      }
    }
  );

  if (responseError?.status_code === 404) {
    throw svelteError(404, 'Not found');
  }

  if (responseError) {
    throw svelteError(500, 'Unexpected API error retrieving the drawing');
  }

  return drawing;
};
