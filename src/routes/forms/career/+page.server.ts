import { env } from '$env/dynamic/private';
import { notion } from '$lib/notion.server.js';
import { handleContactForm } from '../forms.server.js';

export const actions = {
  default: handleContactForm(async ({ name, email, position, message, attachments }) => {
    await notion.pages.create({
      parent: { database_id: env.NOTION_DB_CANDIDATES },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Position: { select: { name: position || 'n/a' } },
        Message: { rich_text: [{ text: { content: message || '' } }] },
        Attachments: {
          files: (attachments || '')
            .split(',')
            .filter((url) => url && url.startsWith('https'))
            .map((url) => {
              const parts = url.split('/');
              return { name: parts[parts.length - 1], external: { url } };
            })
        }
      }
    });
  })
};
