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

export const Button = styled(BaseButton)`
  min-height: 1.5rem;
`

export const FileInput = styled(BaseFileInput)`
  min-height: 1.5rem;
`

interface IWrapper {
  isSubmitting: boolean
}
export const Wrapper = styled(Container)`
  max-width: 30em;

  margin-top: 3em;
  margin-bottom: 3em;

  transition: opacity ${({ theme }) => theme.transitions.ease()};
  pointer-events: ${({ isSubmitting }: IWrapper) =>
    isSubmitting ? 'none' : 'default'};
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
