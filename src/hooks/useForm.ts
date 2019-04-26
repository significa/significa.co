import { useState, FormEvent } from 'react'

// TODO: This typings need to be drastically improved

type InputEvent = FormEvent<HTMLInputElement | HTMLTextAreaElement>
type SubmitEvent = FormEvent<HTMLFormElement>
type Value = string | number | boolean
interface IValue {
  [key: string]: Value
}
interface IError {
  [key: string]: string
}
interface ITouched {
  [key: string]: boolean
}
interface IUseForm {
  initialValues: IValue
  validate?: (values: IValue) => IError
  handleSubmit: (values: IValue) => Promise<any>
}
interface IForm {
  handleSubmit: (e: SubmitEvent) => void
  values: IValue
  errors: IError
  touched: ITouched
  isSubmitting: boolean
  valid: boolean
}
interface IFields {
  [key: string]: {
    value: Value
    onChange: (e: InputEvent) => void
    onBlur: (e: InputEvent) => void
  }
}

const useForm = ({ initialValues, validate, handleSubmit }: IUseForm) => {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState(validate ? validate(values) : {})
  const [isSubmitting, setSubmitting] = useState(false)
  const valid = !Object.keys(errors).length

  const getSanitizedValue = (e: InputEvent) => {
    // TODO: Typescript typing
    const { type, value, checked } = e.currentTarget as any

    if (/number|range/.test(type)) {
      const parsedValue = parseFloat(value)

      return isNaN(parsedValue) ? '' : parsedValue
    }

    return /checkbox/.test(type) ? checked : value
  }

  const handleValidation = (valuesToBeValidated: IValue) => {
    if (!validate) {
      return
    }

    setErrors(validate(valuesToBeValidated))
  }

  const handleOnChange = (e: InputEvent, key: string) => {
    const newValues = {
      ...values,
      [key]: getSanitizedValue(e),
    }
    setValues(newValues)
    handleValidation(newValues)
  }

  const handleOnBlur = (_: InputEvent, key: string) => {
    setTouched({ ...touched, [key]: true })
    handleValidation(values)
  }

  const handleOnSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    // Start by touching all fields
    setTouched(
      Object.keys(initialValues).reduce((acc, key) => {
        return { ...acc, [key]: true }
      }, {})
    )

    if (!valid) {
      return
    }

    setSubmitting(true)

    return handleSubmit(values)
      .then(() => {
        setSubmitting(false)
      })
      .catch(submissionErrors => {
        setErrors({ ...errors, ...submissionErrors })
        setSubmitting(false)
      })
  }

  const fields = Object.keys(values).reduce((acc, key) => {
    return {
      ...acc,
      [key]: {
        name: key,
        value: values[key] || '',
        onChange: (e: InputEvent) => handleOnChange(e, key),
        onBlur: (e: InputEvent) => handleOnBlur(e, key),
      },
    }
  }, {})

  const returnArray: [IForm, IFields] = [
    {
      handleSubmit: handleOnSubmit,
      values,
      touched,
      errors,
      isSubmitting,
      valid,
    },
    fields,
  ]

  return returnArray
}

export default useForm
