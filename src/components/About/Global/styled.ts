import styled, { media } from '@theme'

import {
  Text as BaseText,
  Title as BaseTitle,
  Container as BaseContainer,
} from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)`
  padding-bottom: 7.5em;
  margin-top: 25%;

  ${media.xlarge} {
    margin-top: 15%;
  }
`

export const Header = styled.div`
  max-width: 38rem;
  margin: 0 auto;
`

export const Image = styled.div`
  padding-bottom: calc(12em - 25%);
  transform: translateY(-50%);
`

export const Title = styled(BaseTitle)``
export const Text = styled(BaseText)``
