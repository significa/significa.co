import AWS from 'aws-sdk'
import fileType from 'file-type'

const s3 = new AWS.S3()

exports.handler = function(event: any, context: any) {
  const request = event.body

  const base64String = request.base64String

  const buffer = new Buffer(base64String, 'base64')
  const fileMime = fileType(buffer)

  if (fileMime === null) {
    return context.fail('The string supplied is not a file type')
  }

  const file = getFile(fileMime, buffer)
  const params = file.params

  s3.putObject(params, function(err) {
    if (err) {
      return console.log(err)
    }

    return console.log('File URL', file.uploadFile.full_path)
  })
}

const getFile = function(fileMime: any, buffer: any) {
  const fileExt = fileMime.ext
  const now = new Date().toISOString()

  const fileName = now + '.' + fileExt

  const params = {
    Bucket: 'significa-site-uploads',
    Key: fileName,
    Body: buffer,
  }

  const uploadFile = {
    size: buffer.toString('ascii').length,
    type: fileMime.mime,
    name: fileName,
    full_path: fileName,
  }

  return {
    params,
    uploadFile,
  }
}
