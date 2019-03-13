import React, { useState, useRef } from 'react'

import * as S from './styled'

import Error from '../Error'

interface IFileInput {
  label: string
  onSelect?: (file: File) => void
  onClear?: () => void
  uploading?: boolean
  error?: string
  className?: string
}

/**
 * FIle input is and must be uncontrolled because value
 * can only be selected by user and not programatically
 * https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
 */

const FileInput = ({
  label,
  onSelect,
  onClear,
  uploading,
  error,
  className,
  ...props
}: IFileInput) => {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState('')

  const clear = () => {
    if (ref.current) {
      ref.current.value = ''
      setFile('')
    }
    if (typeof onClear === 'function') {
      onClear()
    }
  }

  const handleSelect = (files: FileList) => {
    setFile(files[0].name)
    if (typeof onSelect === 'function') {
      onSelect(files[0])
    }

    if (ref.current) {
      ref.current.blur()
    }
  }

  return (
    <div>
      <S.Wrapper className={className}>
        <label>
          <S.Input
            {...props}
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                handleSelect(e.target.files)
              }
            }}
            ref={ref}
          />
          <S.Button hasError={!!error}>
            <S.Clip hasError={!!error} />
            {file || label}
          </S.Button>
        </label>

        {file && (
          <S.ClearButton onClick={clear}>
            <S.Clear />
          </S.ClearButton>
        )}

        {uploading && <S.Uploading />}
      </S.Wrapper>
      {error && <Error>{error}</Error>}
    </div>
  )
}

export default FileInput
