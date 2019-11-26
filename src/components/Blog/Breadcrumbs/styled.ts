import styled from '@theme'

import { Text } from '../../UI'
import { Link } from 'gatsby'

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.subtle};
  background: ${({ theme: { colors } }) => colors.background};
`

export const Item = styled(Text).attrs({ as: Link })<{ to: string }>`
  padding-bottom: 0.6em;
  display: inline-block;

  color: ${({ theme: { colors } }) => colors.secondary};
  transition: color ${({ theme }) => theme.transitions.ease()};

  &:not([aria-current='page']):after {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-top: 2px solid ${({ theme: { colors } }) => colors.secondary}50;
    border-right: 2px solid ${({ theme: { colors } }) => colors.secondary}50;

    margin-left: 0.4em;
    margin-right: 0.9em;
    transform: rotate(45deg) translateY(-2px);
  }

  &:hover,
  &[aria-current='page'] {
    color: ${({ theme: { colors } }) => colors.foreground};
  }
`
