import styled from '@theme'

import { ArrowLink as BaseArrowLink, Big, Text } from '../../UI'

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;

  @media (max-width: 64em) {
    padding-left: 0;
    padding-right: 0;
  }
`

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
`
