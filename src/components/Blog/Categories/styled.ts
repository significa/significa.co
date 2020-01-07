import { Link } from 'gatsby'
import styled from 'styled-components'

import { Text, Container as BaseContainer } from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme: { colors } }) => colors.background};
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &:after {
    content: '';
    display: block;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.subtle};
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export const Container = styled(BaseContainer)`
  position: relative;
  z-index: 2;
  margin-bottom: 1px;
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
