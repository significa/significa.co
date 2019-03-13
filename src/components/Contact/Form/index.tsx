import React, { useState } from 'react'
import axios from 'axios'

import { MAIL_REGEX, URLS, MESSAGES } from './constants'

import * as S from './styled'

import useForm from '../../../hooks/useForm'
import useFileUpload from './useFileUpload'

interface IValues {
  [key: string]: string | number | boolean
}
interface IErrors {
  [key: string]: string
}

const Form: React.FC<{}> = () => {
  // Main status state
  const [submitted, setSubmitted] = useState(false)

  // FileUpload
  const {
    upload,
    cancel,
    pending: filePending,
    fileUrl,
    error: fileError,
  } = useFileUpload()

  // Form
  const [form, fields] = useForm({
    initialValues: {
      name: '',
      email: '',
      budget: '',
      message: '',
    },
    validate,
    handleSubmit: values => handleSubmit(values, fileUrl),
  })

  // HandleSubmit
  function handleSubmit(values: IValues, attachment: string) {
    const body = fileUrl
      ? { ...values, type: 'enquiry', attachment }
      : { ...values, type: 'enquiry' }
    return axios
      .post(URLS.submit, body)
      .then(() => {
        setSubmitted(true)
      })
      .catch(() => {
        return { global: MESSAGES.global }
      })
  }

  // Validate
  function validate(values: IValues) {
    const errors: IErrors = {}

    if (!values.name) {
      errors.name = MESSAGES.nameRequired
    }

    if (!values.email) {
      errors.email = MESSAGES.emailRequired
    } else if (
      typeof values.email === 'string' &&
      !MAIL_REGEX.test(values.email)
    ) {
      errors.email = MESSAGES.emailInvalid
    }

    if (!values.message) {
      errors.message = MESSAGES.messageRequired
    }

    return errors
  }

  // Render
  if (submitted) {
    return <div>Thanks mate. We will be in touch.</div>
  }

  return (
    <S.Wrapper isSubmitting={form.isSubmitting}>
      {/* TODO: Proper error handling */}
      {form.errors.global && <p>{form.errors.global}</p>}

      <form onSubmit={form.handleSubmit}>
        <S.Input
          {...fields.name}
          label="Your name"
          placeholder="How should we call you?"
          error={form.touched.name && form.errors.name}
        />
        <S.Input
          {...fields.email}
          type="email"
          label="Your email"
          placeholder="Your email address"
          error={form.touched.email && form.errors.email}
        />
        <S.Input
          {...fields.budget}
          label="Budget (optional)"
          placeholder="Do you have a fixed budget?"
        />
        <S.Textarea
          {...fields.message}
          label="Your message"
          placeholder="What's on your mind?"
          error={form.touched.message && form.errors.message}
        />
        <S.ActionsWrapper>
          <S.FileInput
            label="Attachment"
            onSelect={upload}
            onClear={cancel}
            uploading={filePending}
            error={fileError}
          />
          <S.Button
            disabled={!form.valid || filePending}
            pending={form.isSubmitting}
          >
            Send
          </S.Button>
        </S.ActionsWrapper>
      </form>
    </S.Wrapper>
  )
}

export default Form
