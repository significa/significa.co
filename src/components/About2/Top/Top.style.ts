import styled from 'styled-components'

import { media } from '@theme'
import { Big as BaseText, Container, Title as BaseTitle } from 'components/UI'

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};

  margin-bottom: 10rem;

  ${media.small} {
    margin-bottom: 2rem;
  }
`

export const EggOuterShell = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;

  position: fixed;
  z-index: 999;

  overflow: hidden;

  pointer-events: none;
`

export const EggShell = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled(Container)`
  padding-top: 100vh;
`

export const Title = styled(BaseTitle)`
  margin-bottom: 5rem;
`

export const Text = styled(BaseText)`
  margin-bottom: 1rem;
`

export const Inner = styled.div`
  max-width: 38rem;

  margin: 0 auto;
`

export const Gallery = styled(Container)`
  transform: translateY(40%);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.large} {
    grid-gap: 3em;
  }

  ${media.medium} {
    grid-gap: 1.5em;
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.small} {
    padding: 0;
    transform: translateY(10%);

    grid-template: auto / 1fr;
  }
`

export const ImgHolder = styled.div`
  ${media.medium} {
    &:last-child {
      display: none;
    }
  }
`
