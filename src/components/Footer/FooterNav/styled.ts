import styled from 'styled-components'
import { media } from '@theme'
import { Small, Link } from '../../UI/'
import { Link as BaseLink } from 'gatsby'

export const Title = styled(Small).attrs({ as: 'h4' })`
  margin-bottom: 2em;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;

  a {
    display: inline-block;
    padding: 0.5em 0;
  }
`

export const ContactColumn = styled(Column)`
  margin-bottom: 2em;
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

export const LogoLink = styled(BaseLink)`
  margin-bottom: 2em;
`
