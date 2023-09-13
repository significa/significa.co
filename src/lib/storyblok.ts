import { env } from '$env/dynamic/public';
import {
  apiPlugin,
  storyblokInit,
  useStoryblokBridge,
  type ISbStoryData,
  type SbSDKOptions
} from '@storyblok/js';
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
