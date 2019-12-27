import validateEmail from './validateEmail'
import getMailParams from './getMailParams'
import getMailConfirmationParams from './getMailConfirmationParams'
import getSlackParams from './getSlackParams'
import sendEmail from './sendEmail'
import httpsRequest from './httpsRequest'

exports.handler = function(event: any, context: any, callback: any) {
  const {
    type,
    name,
    email,
    phone,
    message,
    attachment,
    budget,
    portfolio,
    position,
  } = event

  if (!name) {
    context.fail('Must provide name')
    return
  }
  if (!email) {
    context.fail('Must provide email address')
    return
  }

  if (!validateEmail(email)) {
    context.fail('Must provide valid email address')
    return
  }

  const fields = {
    type,
    name: unescape(name),
    email,
    phone,
    message: unescape(message),
    attachment,
    budget,
    portfolio,
    position,
  }

  const mailParams = getMailParams(fields)
  const mailConfirmation = getMailConfirmationParams(fields)

  const slackParams = JSON.stringify(getSlackParams(fields))
  const slackOptions = {
    hostname: 'hooks.slack.com',
    method: 'POST',
    path: process.env.SLACK_PATH,
  }

  return Promise.all([
    sendEmail(mailParams),
    sendEmail(mailConfirmation),
    httpsRequest(slackOptions, slackParams),
  ])
    .then(() => {
      callback(null, 'Great success!')
    })
    .catch(error => {
      callback(JSON.stringify(error))
    })
}
