const AWS = require('aws-sdk')

const ses = new AWS.SES()

function sendEmail(params) {
  return ses.sendEmail(params).promise()
}

module.exports = sendEmail
