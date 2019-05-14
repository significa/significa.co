import styled, { media } from '@theme'

import {
  Text as BaseText,
  Title as BaseTitle,
  Container as BaseContainer,
} from '../../UI'

export const TeamWrapper = styled(BaseContainer)`
  text-align: center;
  padding-top: 7em;

  ${media.medium} {
    padding-top: 3em;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 0.5rem;
`

export const Text = styled(BaseText)``

export const TeamList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  grid-gap: 3em;

  margin-top: 7em;

  ${media.medium} {
    margin-top: 3em;
  }
`

export const TeamItem = styled.li``

export const TeamImage = styled.div`
  margin-bottom: 1em;
  position: relative;
`

export const CompanyLogo = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
  color: #fff;
`
