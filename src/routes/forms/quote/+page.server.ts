import { env } from '$env/dynamic/private';
import { notion } from '$lib/notion.server.js';
import { handleContactForm } from '../forms.server.js';

export const actions = {
  default: handleContactForm(async ({ name, email, budget, message, attachments }) => {
    await notion.pages.create({
      parent: { database_id: env.NOTION_DB_LEADS },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Budget: { select: { name: budget || 'n/a' } },
        Message: { rich_text: [{ text: { content: message || '' } }] },
        Status: { select: { name: 'To triage' } },
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
