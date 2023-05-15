import { env } from '$env/dynamic/private';
import { sesClient } from '$lib/aws.server';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { getTextTemplate } from './template';
import { getTextTemplate as getMinimalTextTemplate } from './template-minimal';
import emailTemplate from './template.html?raw';
import minimalEmailTemplate from './template-minimal.html?raw';

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
  await sesClient.send(
    new SendEmailCommand({
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
      },
      Source: env.AWS_SES_FROM_ADDRESS
    })
  );
};
