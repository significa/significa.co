import styled from '@theme'

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

  @media (max-width: 64em) {
    width: 100%;
    padding-right: 0;
  }
`

export const SectionTitle = styled(Big)`
  margin-bottom: 0.5rem;
`

export const SectionText = styled(Text)`
  margin-bottom: 3em;

  @media (max-width: 32em) {
    margin-bottom: 2em;
  }
`
