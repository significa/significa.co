import React, { useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import axios from 'axios'

import { MAIL_REGEX } from '../../../constants'

import * as S from './styled'

import useForm from '../../../hooks/useForm'
import useFileUpload from '../../../hooks/useFileUpload'
import { textByLine } from '../../../utils/textByLine'
import { Link } from '../../UI'
import Success from './Success'

interface IValues {
  [key: string]: string | number | boolean
}
interface IErrors {
  [key: string]: string
}

const Form: React.FC<IContactForm> = ({ contactYaml: data }) => {
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
      ? { ...values, type: 'enquiry', attachment }
      : { ...values, type: 'enquiry' }
    return axios
      .post('https://api.significa.co/enquiry', body)
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

  // Render
  if (submitted) {
    return <Success goBack={() => setSubmitted(false)} />
  }

  return (
    <S.Wrapper isSubmitting={form.isSubmitting}>
      <S.Top>
        {textByLine(data.title).map((line, key) => (
          <S.Title key={key}>{line}</S.Title>
        ))}
        <S.Text>
          {/* We need to find {link} in data.subtitle */}
          {data.subtitle.split(/({link})/gi).map((piece, i) =>
            piece === '{link}' ? (
              <Link key={i} to={`mailto:${data.mail}`}>
                {data.mail}
              </Link>
            ) : (
              <React.Fragment key={i}>{piece}</React.Fragment>
            )
          )}
        </S.Text>
      </S.Top>

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
          {...fields.budget}
          label={data.form.budget.label}
          placeholder={data.form.budget.placeholder}
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
    </S.Wrapper>
  )
}

/** Graphql from here until the bottom */

interface IContactForm {
  contactYaml: {
    title: string
    subtitle: string
    mail: string

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
      name: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      budget: {
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

const ConnectedForm = () => {
  return (
    <StaticQuery
      query={contactFormQuery}
      render={(data: IContactForm) => <Form {...data} />}
    />
  )
}

const contactFormQuery = graphql`
  query ContactFormQuery {
    contactYaml {
      title
      subtitle
      mail

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
        name {
          label
          placeholder
        }
        email {
          label
          placeholder
        }
        budget {
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

      success {
        title
        subtitle
        back
      }
    }
  }
`

export default ConnectedForm
