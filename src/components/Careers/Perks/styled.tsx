import styled from '@theme'

import { Big, Text } from '../../UI/'

export const Wrapper = styled.div`
  margin-top: 12em;

  @media (max-width: 64em) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 3em;
  }
`

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    box-sizing: border-box;
    width: calc(100% / 3 - 4%);

    &:nth-child(3n) {
      padding-right: 0;
    }

    @media (max-width: 64em) {
      width: calc(100% / 2 - 4%);
      padding-right: 0;
    }

    @media (max-width: 32em) {
      width: 100%;
      padding-right: 0;
    }

    svg {
      margin-bottom: 1em;
      height: 130px;
    }
  }

  &:after {
    content: '';
    width: calc(100% / 3 - 4%);
  }
`

export const SectionTitle = styled(Big)`
  margin-bottom: 0.5rem;
`

export const SectionText = styled(Text)`
  margin-bottom: 3em;
`
