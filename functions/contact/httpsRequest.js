const https = require('https')

function httpsRequest(params, postData) {
  return new Promise((resolve, reject) => {
    var req = https.request(params, res => {
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

module.exports = httpsRequest
