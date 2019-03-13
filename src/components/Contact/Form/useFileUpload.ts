import { useState } from 'react'
import axios from 'axios'

const GENERIC_ERROR = 'Could not upload your file. Please try again.'
const SIZE_ERROR =
  'File too big to handle. Maybe sending a shareable link in the message?'
const MAX_FILE_SIZE = 1

const useFileUpload = () => {
  const [pending, setPending] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [error, setError] = useState('')

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  const cancelUpload = () => {
    // TODO: NOT WORKING!
    source.cancel()
    setPending(false)
  }

  const upload = async (file: File) => {
    const fileSize: number = parseInt((file.size / 1024 / 1024).toFixed(4), 10) // MB

    if (fileSize > MAX_FILE_SIZE) {
      return setError(SIZE_ERROR)
    }

    setPending(true)

    const fullName =
      new Date().toISOString().replace(/[.:TZ]/g, '_') + file.name

    try {
      const {
        data: { url },
      } = await axios.post(
        'https://4soji24nad.execute-api.eu-west-1.amazonaws.com/v1/upload-url',
        { object_key: fullName }
      )

      const res = await axios.request({
        url,
        method: 'put',
        headers: {
          'Content-Type': file.type,
        },
        data: file,
        cancelToken: source.token,
      })

      if (res.status === 200) {
        setFileUrl(
          `https://s3-eu-west-1.amazonaws.com/significa-site-uploads/${fullName}`
        )
      } else {
        setError(GENERIC_ERROR)
      }

      setPending(false)
    } catch (error) {
      setError(GENERIC_ERROR)
      setPending(false)
    }
  }

  return {
    upload,
    cancelUpload,
    pending,
    error,
    fileUrl,
  }
}

export default useFileUpload
