import { isFormType } from '$components/contact-form.svelte';
import {
  AWS_S3_BUCKET,
  NOTION_DB_LEADS,
  NOTION_DB_CANDIDATES,
  NOTION_DB_CONTACTS
} from '$env/static/private';
import { env } from '$env/dynamic/private';
import { postToCrm } from '$lib/crm.server.js';
import { t } from '$lib/i18n';
import { sendEmailNotification, sendTransactionalEmail } from '$lib/mail/sendEmail.server.js';
import { notion } from '$lib/notion.server.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';

// Room for attachment downloads and up to 3 CRM attempts (15s timeout each) on top of Notion.
export const config: Config = {
  maxDuration: 60
};

type FormFields = {
  name: string;
  email: string;
  message: string;
  position?: string;
  budget?: string;
  attachments?: string; // comma-separated list of URLs
  'submitted-using-progressive-enhancement'?: string;
  'return-to'?: string;
  estimations?: string;
};

/** Only files our own upload flow put in the bucket. Deduplicated and capped, as the list comes from the visitor. */
const MAX_ATTACHMENTS = 10;
const getAttachmentUrls = (attachmentsUrls: string) =>
  [
    ...new Set(
      attachmentsUrls
        .split(',')
        .filter(
          (url) => url && url.startsWith(`https://${AWS_S3_BUCKET}.s3.eu-west-3.amazonaws.com/`)
        )
    )
  ].slice(0, MAX_ATTACHMENTS);

const getNotionAttachments = (attachmentsUrls: string) => {
  return getAttachmentUrls(attachmentsUrls).map((url) => {
    const parts = url.split('/');
    return { name: parts[parts.length - 1], external: { url } };
  });
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const formType = event.params.type;
    let notionLink = '';
    let notionErrorMessage: string | undefined;
    let crmErrorMessage: string | undefined;

    if (!isFormType(formType)) {
      return fail(500, {
        error: {
          message: 'Failed to send internal email notification'
        }
      });
    }

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
          {
            // Notion and the CRM both get the lead, for redundancy. Either one is enough.
            const crmUrl = env.CRM_INTAKE_URL;
            const crmSecret = env.CRM_INTAKE_SECRET;
            const crmConfigured = Boolean(crmUrl && crmSecret);
            const [notionResult, crmResult] = await Promise.allSettled([
              notion.pages.create({
                parent: { database_id: NOTION_DB_LEADS },
                properties: {
                  Name: { title: [{ text: { content: name } }] },
                  Email: { email: email },
                  Budget: { select: { name: fields.budget || 'n/a' } },
                  Message: { rich_text: [{ text: { content: message || '' } }] },
                  Status: { select: { name: 'To triage' } },
                  Type: { select: { name: 'Organic' } },
                  Source: { select: { name: 'Website' } },
                  'Account Owner': {
                    people: [{ id: 'd8a42f29-ea96-44d4-80bb-4129259b1d41', object: 'user' }]
                  },
                  Attachments: {
                    files: getNotionAttachments(fields.attachments || '')
                  }
                }
              }),
              crmUrl && crmSecret
                ? postToCrm(
                    {
                      name,
                      email,
                      message,
                      budget: fields.budget,
                      attachmentUrls: getAttachmentUrls(fields.attachments || '')
                    },
                    { url: crmUrl, secret: crmSecret },
                    crypto.randomUUID()
                  )
                : Promise.resolve(null)
            ]);

            if (notionResult.status === 'fulfilled') {
              if ('url' in notionResult.value) notionLink = notionResult.value.url;
            } else {
              console.error('Failed to store submission in Notion', notionResult.reason);
              notionErrorMessage =
                notionResult.reason instanceof Error
                  ? notionResult.reason.message
                  : 'unknown error, please check the logs';
            }

            const crmStored = crmResult.status === 'fulfilled' && crmResult.value?.ok === true;
            if (crmConfigured && !crmStored) {
              crmErrorMessage =
                crmResult.status === 'fulfilled' && crmResult.value && !crmResult.value.ok
                  ? crmResult.value.error
                  : 'unknown error, please check the logs';
              console.error('Failed to post submission to the CRM:', crmErrorMessage);
            }

            if (notionErrorMessage && !crmStored) {
              throw new Error(notionErrorMessage);
            }
          }
          break;
        case 'estimations':
          {
            const response = await notion.pages.create({
              parent: { database_id: NOTION_DB_LEADS },
              properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email },
                Message: { rich_text: [{ text: { content: message || '' } }] },
                Status: { select: { name: 'To triage' } },
                Estimations: { rich_text: [{ text: { content: fields.estimations || '' } }] },
                Attachments: {
                  files: getNotionAttachments(fields.attachments || '')
                }
              }
            });
            if ('url' in response) {
              notionLink = response.url;
            }
          }
          break;

        case 'career':
          await notion.pages.create({
            parent: { database_id: NOTION_DB_CANDIDATES },
            properties: {
              Name: { title: [{ text: { content: name } }] },
              Email: { email: email },
              Position: { select: { name: fields.position || 'n/a' } },
              Message: { rich_text: [{ text: { content: message || '' } }] },
              Attachments: {
                files: getNotionAttachments(fields.attachments || '')
              }
            }
          });
          break;

        case 'contact':
          await notion.pages.create({
            parent: { database_id: NOTION_DB_CONTACTS },
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
      console.error('Failed to store submission', error);

      await sendEmailNotification({
        name,
        email,
        message,
        formType,
        notionErrorMessage:
          error instanceof Error
            ? error.message.toString()
            : 'unknown error, please check the logs',
        crmErrorMessage
      }).catch((emailError) => console.error('Failed to send email notification', emailError));

      return fail(500, {
        error: {
          message: 'Failed to store form submission'
        }
      });
    }

    // The submission is already stored; a failed internal email must not make the visitor resubmit.
    await sendEmailNotification({
      name,
      email,
      message,
      formType,
      notionLink,
      notionErrorMessage,
      crmErrorMessage
    }).catch((emailError) => console.error('Failed to send email notification', emailError));

    try {
      const subject = t('form.subject');
      await sendTransactionalEmail({
        name,
        email,
        subject,
        template: event.params.type === 'quote' ? 'default' : 'minimal'
      });
    } catch {
      return fail(500, {
        error: {
          message: 'Failed to send email notification to user'
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
