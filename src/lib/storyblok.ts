import { env } from '$env/dynamic/public';
import {
  apiPlugin,
  storyblokInit,
  useStoryblokBridge,
  type ISbStoryData,
  type SbSDKOptions
} from '@storyblok/js';
import { error } from '@sveltejs/kit';
import type { HttpError } from '@sveltejs/kit';
import { onMount } from 'svelte';

export const getStoryblok = (
  apiOptions: SbSDKOptions['apiOptions'] = {},
  options: Omit<SbSDKOptions, 'apiOptions'> = {}
) => {
  const { storyblokApi } = storyblokInit({
    accessToken: env.PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    ...options,
    apiOptions: {
      https: true,
      ...apiOptions
    }
  });

  return storyblokApi as NonNullable<ReturnType<typeof storyblokInit>['storyblokApi']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function startStoryblokBridge<T extends { story: ISbStoryData<any> }>(
  id: number,
  onNewStory: (newStory: T['story']) => void
) {
  onMount(async () => {
    getStoryblok();
    useStoryblokBridge(id, onNewStory);
  });
}

export const isStatusError = (err: unknown): err is { status: number } => {
  return (
    typeof err === 'object' && err !== null && 'status' in err && typeof err.status === 'number'
  );
};

/**
 * Converts a Storyblok error to a SvelteKit error when needed.
 *
 * @param err - The error object to handle, which can be of any type.
 * @returns The original error if it is not a Storyblok error, or a SvelteKit 404 error.
 */
export const handleStoryblokError = <T>(err: T): T | HttpError => {
  if (isStatusError(err) && err.status === 404) {
    return error(404, 'Storyblok 404 error');
  }
  return err;
};
