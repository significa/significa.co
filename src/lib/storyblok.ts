import { env } from '$env/dynamic/public';
import { apiPlugin, storyblokInit, type SbSDKOptions } from '@storyblok/js';

export const getStoryblok = (apiOptions: SbSDKOptions['apiOptions']) => {
  const { storyblokApi } = storyblokInit({
    accessToken: env.PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      https: true,
      ...apiOptions
    }
  });

  return storyblokApi as NonNullable<ReturnType<typeof storyblokInit>['storyblokApi']>;
};
