import https from 'https'

function httpsRequest(params: any, postData: any) {
  return new Promise((resolve, reject) => {
    const req = https.request(params, res => {
      res.on('data', () => resolve())
    })
    req.on('error', function(err) {
      reject(err)
    })

    if (postData) {
      req.write(postData)
    }

    req.end()
  })
}

export default httpsRequest
