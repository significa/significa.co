import styled from 'styled-components'

import { Text } from '../../UI'
import { Link } from 'gatsby'

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
    bottom: -1px;
    right: 0;
  }
`

export const Item = styled(Text).attrs({ as: Link })<{ to: string }>`
  padding-bottom: 0.6em;
  display: inline-block;

  color: ${({ theme: { colors } }) => colors.secondary};
  transition: color ${({ theme }) => theme.transitions.ease()};

  &:not(:last-child):after {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-top: 2px solid ${({ theme: { colors } }) => colors.secondary}50;
    border-right: 2px solid ${({ theme: { colors } }) => colors.secondary}50;

    margin-left: 0.3em;
    margin-right: 0.7em;
    transform: rotate(45deg) translateY(-2px);
  }

  &:hover,
  &:last-child {
    color: ${({ theme: { colors } }) => colors.foreground};
  }

  &:last-child {
    margin-right: 1em;
  }
`
