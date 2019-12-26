import React, { useRef, useEffect, useCallback } from 'react'

import Label from '../Label'
import Error from '../Error'

import * as S from './styled'

interface ITextarea {
  label: string
  error?: string
  className?: string
  [key: string]: any // TODO: Check how to extend input element
}

const resize = (el: HTMLTextAreaElement | null, baseHeight: number) => {
  if (el) {
    el.rows = 1
    el.rows = Math.floor(el.scrollHeight / baseHeight)
  }
}

const Textarea: React.FC<ITextarea> = ({
  label,
  error,
  className,
  ...inputProps
}) => {
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
    [inputProps]
  )

  return (
    <Label hasError={!!error} className={className}>
      {label}
      <S.Textarea
        hasError={!!error}
        ref={ref}
        {...inputProps}
        onChange={handleOnChange}
      />
      {error && <Error>{error}</Error>}
    </Label>
  )
}

Textarea.defaultProps = {
  onChange: Function.prototype,
}

export default Textarea
