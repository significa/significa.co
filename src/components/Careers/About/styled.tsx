import styled from 'styled-components'
import { media } from '@theme'

import { ArrowLink as BaseArrowLink, Big, Text } from '../../UI'

export const ArrowLink = styled(BaseArrowLink)``

export const SectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Section = styled.div`
  box-sizing: border-box;
  width: 50%;
  padding-right: 3em;

  ${media.large} {
    width: 100%;
    padding-right: 0;
  }
`

export const SectionTitle = styled(Big)`
  margin-bottom: 0.5rem;
`

export const SectionText = styled(Text)`
  margin-bottom: 3em;

  ${media.small} {
    margin-bottom: 2em;
  }
`
