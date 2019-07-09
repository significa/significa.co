import styled, { media } from '@theme'
import Img from 'gatsby-image'

import { Container as BaseContainer } from '../../UI/'
import * as T from '../../UI/Typography'

export const Container = styled(BaseContainer)`
  margin: 2rem auto -2.5em;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;

  ${media.medium} {
    display: block;
    margin-top: 0;
  }
`

export const Image = styled(Img)`
  width: 50%;

  ${media.medium} {
    width: auto;
    margin-top: 2em;
    margin-right: -1.5em;
  }
`

export const Content = styled.div`
  width: 50%;
  display: flex;

  ${media.medium} {
    width: 100%;
    display: block
  }

  > div {
    width: 60%;
    margin: auto;

    ${media.medium} {
      width: 100%;
      padding-top: 2em;
    }
  }


`

export const Big = styled(T.Big)`
  margin-bottom: 1rem;
`

export const Description = styled(T.Text)`
  margin-bottom: 2rem;
  font-size: 1em;
  line-height: 1.3;
`

export const Text = styled(T.Text)`
  margin-bottom: .5rem;
  font-size: 1em;
`