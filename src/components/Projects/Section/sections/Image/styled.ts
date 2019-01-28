import styled from '@theme'
import { Small } from '../../../../UI'

export const Caption = styled(Small).attrs({ as: 'figcaption' })`
  margin-top: 1.5em;
  color: ${({ theme }) => theme.colors.medium};
  text-align: center;
`
