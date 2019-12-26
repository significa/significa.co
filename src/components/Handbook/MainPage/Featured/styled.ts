import styled from 'styled-components'
import { media } from '@theme'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { Container, Title as BaseTitle, Text as BaseText } from '../../../UI'

import ArrowIcon from '../../common/Arrow'

export const Wrapper = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;

  margin-bottom: 5rem;

  ${media.medium} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }

  ${media.small} {
    grid-gap: 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.largest} {
    max-width: 100%;
  }

  ${media.medium} {
    max-width: 75%;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 0.75rem;
`

export const Text = styled(BaseText)`
  margin-bottom: 2.5rem;
`

export const LinkText = styled(BaseText)`
  color: inherit;
`

export const LinkHolder = styled.div`
  display: flex;
  align-items: center;
`

export const RightArrow = styled(ArrowIcon)`
  margin-left: 0.5rem;
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Image = styled(Img)`
  position: absolute !important;
  max-width: 15rem;

  width: 40%;
  right: 0;
  top: 3rem;

  ${media.largest} {
    position: relative !important;
    right: auto;
    top: auto;

    width: 100%;
    max-width: 15rem;
    height: auto;

    margin-top: 3rem;
    margin-bottom: -4.5rem;
  }

  ${media.medium} {
    display: none;
  }
`

export const BoxLink = styled(Link)`
  display: flex;
  position: relative;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};

  border-radius: 2px;

  padding: 2rem;
  margin-bottom: 5rem;

  transition: background-color ${({ theme }) => theme.transitions.ease()};

  ${media.largest} {
    flex-direction: column;
    padding-bottom: 0;
  }

  ${media.medium} {
    padding-bottom: 2rem;
    margin-bottom: 0;
  }

  ${media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.subtle};

      ${RightArrow} {
        transform: translateX(0.5rem);
      }
    }
  }
`
