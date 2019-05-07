import styled, { media } from '@theme'
import { Small, Link } from '../../UI/'

export const Title = styled(Small).attrs({ as: 'h4' })`
  margin-bottom: 2em;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.medium} {
    display: grid;
    grid-template: auto auto / 1fr 1fr;

    grid-column-gap: 3em;
    grid-row-gap: 3em;
    grid-auto-flow: column;

    margin-bottom: 2em;
  }

  ${media.small} {
    display: grid;
    grid-template: auto / 1fr;
    grid-auto-flow: row;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    display: inline-block;
    padding: 0.5em 0;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;

  a:not(:last-child) {
    margin-right: 1em;
  }
`

export const FooterLink = styled(Link)`
  text-decoration: none;

  ${media.small} {
    padding: 0 !important;
    line-height: 3;
  }
`
