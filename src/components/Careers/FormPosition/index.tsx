import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import axios from 'axios'
import { Theme } from '@theme'

import { MAIL_REGEX } from '../../../constants'
import useForm from '../../../hooks/useForm'
import useFileUpload from '../../../hooks/useFileUpload'

import { RightContent } from '../../UI/Layout'
import Success from './Success'

import * as S from './styled'

interface IValues {
  [key: string]: string | number | boolean
}

interface IErrors {
  [key: string]: string
}

const Form: React.FC<{ position: string }> = ({ position }) => {
  const {
    careersYaml: { positions: data },
  }: IPositionSubmit = useStaticQuery(positionFormQuery)
  // Main status state
  const [submitted, setSubmitted] = useState(false)

  // FileUpload
  const {
    upload,
    cancel,
    pending: filePending,
    fileUrl,
    error: fileError,
  } = useFileUpload({
    errors: {
      upload: data.errors.uploadError,
      fileSize: data.errors.uploadSizeError,
    },
  })

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
      ? { ...values, position, attachment }
      : { ...values, position }
    return axios
      .post('https://api.significa.co/career', body)
      .then(() => {
        setSubmitted(true)
      })
      .catch(() => {
        return { global: data.errors.global }
      })
  }

  // Validate
  function validate(values: IValues) {
    const errors: IErrors = {}

    if (!values.name) {
      errors.name = data.errors.nameRequired
    }

    if (!values.email) {
      errors.email = data.errors.emailRequired
    } else if (
      typeof values.email === 'string' &&
      !MAIL_REGEX.test(values.email)
    ) {
      errors.email = data.errors.emailInvalid
    }

    if (!values.message) {
      errors.message = data.errors.messageRequired
    }

    return errors
  }

  return (
    <Theme theme="dark">
      <S.Wrapper isSubmitting={form.isSubmitting}>
        {submitted ? (
          <Success goBack={() => setSubmitted(false)} />
        ) : (
          <RightContent title={data.form.title}>
            {form.errors.global && <S.Error>{form.errors.global}</S.Error>}

            <form onSubmit={form.handleSubmit}>
              <S.Input
                {...fields.name}
                label={data.form.name.label}
                placeholder={data.form.name.placeholder}
                error={form.touched.name && form.errors.name}
              />
              <S.Input
                {...fields.email}
                type="email"
                label={data.form.email.label}
                placeholder={data.form.email.placeholder}
                error={form.touched.email && form.errors.email}
              />
              <S.Input
                {...fields.portfolio}
                label={data.form.portfolio.label}
                placeholder={data.form.portfolio.placeholder}
              />
              <S.Textarea
                {...fields.message}
                label={data.form.message.label}
                placeholder={data.form.message.placeholder}
                error={form.touched.message && form.errors.message}
              />
              <S.ActionsWrapper>
                <S.FileInput
                  label={data.form.attachment.label}
                  onSelect={upload}
                  onClear={cancel}
                  uploading={filePending}
                  error={fileError}
                />
                <S.Button
                  disabled={!form.valid || filePending}
                  pending={form.isSubmitting}
                >
                  {data.form.submit.label}
                </S.Button>
              </S.ActionsWrapper>
            </form>
          </RightContent>
        )}
      </S.Wrapper>
    </Theme>
  )
}

interface IPositionSubmit {
  careersYaml: {
    positions: {
      errors: {
        global: string
        nameRequired: string
        emailRequired: string
        emailInvalid: string
        messageRequired: string
        uploadError: string
        uploadSizeError: string
      }

      form: {
        title: string
        name: {
          label: string
          placeholder: string
        }
        email: {
          label: string
          placeholder: string
        }
        portfolio: {
          label: string
          placeholder: string
        }
        message: {
          label: string
          placeholder: string
        }
        attachment: {
          label: string
        }
        submit: {
          label: string
        }
      }
    }
  }
}

const positionFormQuery = graphql`
  query positionFormQuery {
    careersYaml {
      positions {
        errors {
          global
          nameRequired
          emailRequired
          emailInvalid
          messageRequired
          uploadError
          uploadSizeError
        }
        form {
          title
          name {
            label
            placeholder
          }
          email {
            label
            placeholder
          }
          portfolio {
            label
            placeholder
          }
          message {
            label
            placeholder
          }
          attachment {
            label
          }
          submit {
            label
          }
        }
      }
    }
  }
`

export default Form
