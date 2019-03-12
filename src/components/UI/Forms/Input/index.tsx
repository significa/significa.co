import React from 'react'

import Label from '../Label'
import Error from '../Error'

import * as S from './styled'

interface IInput {
  label: string
  error?: string
  className?: string
  [key: string]: any // TODO: Check how to extend input element
}

const Input: React.FC<IInput> = ({
  label,
  error,
  className,
  ...inputProps
}) => {
  return (
    <Label hasError={!!error} className={className}>
      {label}
      <S.Input hasError={!!error} {...inputProps} />
      {error && <Error>{error}</Error>}
    </Label>
  )
}

export default Input
