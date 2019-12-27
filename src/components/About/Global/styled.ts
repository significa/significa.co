import styled from 'styled-components'
import { media } from '@theme'
import Image from 'gatsby-image'

import {
  Text as BaseText,
  Title as BaseTitle,
  Container as BaseContainer,
} from '../../UI'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)``

export const TextContent = styled.div`
  max-width: 38rem;
  margin: 0 auto;
  margin-top: 10em;

  ${media.medium} {
    margin-top: 7em;
  }

  ${media.small} {
    margin-top: 5em;
  }
`

export const ImageContainer = styled.div`
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    height: 50%;
    width: 100%;
    top: -1px;
    background-color: white;
  }
`

export const ImageHolder = styled(BaseContainer)`
  position: relative;
`

export const Img = styled(Image)``

export const Title = styled(BaseTitle)`
  margin-bottom: 0.5em;
`

export const Text = styled(BaseText)``
