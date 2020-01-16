import styled from 'styled-components'

import { media } from '@theme'
import { Container, Text as BaseText, Title as BaseTitle } from 'components/UI'

export const Wrapper = styled(Container)`
  display: flex;

  justify-content: space-between;

  ${media.large} {
    flex-direction: column-reverse;
  }
`

export const Images = styled.div`
  display: flex;

  flex: 1;

  ${media.large} {
    margin-top: 5rem;
  }

  ${media.small} {
    display: block;
  }
`

export const ImagesLeft = styled.div`
  margin-right: 3rem;

  flex: 1;
  max-width: 17.875rem;

  & > *:first-child {
    margin-bottom: 3rem;
  }

  ${media.large} {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    flex: 2;
    max-width: none;

    margin-right: 2rem;

    & > *:last-child {
      margin-right: 2rem;
    }

    & > * {
      flex: 1;
    }
  }

  ${media.medium} {
    margin-right: 1rem;

    & > *:last-child {
      margin-right: 1rem;
    }
  }

  ${media.small} {
    display: none;
  }
`

export const ImagesRight = styled.div`
  margin-right: 3rem;

  flex: 1;
  max-width: 17.875rem;

  ${media.large} {
    max-width: none;
    margin-right: 0;

    margin-right: 2rem;
  }

  ${media.medium} {
    margin-right: 0;
  }
`

export const Content = styled.div`
  max-width: 30rem;

  flex: 1;
`

export const Title = styled(BaseTitle)`
  margin-bottom: 2rem;
`

export const Text = styled(BaseText)`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 3rem;
  }
`
