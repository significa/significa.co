import { env } from '$env/dynamic/private';
import { sesClient } from '$lib/aws.server';
import { SendEmailCommand, type SendEmailCommandInput } from '@aws-sdk/client-ses';
import { getTextTemplate } from './template';
import { getTextTemplate as getMinimalTextTemplate } from './template-minimal';
import emailTemplate from './template.html?raw';
import minimalEmailTemplate from './template-minimal.html?raw';
import type { FormType } from '$components/contact-form.svelte';

const escapeHTML = (unsafeContent: string | undefined | null): string => {
  if (!unsafeContent) {
    return '&lt;empty&gt;';
  }

  return unsafeContent
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll(`'`, '&#39;');
};

export const sendEmail = async (input: Omit<SendEmailCommandInput, 'Source'>) => {
  await sesClient.send(
    new SendEmailCommand({
      ...input,
      Source: env.AWS_SES_FROM_ADDRESS
    })
  );
};

export const sendTransactionalEmail = async ({
  name,
  email,
  subject,
  template = 'default'
}: {
  name: string;
  email: string;
  subject: string;
  template?: 'default' | 'minimal';
}) => {
  name = escapeHTML(name);
  email = escapeHTML(email);
  subject = escapeHTML(subject);

  await sendEmail({
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            template === 'minimal'
              ? minimalEmailTemplate.replace('{{name}}', name)
              : emailTemplate.replace('{{name}}', name)
        },
        Text: {
          Charset: 'UTF-8',
          Data: template === 'minimal' ? getMinimalTextTemplate(name) : getTextTemplate(name)
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  });
};

export const sendEmailNotification = async ({
  name,
  email,
  message,
  formType,
  notionLink,
  notionErrorMessage
}: {
  name: string;
  email: string;
  message: string;
  formType: FormType;
  notionLink?: string;
  notionErrorMessage?: string;
}) => {
  name = escapeHTML(name);
  email = escapeHTML(email);
  message = escapeHTML(message);

  const formTypeToDestinationEmail: Record<FormType, string | undefined> = {
    quote: env.NOTIFICATION_EMAIL_ADDRESS_QUOTE,
    career: env.NOTIFICATION_EMAIL_ADDRESS_CAREER,
    contact: env.NOTIFICATION_EMAIL_ADDRESS_CONTACT,
    estimations: env.NOTIFICATION_EMAIL_ADDRESS_ESTIMATIONS
  };

  const destinationEmail = formTypeToDestinationEmail[formType];

  if (!destinationEmail) {
    console.warn(
      `Destination email not configured: Skipping sending of email notification for form type ${formType}`
    );
    return;
  }

  let errorMessage: string = '';
  if (notionErrorMessage) {
    errorMessage = `⚠️ Failed to store submission to Notion ⚠️\n'${escapeHTML(
      notionErrorMessage
    )}'\n`;
  }

  await sendEmail({
    Destination: {
      ToAddresses: [destinationEmail]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: [
            errorMessage,
            `New website submission.\n`,
            notionLink && `Notion Link: ${notionLink}`,
            `name: ${name}`,
            `email: ${email}`,
            `message: ${message}`
          ].join('\n')
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New website submission'
      }
    }
  });
};
