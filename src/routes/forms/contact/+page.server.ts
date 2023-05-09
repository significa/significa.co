import { env } from '$env/dynamic/private';
import { notion } from '$lib/notion.server.js';
import { handleContactForm } from '../forms.server.js';

export const actions = {
  default: handleContactForm(async ({ name, email, message }) => {
    await notion.pages.create({
      parent: { database_id: env.NOTION_DB_CONTACTS },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Message: { rich_text: [{ text: { content: message || '' } }] }
      }
    });
  })
};
