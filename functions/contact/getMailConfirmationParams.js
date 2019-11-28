var getMailParams = ({ name, email }) => {
  var message =
    'Hello ' +
    name +
    ',\n' +
    'Thank you for reaching out! We will get back to you soon!\n' +
    'In the meantime, why not check out our Handbook?\n' +
    'https://significa.co/handbook\n' +
    '\n' +
    'Have a super day,\n' +
    'Significa'

  var params = {
    Destination: { ToAddresses: [name + ' <' + email + '>'] },
    Message: {
      Body: {
        Text: { Data: message, Charset: 'UTF-8' },
      },
      Subject: {
        Data: 'Hello from Significa',
        Charset: 'UTF-8',
      },
    },
    Source: 'Significa <hello@significa.co>',
    ReplyToAddresses: ['hello@significa.co'],
  }

  return params
}

module.exports = getMailParams
