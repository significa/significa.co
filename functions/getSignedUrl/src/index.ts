import AWS from 'aws-sdk'
const s3 = new AWS.S3({ signatureVersion: 'v4' })

exports.handler = (event: any, _context: any, callback: any) => {
  const bucket = process.env['s3_bucket']
  if (!bucket) {
    callback(new Error(`S3 bucket not set`))
  }

  const key = event['object_key']
  if (!key) {
    callback(new Error('S3 object key missing'))
    return
  }

  const params = { Bucket: bucket, Key: key }

  s3.getSignedUrl('putObject', params, (error, url) => {
    if (error) {
      callback(error)
    } else {
      callback(null, { url: url })
    }
  })
}
