import styled from 'styled-components'

import { media } from '@theme'
import { Container, Text as BaseText } from 'components/UI'

export const Wrapper = styled(Container)`
  display: flex;

  justify-content: space-between;

  ${media.large} {
    flex-direction: column;
  }
`

export const TextContent = styled.div`
  flex: 1;
`

export const TextHolder = styled.div`
  position: sticky;
  top: 7rem;
  padding-bottom: 14rem;
  max-width: 27rem;

  ${media.large} {
    position: relative;
    top: 0;
    padding-bottom: 0;
  }
`

export const Text = styled(BaseText)`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

export const Boxes = styled.div`
  display: flex;
  justify-content: flex-end;

  flex: 1;

  ${media.large} {
    margin-top: 7em;
  }

  ${media.medium} {
    justify-content: flex-start;
  }
`

export const BoxesLeft = styled.div`
  margin-top: 10rem;
  margin-right: 2rem;

  flex: 1;

  ${media.large} {
    display: none;
  }
`

export const BoxesRight = styled.div`
  margin-top: 20rem;

  flex: 1;

  ${media.large} {
    margin-top: 0;
    display: flex;
  }

  ${media.medium} {
    flex-direction: column;

    max-width: 20rem;
  }
`

export const BoxHolder = styled.div`
  width: 100%;

  ${media.large} {
    margin: 0 1rem;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  ${media.medium} {
    margin: 0;
  }
`

export const ShowOnSmall = styled(BoxHolder)`
  display: none;

  ${media.large} {
    display: block;
  }
`
