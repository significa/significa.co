import styled from 'styled-components'
import { media } from '@theme'

import { Container, Title as BaseTitle, Text as BaseText, Big } from '../../UI'
import { AnyStyledComponent } from 'styled-components'

export const Wrapper = styled(Container)`
  margin-top: 12.5rem;
  margin-bottom: 12.5rem;

  ${media.large} {
    margin-top: 10rem;
    margin-bottom: 10rem;
  }

  ${media.medium} {
    margin-top: 7.5rem;
    margin-bottom: 7.5rem;
  }

  ${media.small} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 3.5rem;
`

export const Columns = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`

export const ColumnTitle = styled(BaseText).attrs({ as: 'h3' })`
  margin-bottom: 0.75rem;
`

export const Text = styled(Big)``
export const PhoneLink: AnyStyledComponent = styled(Big).attrs({ as: 'a' })`
  display: block;

  color: ${({ theme }) => theme.colors.foreground};

  text-decoration: none;

  transition: opacity ${({ theme }) => theme.transitions.ease()};

  ${media.hover} {
    &:hover {
      opacity: 0.6;
    }
  }
`
export const MailLink = styled(PhoneLink)`
  color: ${({ theme }) => theme.colors.highlight};
`
