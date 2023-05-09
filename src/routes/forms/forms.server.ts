import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { t } from '$lib/i18n';
import { sendTransactionalEmail } from '$lib/mail/sendEmail.server';

type FormFields = {
  name: string;
  email: string;
  message: string;
  position?: string;
  budget?: string;
  attachments?: string;
};

export const handleContactForm =
  (handleSaveToDatabase: (data: FormFields) => Promise<void>) => async (event: RequestEvent) => {
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
      await handleSaveToDatabase(fields);
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

    // TODO: return data with redirect
    // return { success: true }

    // TODO: use referrer
    // redirect to referrer
    throw redirect(302, '/');
  };
