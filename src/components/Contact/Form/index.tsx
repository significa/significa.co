import React from 'react'

import * as S from './styled'

import useForm from '../../../hooks/useForm'

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const initialValues = {
  name: '',
  email: '',
  budget: '',
  message: '',
}

const validate = (values: { [key: string]: string | number | boolean }) => {
  const errors: { [key: string]: string } = {}

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

const handleSubmit = () => {
  return new Promise<{ [key: string]: string }>((_, reject) => {
    return setTimeout(() => reject({ name: 'name taken' }), 3000)
  })
}

const Form: React.FC<{}> = () => {
  const [form, fields] = useForm({ initialValues, validate, handleSubmit })

  // tslint:disable-next-line: no-console
  const handleFileSelect = (file: File) => console.log(file)

  return (
    <S.Wrapper isSubmitting={form.isSubmitting}>
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
          label="Budget"
          placeholder="Do you have a fixed budget? (optional)"
          {...fields.budget}
        />
        <S.Textarea
          name="message"
          label="Your message"
          placeholder="What's on your mind?"
          {...fields.message}
        />
        <S.ActionsWrapper>
          <S.FileInput label="Attachment" onSelect={handleFileSelect} />
          <S.Button disabled={!form.valid} pending={form.isSubmitting}>
            Send
          </S.Button>
        </S.ActionsWrapper>
      </form>
    </S.Wrapper>
  )
}

export default Form
