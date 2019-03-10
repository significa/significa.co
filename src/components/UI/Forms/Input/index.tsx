import React from 'react'

import Label from '../Label'
import * as S from './styled'

interface IInput {
  label: string
  hasError?: boolean
  [key: string]: any // TODO: Check how to extend input element
}

const Input: React.FC<IInput> = ({ label, hasError, ...inputProps }) => {
  return (
    <Label hasError={hasError}>
      {label}
      <S.Input hasError={hasError} {...inputProps} />
    </Label>
  )
}

export default Input
