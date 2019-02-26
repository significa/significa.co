import styled from '@theme'
import PaddedWrapper from '../common/PaddedWrapper'

import {
  Title as BaseTitle,
  ArrowLink as BaseArrowLink,
  Label as BaseLabel,
  Link as BaseLink,
} from '../../../../UI'
import Anchor from './Anchor'

export { PaddedWrapper as Wrapper }

export const AnchorIcon = styled(Anchor)`
  position: absolute;

  top: 50%;
  left: -2em;
  transform: translateY(-50%);
  opacity: 0;

  transition: opacity ${({ theme }) => theme.transitions.ease()};

  @media (max-width: 48em) {
    display: none;
  }
`

export const TitleWrapper = styled.a`
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;

  &:hover {
    ${AnchorIcon} {
      opacity: 1;
    }
  }
`

export const Title = styled(BaseTitle)``

export const ArrowLink = styled(BaseArrowLink)`
  margin-top: 2.5em;
`

export const Link = styled(BaseLink)`
  display: inline-block;
  margin-top: 2.5em;
`

export const Label = styled(BaseLabel).attrs({ as: 'small' })`
  display: block;
  color: ${({ theme }) => theme.colors.medium};
  margin-bottom: 0.75em;
`
