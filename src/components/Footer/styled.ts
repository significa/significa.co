import { Link } from 'gatsby'

import styled from '@theme'
import { Container as BaseContainer } from '../UI/'

export const Footer = styled.footer`
  padding: 2.5em 0 7.5em;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 48em) {
    padding-bottom: 5em;
  }

  @media (max-width: 32em) {
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
  display: grid;

  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;
  grid-template-areas: 'l l l l r r r r r r r r';

  @media (max-width: 64em) {
    grid-column-gap: 2em;
    grid-template-areas: 'l l r r r r r r r r r r';
  }

  @media (max-width: 48em) {
    grid-template-rows: auto 1fr;
    grid-column-gap: 0;
    grid-row-gap: 2em;
    grid-template-areas:
      'r r r r r r r r r r r r'
      'l l l l l l l l l l l l';
  }
`

export const Left = styled.div`
  grid-area: l;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Right = styled.div`
  grid-area: r;
`

export const LogoLink = styled(Link)`
  margin-bottom: 2em;
`
