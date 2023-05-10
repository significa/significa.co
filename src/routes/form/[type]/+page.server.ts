import { env } from '$env/dynamic/private';
import { t } from '$lib/i18n';
import { sendTransactionalEmail } from '$lib/mail/sendEmail.server.js';
import { notion } from '$lib/notion.server.js';
import { fail, redirect } from '@sveltejs/kit';

type FormFields = {
  name: string;
  email: string;
  message: string;
  position?: string;
  budget?: string;
  attachments?: string;
  'submitted-using-progressive-enhancement'?: string;
  'return-to'?: string;
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const fields = Object.fromEntries(data.entries()) as FormFields;
    const { name, email, message } = fields;

    if (!name || !email || !message) {
      return fail(400, {
        error: {
          type: 'fields',
          fields: {
            name: !name,
            email: !email,
            message: !message
          }
        }
      });
    }

    try {
      switch (event.params.type) {
        case 'quote':
          await notion.pages.create({
            parent: { database_id: env.NOTION_DB_LEADS },
            properties: {
              Name: { title: [{ text: { content: name } }] },
              Email: { email: email },
              Budget: { select: { name: fields.budget || 'n/a' } },
              Message: { rich_text: [{ text: { content: message || '' } }] },
              Status: { select: { name: 'To triage' } },
              Attachments: {
                files: (fields.attachments || '')
                  .split(',')
                  .filter((url) => url && url.startsWith('https'))
                  .map((url) => {
                    const parts = url.split('/');
                    return { name: parts[parts.length - 1], external: { url } };
                  })
              }
            }
          });
          break;
        case 'career':
          await notion.pages.create({
            parent: { database_id: env.NOTION_DB_CANDIDATES },
            properties: {
              Name: { title: [{ text: { content: name } }] },
              Email: { email: email },
              Position: { select: { name: fields.position || 'n/a' } },
              Message: { rich_text: [{ text: { content: message || '' } }] },
              Attachments: {
                files: (fields.attachments || '')
                  .split(',')
                  .filter((url) => url && url.startsWith('https'))
                  .map((url) => {
                    const parts = url.split('/');
                    return { name: parts[parts.length - 1], external: { url } };
                  })
              }
            }
          });
          break;
        case 'contact':
          await notion.pages.create({
            parent: { database_id: env.NOTION_DB_CONTACTS },
            properties: {
              Name: { title: [{ text: { content: name } }] },
              Email: { email: email },
              Message: { rich_text: [{ text: { content: message || '' } }] }
            }
          });
          break;
        default:
          break;
      }
    } catch (error) {
      return fail(422, {
        error: {
          type: 'notion'
        }
      });
    }

    try {
      const subject = t('form.subject');
      await sendTransactionalEmail({ name, email, subject });
    } catch (error) {
      return fail(422, {
        error: {
          type: 'email'
        }
      });
    }

    if (fields['submitted-using-progressive-enhancement']) {
      return { success: true };
    }

    const returnTo: string = fields['return-to'] || '/';

    throw redirect(302, returnTo);
  }
};
