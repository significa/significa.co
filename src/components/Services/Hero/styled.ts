import styled from 'styled-components'
import { media } from '@theme'

import { Container, Display, Big } from '../../UI'

export const TopWrapper = styled(Container)`
  max-width: 38em;

  margin-top: 7.5em;

  ${media.medium} {
    margin-top: 7.5em;
  }

  ${media.small} {
    margin-top: 5em;
  }
`

export const Title = styled(Display)``
export const Text = styled(Big)`
  margin-top: 1.5rem;

  &:first-of-type {
    margin-top: 3rem;
  }
`

export const ServicesWrapper = styled(Container)`
  position: relative;

  max-width: 44em;
  display: flex;
  justify-content: space-between;

  margin-top: 3em;
  margin-bottom: 12.5em;

  flex-wrap: wrap;

  ${media.large} {
    margin-bottom: 8em;
  }

  ${media.medium} {
    max-width: 38em;

    margin-top: 0;
    margin-bottom: 3em;
  }

  ${media.small} {
    margin-bottom: 3em;
  }
`

export const ServiceItem = styled.div`
  margin-top: 3rem;

  ${media.medium} {
    width: 50%;
  }

  ${media.small} {
    width: 100%;
  }
`

export const ListTitle = styled(Big).attrs({ as: 'h3' })`
  margin-bottom: 1rem;
`

export const ArrowImg = styled.img`
  position: absolute;

  bottom: -5em;

  left: 50%;
  transform: translateX(-50%);

  pointer-events: none;

  ${media.medium} {
    display: none;
  }
`
