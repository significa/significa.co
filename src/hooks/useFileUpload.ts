import { useState } from 'react'
import axios from 'axios'

import { MAX_FILE_SIZE } from '../constants'

interface IUseFileUpload {
  errors: {
    upload: string
    fileSize: string
  }
}

const useFileUpload = ({
  errors: { upload: uploadError, fileSize: fileSizeError },
}: IUseFileUpload) => {
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
      return setError(fileSizeError)
    }

    setPending(true)
    setError('')

    const fullName =
      new Date().toISOString().replace(/[.:TZ]/g, '_') +
      file.name.replace(/ /g, '-')

    return axios
      .post('https://api.significa.co/request-upload-url', {
        name: fullName,
        type: file.type,
      })
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
              setFileUrl(url.split('?AWSAccessKeyId')[0])
            } else {
              setError(uploadError)
            }

            setPending(false)
          })
      })
      .catch(() => {
        setError(uploadError)
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
