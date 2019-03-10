import React, { useState, useRef } from 'react'

import * as S from './styled'

interface IFileInput {
  label: string
  onSelect: (file: File) => void
  uploading?: boolean
  hasError?: boolean
}

/**
 * FIle input is and must be uncontrolled because value
 * can only be selected by user and not programatically
 * https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
 */

const FileInput = ({
  label,
  onSelect,
  uploading,
  hasError,
  ...props
}: IFileInput) => {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState('')

  const clear = () => {
    if (ref.current) {
      ref.current.value = ''
      setFile('')
    }
  }

  const handleSelect = (files: FileList) => {
    setFile(files[0].name)
    onSelect(files[0])

    if (ref.current) {
      ref.current.blur()
    }
  }

  return (
    <S.Wrapper>
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
        <S.Button hasError={hasError}>
          <S.Clip hasError={hasError} />
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
  )
}

export default FileInput
