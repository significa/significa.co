import styled, { media } from '@theme'

import { ArrowLink as BaseArrowLink, Text } from '../UI/'

export const Wrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.background};
`

export const ListItem = styled.li`
  position: relative;
  padding-bottom: 2em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};

  &:not(:last-child) {
    margin-bottom: 2em;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  display: block;
  transition: opacity ${({ theme }) => theme.transitions.ease()};

  ${media.hover} {
    &:hover {
      opacity: 0.6;
    }
  }
`

export const More = styled(Text)`
  margin-top: 0.5em;
`

export const ArrowLink = styled(BaseArrowLink)`
  margin-top: 3em;
`

export const IconHolder = styled.div`
  position: absolute;

  top: 0.25em;
  left: -2em;

  ${media.large} {
    position: relative;
    left: auto;
    top: auto;
    margin-bottom: 1em;
  }
`
