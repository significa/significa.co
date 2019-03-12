import React from 'react'

import * as S from './styled'

import useForm from '../../../hooks/useForm'

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Form: React.FC<{}> = () => {
  const [form, fields] = useForm({
    initialValues: {
      name: '',
      email: '',
      budget: '',
      message: '',
    },
    validate: values => {
      const errors: { [key: string]: string } = {}

      if (!values.name) {
        errors.name = 'Name is required'
      }

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (
        typeof values.email === 'string' &&
        !MAIL_REGEX.test(values.email)
      ) {
        errors.email = 'Email is invalid'
      }
      return errors
    },
    handleSubmit: () => {
      return new Promise((_, reject) => {
        return setTimeout(() => reject({ name: 'name taken' }), 3000)
      })
    },
  })

  // tslint:disable-next-line: no-console
  const handleFileSelect = (file: File) => console.log(file)

  return (
    <S.Wrapper>
      <form onSubmit={form.handleSubmit}>
        <S.Input
          name="name"
          label="Your name"
          placeholder="How should we call you?"
          hasError={form.touched.name && form.errors.name}
          {...fields.name}
        />
        <S.Input
          type="email"
          name="email"
          label="Your email"
          placeholder="Your email address"
          hasError={form.touched.email && form.errors.email}
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
          placeholder="Tell us more about your project"
          {...fields.message}
        />
        <S.ActionsWrapper>
          <S.FileInput label="Attachment" onSelect={handleFileSelect} />
          <S.Button disabled={!form.valid}>Send</S.Button>
        </S.ActionsWrapper>
      </form>
    </S.Wrapper>
  )
}

export default Form
