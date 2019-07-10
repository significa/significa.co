import styled, { media, css } from '@theme'
import { Link } from 'gatsby'

import { Container as BaseContainer } from '../../UI/'
import * as T from '../../UI/Typography'

export const Image = styled(Link)<{ imageOnRight: boolean }>`
  transition: transform ${({ theme }) => theme.transitions.cubic('0.7s')};
  width: 90%;

  position: absolute;
  top: -10%;
  ${({ imageOnRight }) => imageOnRight ? css`
    right: 0;
  `: css`
    left: -40%;
  `}

  ${media.medium} {
    position: relative;
    width: 150%;
    margin-left: -50%;
    margin-right: -2rem;
    width: auto;
    display: block;
  }
`

export const Container = styled(BaseContainer)`
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  position: relative;
  margin: 2rem auto -2.5em;
  padding: 0;

  ${media.medium} {
    margin-top: 0;
  }

  ${media.hover} {
    &:hover ${Image} {
      transform: scale(1.03);
    }
  }
`

export const SectionTag = styled(T.Label)`
  display: inline-block;
  margin-bottom: 2em;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.foreground};
  padding: .2em .6em;
`

export const Content = styled(Link)<{ textOnRight: boolean }>`
  width: 50%;
  display: flex;
  padding: 10% 0;
  position: relative;
  z-index: 9;

  ${({ textOnRight }) => textOnRight && css`
    margin-left: 50%;
  `}

  ${media.medium} {
    width: 100%;
    display: block
  }
`

export const InnerContent = styled.div`
  width: 80%;
  margin: auto;

  ${media.small} {
    width: 60%;
  }

  ${media.medium} {
    width: 100%;
  }
`

export const Title = styled(T.Big)`
  margin-bottom: 1rem;
`

export const Description = styled(T.SmallText)`
  margin-bottom: 2rem;
`

export const Text = styled(T.SmallText)`
  margin-bottom: .5rem;
`