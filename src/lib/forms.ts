import { env } from '$env/dynamic/private';
import { Client } from '@notionhq/client';
import { fail, type Actions, type RequestEvent } from '@sveltejs/kit';
import { uploadFile } from './aws.server';
import { NOTION_DBS } from './constants';
import { t } from './i18n';
import { sendTransactionalEmail } from './mail/sendEmail.server';

type FormFields = {
  name: string;
  email: string;
  message: string;
  position?: string;
  budget?: string;
};

type Attachment = { name: string; url: string };

const handleContactForm =
  (handleSaveToDatabase: (data: FormFields & { attachments: Attachment[] }) => Promise<void>) =>
  async (event: RequestEvent) => {
    const data = await event.request.formData();
    const files = data.getAll('attachments');

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

    const attachmentsUrls: Attachment[] = [];
    try {
      for (const file of files) {
        if (file instanceof File && file.size > 0) {
          attachmentsUrls.push({
            name: file.name,
            url: await uploadFile(file)
          });
        }
      }
    } catch (error) {
      return fail(400, {
        error: {
          type: 'fields',
          fields: {
            attachments: true
          }
        }
      });
    }

    try {
      await handleSaveToDatabase({ ...fields, attachments: attachmentsUrls });
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

    return {
      success: true
    };
  };

const notion = new Client({
  auth: env.NOTION_TOKEN
});

export const actions: Actions = {
  quote: handleContactForm(async ({ name, email, budget, message, attachments }) => {
    notion.pages.create({
      parent: { database_id: NOTION_DBS.leads },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Budget: { select: { name: budget || 'n/a' } },
        Message: { rich_text: [{ text: { content: message || '' } }] },
        Status: { select: { name: 'To triage' } },
        Attachments: {
          files: attachments.map(({ name, url }) => ({ name, external: { url } }))
        }
      }
    });
  }),
  career: handleContactForm(async ({ name, email, position, message, attachments }) => {
    notion.pages.create({
      parent: { database_id: NOTION_DBS.candidates },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Position: { select: { name: position || 'n/a' } },
        Message: { rich_text: [{ text: { content: message || '' } }] },
        Attachments: {
          files: attachments.map(({ name, url }) => ({ name, external: { url } }))
        }
      }
    });
  }),
  contact: handleContactForm(async ({ name, email, message }) => {
    notion.pages.create({
      parent: { database_id: NOTION_DBS.contacts },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Message: { rich_text: [{ text: { content: message || '' } }] }
      }
    });
  })
};
