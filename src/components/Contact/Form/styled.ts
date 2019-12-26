import styled from 'styled-components'
import { media } from '@theme'

import {
  Container,
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
export const Wrapper = styled(Container)`
  max-width: 38em;

  margin-top: 7.5em;
  margin-bottom: 12.5em;

  transition: opacity ${({ theme }) => theme.transitions.ease()};
  pointer-events: ${({ isSubmitting }: IWrapper) =>
    isSubmitting ? 'none' : 'default'};

  ${media.medium} {
    margin-top: 7.5em;
    margin-bottom: 7.5em;
  }

  ${media.small} {
    margin-top: 5em;
    margin-bottom: 5em;
  }
`

export const Top = styled.div`
  margin-bottom: 3rem;
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
