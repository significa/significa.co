import styled from 'styled-components'
import { IFullTheme } from '@theme'

import { Label as BaseLabel } from '../../Typography'

interface ILabel {
  hasError?: boolean
  theme: IFullTheme
}

export const Label = styled(BaseLabel)`
  display: inline-block;
  width: 100%;
  transition: color ${({ theme }) => theme.transitions.ease()};
  color: ${({ hasError, theme }: ILabel) =>
    hasError ? theme.colors.error : theme.colors.foreground};
`
