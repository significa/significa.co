import styled from '@theme'

import { Text } from '../../UI'
import { Link } from 'gatsby'

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.subtle};
  background: ${({ theme: { colors } }) => colors.background};
  white-space: nowrap;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export const Item = styled(Text).attrs({ as: Link })<{ to: string }>`
  margin-right: 1.5em;
  padding-bottom: 0.6em;
  display: inline-block;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.subtle};
  margin-bottom: -1px;

  &[aria-current='page'] {
    color: ${({ theme: { colors } }) => colors.brand};
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.brand};
  }
`
