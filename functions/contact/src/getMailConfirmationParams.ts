import { CommType } from './types'

type MailParams = { name: string; email: string; type: CommType }

const getMailParams = ({ name, email, type }: MailParams) => {
  const isCareerContact = type === 'career'

  const generalMessage =
    'Thanks for reaching out!\n' +
    'Somebody at our office will get back to you as soon as possible.\n' +
    '\n' +
    'While you wait, check out our Handbook (https://significa.co/handbook/) and get acquainted with how we do things around here.\n' +
    'We have a lot of content there so feel free to explore as you please.\n' +
    '\n' +
    'Speak soon,\n' +
    'Significa\n'

  const applicationFormMessage =
    'Your application is in safe hands.\n' +
    'Somebody from our team will be reviewing your application as soon as possible. We won’t leave you hanging so either way you will hear from us.\n' +
    '\n' +
    'While you wait, check out our Playbook (https://significa.co/handbook/playbook) and get a sneak peek inside our office!\n' +
    'We have a lot of content there so feel free to explore as you please.\n' +
    '\n' +
    'Have a great day,\n' +
    'Significa\n'

  const params = {
    Destination: { ToAddresses: [name + ' <' + email + '>'] },
    Message: {
      Body: {
        Text: {
          Data: isCareerContact ? applicationFormMessage : generalMessage,
          Charset: 'UTF-8',
        },
      },
      Subject: {
        Data: isCareerContact
          ? 'Your application was received at Significa'
          : 'Your message was delivered at Significa',
        Charset: 'UTF-8',
      },
    },
    Source: 'Significa <hello@significa.co>',
    ReplyToAddresses: ['hello@significa.co'],
  }

  return params
}

export default getMailParams
