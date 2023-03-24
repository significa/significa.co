import { env } from '$env/dynamic/private';
import { sesClient } from '$lib/aws.server';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { getTextTemplate } from './template';
import emailTemplate from './template.html?raw';

export const sendTransactionalEmail = async ({
  name,
  email,
  subject
}: {
  name: string;
  email: string;
  subject: string;
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
            Data: emailTemplate.replace('{{name}}', name)
          },
          Text: {
            Charset: 'UTF-8',
            Data: getTextTemplate(name)
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
