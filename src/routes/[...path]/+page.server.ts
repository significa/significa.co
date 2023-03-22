import { fetchPage, getServerSideSBVersion } from '$lib/storyblok';
import { error, fail } from '@sveltejs/kit';
import { sendTransactionalEmail } from '$lib/mail/sendEmail.server';
import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';
import { uploadFile } from '$lib/aws.server';
import { NOTION_DBS } from '$lib/constants';

export const load = async ({ params, cookies, fetch }) => {
  try {
    const page = await fetchPage({
      slug: params.path,
      version: getServerSideSBVersion(cookies),
      fetch
    });

    return { page };
  } catch (err) {
    throw error(404, 'Not found');
  }
};

export const actions = {
  'get-a-quote': async (event) => {
    const formData = await event.request.formData();

    const files = formData.getAll('attachments');
    formData.delete('attachments');

    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      budget: string;
      message: string;
    };

    if (!data.name || !data.email) {
      return fail(400, {
        error: {
          type: 'fields',
          messages: {
            name: 'Please enter your name',
            email: 'Please enter your email'
          }
        }
      });
    }

    const attachmentsUrls: { name: string; url: string }[] = [];
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
          messages: {
            attachments: 'Could not upload attachments'
          }
        }
      });
    }

    const notion = new Client({
      auth: env.NOTION_TOKEN
    });

    try {
      await notion.pages.create({
        parent: { database_id: NOTION_DBS['get-a-quote'] },
        properties: {
          Name: { title: [{ text: { content: data.name } }] },
          Email: { email: data.email },
          Budget: { select: { name: data.budget || 'n/a' } },
          Message: { rich_text: [{ text: { content: data.message } }] },
          Status: { select: { name: 'To triage' } },
          Attachments: {
            files: attachmentsUrls.map(({ name, url }) => ({ name, external: { url } }))
          }
        }
      });
    } catch (error) {
      return fail(422, {
        error: {
          type: 'notion',
          messages: {
            global: 'Could not save data'
          }
        }
      });
    }

    try {
      const subject = 'Your message was delivered at Significa';
      await sendTransactionalEmail({
        name: data.name,
        email: data.email,
        subject
      });
    } catch (error) {
      return fail(422, {
        error: {
          type: 'email',
          messages: {
            global: 'Could not deliver email'
          }
        }
      });
    }

    return {
      success: true
    };
  }
};
