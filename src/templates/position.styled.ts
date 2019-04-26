import styled from '@theme'

import { Container, displayStyle, bigStyle, textStyle } from '../components/UI/'

export const Wrapper = styled(Container)`
  margin-top: 5rem;
  margin-bottom: 10rem;
  max-width: 38em;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 5rem;
  margin-bottom: 10rem;

  svg {
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.foreground};
    margin-left: 0.75rem;
  }
`

export const Content = styled.div`
  h1 {
    ${displayStyle}
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    ${bigStyle}
    margin-top: 10rem;
    margin-bottom: 0.75rem;
  }

  p {
    ${textStyle}
  }

  ul {
    padding-left: 1em;
  }

  li {
    ${textStyle}
    list-style: disc;
  }
`
