import { CommType } from './types'

type MailParams = {
  type: CommType
  name: string
  email: string
  phone: string
  message: string
  attachment: string
  budget: string
  portfolio: string
  position: string
}

const titles: { [key in CommType]: string } = {
  enquiry: 'New enquiry received!',
  career: 'New application received!',
  general: 'New contact received',
}

const getMailParams = ({
  type,
  name,
  email,
  phone,
  message,
  attachment,
  budget,
  portfolio,
  position,
}: MailParams) => {
  const body = [`Name: ${name}`, `Email: ${email}`]

  if (phone) {
    body.push(`Phone: ${phone}`)
  }

  if (type === 'enquiry' || type === 'career') {
    if (attachment) {
      body.push(`Attachment: ${attachment}`)
    }
  }

  if (type === 'enquiry' && budget) {
    body.push(`Budget: ${budget}`)
  }

  if (type === 'career') {
    if (position) {
      body.push(`Position: ${position}`)
    }

    if (portfolio) {
      body.push(`Portfolio: ${portfolio}`)
    }
  }

  body.push(...['\n', `${message}`])

  const params = {
    Destination: { ToAddresses: ['Significa' + ' <hello@significa.co>'] },
    Message: {
      Body: {
        Text: { Data: body.join('\n'), Charset: 'UTF-8' },
      },
      Subject: {
        Data: `[Significa] ${titles[type] || titles.general}`,
        Charset: 'UTF-8',
      },
    },
    Source: 'Significa <hello@significa.co>',
    ReplyToAddresses: [email],
  }

  return params
}

export default getMailParams
