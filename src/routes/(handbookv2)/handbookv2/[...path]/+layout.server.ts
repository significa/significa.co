import { createFileTree } from '$lib/utils/notion';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import handbook from '$root/handbook.json';

export const load = ({ params }) => {
  const chapters = createFileTree(handbook as Array<PageObjectResponse>);

  return { path: params.path, chapters, handbook };
};
