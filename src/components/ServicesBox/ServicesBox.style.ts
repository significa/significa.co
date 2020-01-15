import { Link } from 'gatsby'
import styled from 'styled-components'

import { media } from '@theme'

const MAGIC_NUMBER = '30%'

export const IconHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform ${({ theme }) => theme.transitions.cubic()};
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;

  transition: opacity ${({ theme }) => theme.transitions.ease()};
`

export const ImageHolder = styled.div`
  margin-top: -${MAGIC_NUMBER};
  margin-right: -1rem;

  width: calc(100% + 1rem);

  transform: ${`translateY(${MAGIC_NUMBER})`};
`

export const BoxLink = styled(Link)`
  box-sizing: border-box;
  display: block;

  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.subtle};
  color: ${({ theme }) => theme.colors.foreground};

  padding: 1.5rem;

  width: 100%;

  margin-bottom: ${MAGIC_NUMBER};

  ${media.hover} {
    &:hover {
      ${Header} {
        opacity: 0.6;
      }

      ${IconHolder} {
        transform: translateX(0.5rem);
      }
    }
  }
`
