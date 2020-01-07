import styled, { keyframes } from 'styled-components'
import { media } from '@theme'

import Img from '../../PrismicImage'

import { Display, Big, Small } from '../../UI'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: -3rem;

  ${media.medium} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

export const Image = styled(Img)`
  position: relative;

  max-width: 22rem;
  width: 100%;
  height: auto;

  margin-left: 3rem;
  margin-right: -2rem;

  ${media.medium} {
    margin: 0;
  }
`

export const Holder = styled.div`
  margin-top: 1rem;
  max-width: 32rem;
  margin-bottom: 5rem;

  ${media.medium} {
    margin-bottom: 3rem;
  }
`

export const PreTitle = styled(Small)`
  font-weight: 400;
  display: block;
  margin-bottom: 0.75rem;
`

export const Title = styled(Display)`
  margin-bottom: 1rem;
`

export const Description = styled(Big)``

const goDown = keyframes`
  from {
    top: 8px;
  }

  to {
    top: 4px;
  }
`

export const Mouse = styled.div`
  position: relative;
  margin-top: 5rem;

  width: 1rem;
  height: 1.5rem;

  border: 2px solid ${({ theme }) => theme.colors.medium};
  border-radius: 1rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 6px;
    top: 5px;

    width: 4px;
    height: 4px;
    border-radius: 2px;

    background-color: ${({ theme }) => theme.colors.foreground};

    animation: ${goDown} 1s cubic-bezier(0.2, 1, 0.2, 1) infinite alternate;
  }

  ${media.medium} {
    display: none;
  }
`
