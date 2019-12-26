import styled from 'styled-components'
import { media } from '@theme'

import {
  Input as BaseInput,
  Textarea as BaseTextarea,
  Button as BaseButton,
  FileInput as BaseFileInput,
  Display,
  Text as BaseText,
} from '../../UI'

interface IWrapper {
  isSubmitting: boolean
}
export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  transition: opacity ${({ theme }) => theme.transitions.ease()};
  pointer-events: ${({ isSubmitting }: IWrapper) =>
    isSubmitting ? 'none' : 'default'};
`

export const Title = styled(Display)``
export const Text = styled(BaseText)`
  margin-top: 0.5rem;
`
export const Error = styled(BaseText)`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 2rem;
`

export const Button = styled(BaseButton)`
  min-height: 1.5rem;
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${media.small} {
    display: block;

    ${Button} {
      margin-top: 2em;
    }
  }
`

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

export const FileInput = styled(BaseFileInput)`
  min-height: 1.5rem;
`
