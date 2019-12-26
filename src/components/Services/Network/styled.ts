import styled from 'styled-components'
import { media } from '@theme'

import { Title as BaseTitle, Big, Link as BaseLink } from '../../UI'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8em 0 10em;
  text-align: center;

  ${media.large} {
    padding: 5em 0;
  }

  ${media.medium} {
    padding: 3em 0;
  }

  ${media.small} {
    padding: 2em 0;
  }
`

export const TextContent = styled.div`
  max-width: 40em;
  margin: 0 auto;

  ${media.large} {
    max-width: 32em;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 1rem;
`

export const Text = styled(Big)``

export const CardHolder = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 3em;

  max-width: 52em;
  margin: 0 auto;

  margin-top: 3rem;

  ${media.medium} {
    grid-auto-flow: row;
  }

  ${media.small} {
    grid-gap: 2em;
  }
`

export const Card = styled.div`
  color: ${({ theme }) => theme.colors.foreground};
  text-align: left;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.subtle};
  padding: 2rem;
`

export const LogoHolder = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;

  svg {
    max-height: 100%;
    width: auto;
  }
`

export const CardTitle = styled(Big)`
  margin-bottom: 0.75rem;
`

export const Link = styled(BaseLink)`
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
`
