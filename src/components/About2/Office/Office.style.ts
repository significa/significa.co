import styled from 'styled-components'

import { media } from '@theme'
import { Display, NavLink, TitleAndText } from 'components/UI'

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Title = styled(Display)`
  &:last-of-type {
    margin-bottom: 2rem;
  }
`

export const TextContent = styled(TitleAndText)`
  margin: 0 auto;
  text-align: center;
`

export const SubContent = styled.div`
  max-width: 27rem;
  margin-top: 5rem;

  ${media.small} {
    margin-top: 3rem;
  }
`

export const SubLink = styled(NavLink)`
  display: inline-block;
  margin-top: 2rem;
`

export const Gallery = styled.div`
  margin: 3rem 0;
  display: flex;
`

const Column = styled.div`
  flex: 1;

  & > *:not(:last-child) {
    margin-bottom: 3rem;
  }

  ${media.medium} {
    & > *:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
`

export const Left = styled(Column)`
  margin-right: 1rem;

  ${media.medium} {
    margin-right: 0.5rem;
  }
`
export const Middle = styled(Column)`
  margin: 0 2rem;

  ${media.medium} {
    margin: 0 1rem;
  }

  ${media.small} {
    display: none;
  }
`

export const Right = styled(Column)`
  margin-left: 1rem;

  ${media.medium} {
    display: none;
  }
`
