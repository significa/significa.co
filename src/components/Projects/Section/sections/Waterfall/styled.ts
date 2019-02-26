import styled from '@theme'

import PaddedWrapper from '../common/PaddedWrapper'

export const Wrapper = styled(PaddedWrapper)`
  /** TODO: Remove when choosing another approach other than react-columns */
  /** Targetting each  column */
  & > div > div {
    margin-left: -5em !important;
    margin-right: -5em !important;

    & > div {
      padding-left: 5em !important;
      padding-right: 5em !important;

      &:nth-child(2) {
        padding-top: 10em;
      }
    }

    @media (max-width: 64em) {
      margin-left: -3em !important;
      margin-right: -3em !important;

      & > div {
        padding-left: 3em !important;
        padding-right: 3em !important;

        &:nth-child(2) {
          padding-top: 5em;
        }
      }
    }

    @media (max-width: 48em) {
      margin-left: -1em !important;
      margin-right: -1em !important;

      & > div {
        padding-left: 1em !important;
        padding-right: 1em !important;

        &:nth-child(2) {
          padding-top: 3em;
        }
      }
    }

    @media (max-width: 48em) {
      & > div {
        &:nth-child(2) {
          padding-top: 0;
        }
      }
    }
  }
`

export const ImgHolder = styled.div`
  margin-bottom: 5em;

  @media (max-width: 48em) {
    margin-bottom: 3em;
  }

  @media (max-width: 32em) {
    margin-bottom: 1em;
  }
`
