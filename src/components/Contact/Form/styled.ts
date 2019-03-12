import styled from '@theme'

import {
  Container,
  Input as BaseInput,
  Textarea as BaseTextarea,
  Button as BaseButton,
  FileInput as BaseFileInput,
} from '../../UI'

export const Input = styled(BaseInput)`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const Textarea = styled(BaseTextarea)`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export const Button = styled(BaseButton)``

export const FileInput = styled(BaseFileInput)``

export const Wrapper = styled(Container)`
  max-width: 30em;

  margin-top: 3em;
  margin-bottom: 3em;
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
