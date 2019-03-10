import React, { useRef, useEffect, useCallback } from 'react'

import Label from '../Label'
import * as S from './styled'

interface IInput {
  label: string
  hasError?: boolean
  [key: string]: any // TODO: Check how to extend input element
}

const resize = (el: HTMLTextAreaElement | null, baseHeight: number) => {
  if (el) {
    el.rows = 1
    el.rows = Math.floor(el.scrollHeight / baseHeight)
  }
}

const Textarea: React.FC<IInput> = ({ label, hasError, ...inputProps }) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const baseHeight = useRef(0)

  // Defining the textarea baseHeight when the component mounts
  useEffect(() => {
    if (ref.current) {
      const height = window.getComputedStyle(ref.current).height
      baseHeight.current = height ? parseFloat(height) : 0
    }
  }, [])

  // If the input value changes via props we need to recalculate the rows
  useEffect(() => {
    resize(ref.current, baseHeight.current)
  }, [inputProps.value])

  // Resize onChange, while still sending the event back via props
  const handleOnChange = useCallback(
    e => {
      inputProps.onChange(e)
      resize(ref.current, baseHeight.current)
    },
    [inputProps.onChange]
  )

  return (
    <Label hasError={hasError}>
      {label}
      <S.Textarea
        hasError={hasError}
        ref={ref}
        {...inputProps}
        onChange={handleOnChange}
      />
    </Label>
  )
}

Textarea.defaultProps = {
  onChange: Function.prototype,
}

export default Textarea
