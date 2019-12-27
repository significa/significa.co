import styled from 'styled-components'
import { media } from '@theme'
import { Link } from 'gatsby'

import {
  Container,
  Title as BaseTitle,
  Text as BaseText,
  Small as BaseSmall,
} from '../../../UI'
import ArrowIcon from '../../common/Arrow'

export const Wrapper = styled(Container)`
  margin-bottom: 5rem;
`

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;

  margin-bottom: 3.5rem;

  ${media.large} {
    grid-template-columns: 2fr 1fr;
  }

  ${media.medium} {
    grid-template-columns: 1fr;
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 0.75rem;
`

export const BoxTitle = styled(BaseText)`
  margin-bottom: 0.5rem;
`

export const BlockSmall = styled(BaseSmall)`
  display: block;
`

export const BoxesHolder = styled.ul`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-template-rows: auto 1fr;

  ${media.medium} {
    grid-gap: 2rem;
  }

  ${media.small} {
    grid-gap: 1.5rem;
  }
`

export const LinkHolder = styled.div`
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
`

export const RightArrow = styled(ArrowIcon)`
  margin-left: 0.5rem;
  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const BoxLink = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};

  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color ${({ theme }) => theme.transitions.ease()};

  ${media.hover} {
    &:hover {
      background-color: ${({ theme }) => theme.colors.subtle};

      ${RightArrow} {
        transform: translateX(0.5rem);
      }
    }
  }
`
