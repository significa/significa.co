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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 7em;

  ${media.medium} {
    margin-top: 3em;
  }

  ${media.small} {
    flex-direction: column;
  }
`

export const TeamItem = styled.li`
  margin: 0 0.5em 3.5em;
  min-width: calc((100% / 4) - 3em);

  ${media.small} {
    min-width: 100%;
  }

  ${media.medium} {
    min-width: calc((100% / 2) - 1em);
  }
`

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
