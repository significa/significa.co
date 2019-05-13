import styled, { media } from '@theme'

import {
  Text as BaseText,
  Title as BaseTitle,
  Container as BaseContainer,
} from '../../UI'

export const Header = styled(BaseContainer)`
  text-align: center;
  padding: 7.5em 0 0;
`

export const Title = styled(BaseTitle)``

export const Text = styled(BaseText)``

export const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 6.25em;
`

export const TeamItem = styled.li`
  margin-bottom: 3.5em;
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
