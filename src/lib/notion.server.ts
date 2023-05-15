import { env } from '$env/dynamic/private';
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: env.NOTION_TOKEN
});
