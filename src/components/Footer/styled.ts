import styled from 'styled-components'
import { media } from '@theme'

import { Container as BaseContainer } from '../UI/'

export const Footer = styled.footer`
  padding: 2.5em 0 5em;
  background-color: ${({ theme }) => theme.colors.background};

  ${media.medium} {
    padding-bottom: 5em;
  }

  ${media.small} {
    padding-bottom: 3em;
  }

  /** Footer can have different bg color than background.
      Use pseudo-element to hide color change on elastic scroll **/
  &:after {
    content: '';
    position: fixed;
    width: 100vw;
    height: 50vh;
    bottom: -50vh;
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const Container = styled(BaseContainer)`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 1;
    margin-bottom: 4em;

    &:first-child {
      min-width: calc(((100% / 12)) * 4.2);
    }

    &:last-child {
      margin-bottom: 2em;
    }
  }

  ${media.medium} {
    > * {
      flex: 1;
      min-width: auto;

      &:first-child {
        min-width: 100%;
      }
    }
  }

  ${media.small} {
    > * {
      flex: 1;
      min-width: 100%;

      &:first-child {
        min-width: 100%;
      }
    }
  }
`
