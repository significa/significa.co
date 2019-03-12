import React from 'react'

import Label from '../Label'
import * as S from './styled'

interface IInput {
  label: string
  hasError?: boolean
  className?: string
  [key: string]: any // TODO: Check how to extend input element
}

const Input: React.FC<IInput> = ({
  label,
  hasError,
  className,
  ...inputProps
}) => {
  return (
    <Label hasError={hasError} className={className}>
      {label}
      <S.Input hasError={hasError} {...inputProps} />
    </Label>
  )
}

export default Input
