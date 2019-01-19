import styled from '@theme'
import { Link } from 'gatsby'

export const Wrapper = styled.header`
  padding-top: 3em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 48em) {
    padding-top: 2em;
  }
`

export const LogoLink = styled(Link)`
  transition: ${({ theme }) => theme.transitions.ease('opacity')};
  /* Small optical compensation */
  margin-top: 0.25em;

  &:hover {
    opacity: 0.8;
  }
`
