import styled, { IFullTheme } from '@theme'

import { Label as BaseLabel } from '../../Typography'

interface ILabel {
  hasError?: boolean
  theme: IFullTheme
}

export const Label = styled(BaseLabel)`
  transition: color ${({ theme }) => theme.transitions.ease()};
  color: ${({ hasError, theme }: ILabel) =>
    hasError ? theme.colors.error : theme.colors.foreground};
`
