import { createFileTree } from '$lib/utils/notion';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import handbook from '$root/handbook.json';

export const load = () => {
  const chapters = createFileTree(handbook as Array<PageObjectResponse>);

  return { chapters };
};
