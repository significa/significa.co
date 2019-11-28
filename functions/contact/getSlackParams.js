const titles = {
  enquiry: 'New enquiry received',
  career: 'New application received',
  general: 'New contact received',
}

const colors = {
  enquiry: '#FF5050',
  career: '#5050FF',
  general: '#222426',
}

const getSlackParams = ({
  type,
  name,
  email,
  phone,
  message,
  attachment,
  budget,
  portfolio,
  position,
}) => {
  const fields = [
    {
      title: 'Name',
      value: name,
    },
    {
      title: 'Email',
      value: email,
    },
  ]

  if (phone) {
    fields.push({ title: 'Phone', value: phone })
  }

  if (type === 'enquiry' || type === 'career') {
    if (attachment) {
      fields.push({ title: 'Attachment', value: attachment })
    }
  }

  if (type === 'enquiry' && budget) {
    fields.push({ title: 'Budget', value: budget })
  }

  if (type === 'career') {
    if (position) {
      fields.push({ title: 'Position', value: position })
    }

    if (portfolio) {
      fields.push({ title: 'Portfolio', value: portfolio })
    }
  }

  fields.push({ title: 'Message', value: message })

  const params = {
    text: `<!channel> ${titles[type] || titles.general}:`,
    attachments: [
      {
        fallback: 'Information:',
        pretext: 'Information:',
        color: colors[type] || colors.general,
        fields: fields.map(field => {
          return { ...field, short: false }
        }),
      },
    ],
  }

  return params
}

module.exports = getSlackParams
