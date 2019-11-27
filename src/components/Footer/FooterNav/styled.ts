import styled, { media } from '@theme'
import { Small, Link } from '../../UI/'

export const Title = styled(Small).attrs({ as: 'h4' })`
  margin-bottom: 2em;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    min-width: 20%;
  }

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

export const Column = styled.div<{ howManyColumns: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;

  a {
    display: inline-block;
    padding: 0.5em 0;
    min-width: calc(100% / ${({ howManyColumns }) => howManyColumns});
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
