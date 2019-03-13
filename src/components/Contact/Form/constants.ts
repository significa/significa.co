export const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const MAX_FILE_SIZE = 10

export const URLS = {
  submit: 'https://4soji24nad.execute-api.eu-west-1.amazonaws.com/v1/new',
  getUrl:
    'https://4soji24nad.execute-api.eu-west-1.amazonaws.com/v1/upload-url',
  bucketRoot: 'https://s3-eu-west-1.amazonaws.com/significa-site-uploads/',
}

export const MESSAGES = {
  global: 'Oh noes! Something went wrong',
  nameRequired: "Jaqen H'ghar? Please type your name or make something up.",
  emailRequired: "It's hard to get back to you without an address.",
  emailInvalid: "This doesn't feel right... Please check your address.",
  messageRequired:
    'Dont feel like writing? You can check our alternative contacts below.',
  uploadError: 'Could not upload your file. Please try again.',
  uploadSizeError:
    'File too big to handle. Maybe sending a shareable link in the message?',
}
