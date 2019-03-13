import { useState } from 'react'
import axios from 'axios'

import { URLS, MAX_FILE_SIZE, MESSAGES } from './constants'

const useFileUpload = () => {
  const [pending, setPending] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [error, setError] = useState('')

  const cancel = () => {
    if (pending) {
      setPending(false)
    }
    if (error) {
      setError('')
    }
    if (fileUrl) {
      setFileUrl('')
    }
  }

  const upload = async (file: File) => {
    const fileSize: number = parseInt((file.size / 1024 / 1024).toFixed(4), 10) // MB

    if (fileSize > MAX_FILE_SIZE) {
      return setError(MESSAGES.uploadSizeError)
    }

    setPending(true)
    setError('')

    const fullName =
      new Date().toISOString().replace(/[.:TZ]/g, '_') + file.name

    return axios
      .post(URLS.getUrl, { object_key: fullName })
      .then(({ data: { url } }) => {
        return axios
          .request({
            url,
            method: 'put',
            headers: {
              'Content-Type': file.type,
            },
            data: file,
          })
          .then(res => {
            if (res.status === 200) {
              setFileUrl(`${URLS.bucketRoot}${fullName}`)
            } else {
              setError(MESSAGES.uploadError)
            }

            setPending(false)
          })
      })
      .catch(() => {
        setError(MESSAGES.uploadError)
        setPending(false)
      })
  }

  return {
    upload,
    cancel,
    pending,
    error,
    fileUrl,
  }
}

export default useFileUpload
