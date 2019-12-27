import AWS from 'aws-sdk'

const ses = new AWS.SES()

function sendEmail(params: any) {
  return ses.sendEmail(params).promise()
}

export default sendEmail
