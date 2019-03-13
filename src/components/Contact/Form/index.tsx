import React, { useState } from 'react'
import axios from 'axios'

import * as S from './styled'

import useForm from '../../../hooks/useForm'
import useFileUpload from './useFileUpload'

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const initialValues = {
  name: '',
  email: '',
  budget: '',
  message: '',
}

interface IValue {
  [key: string]: string | number | boolean
}
interface IError {
  [key: string]: string
}

const validate = (values: IValue) => {
  const errors: IError = {}

  if (!values.name) {
    errors.name = "Jaqen H'ghar?"
  }

  if (!values.email) {
    errors.email = "It's hard to get back to you without an address."
  } else if (
    typeof values.email === 'string' &&
    !MAIL_REGEX.test(values.email)
  ) {
    errors.email = "This doesn't feel right..."
  }
  return errors
}

const Form: React.FC<{}> = () => {
  // Main status state
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (values: IValue, attachment: string) => {
    const body = fileUrl
      ? { ...values, type: 'enquiry', attachment }
      : { ...values, type: 'enquiry' }
    return axios
      .post(
        'https://4soji24nad.execute-api.eu-west-1.amazonaws.com/v1/new',
        body
      )
      .then(() => {
        setSubmitted(true)
      })
      .catch(() => {
        return {
          // TODO: better message?
          global: 'Oh noes! Something went wrong',
        }
      })
  }
  // FileUpload
  const {
    upload,
    cancelUpload,
    pending: filePending,
    fileUrl,
    error: fileError,
  } = useFileUpload()
  // Form
  const [form, fields] = useForm({
    initialValues,
    validate,
    handleSubmit: values => handleSubmit(values, fileUrl),
  })

  if (submitted) {
    return <div>Thanks mate. We will be in touch.</div>
  }

  return (
    <S.Wrapper isSubmitting={form.isSubmitting}>
      {/* TODO: Proper error handling */}
      {form.errors.global && <p>{form.errors.global}</p>}

      <form onSubmit={form.handleSubmit}>
        <S.Input
          name="name"
          label="Your name"
          placeholder="How should we call you?"
          error={form.touched.name && form.errors.name}
          {...fields.name}
        />
        <S.Input
          type="email"
          name="email"
          label="Your email"
          placeholder="Your email address"
          error={form.touched.email && form.errors.email}
          {...fields.email}
        />
        <S.Input
          name="budget"
          label="Budget (optional)"
          placeholder="Do you have a fixed budget?"
          {...fields.budget}
        />
        <S.Textarea
          name="message"
          label="Your message"
          placeholder="What's on your mind?"
          {...fields.message}
        />
        <S.ActionsWrapper>
          <S.FileInput
            label="Attachment"
            onSelect={upload}
            onClear={cancelUpload}
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
