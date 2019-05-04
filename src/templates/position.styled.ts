import styled from '@theme'

import { Container } from '../components/UI/'

export const Wrapper = styled(Container)`
  margin-top: 5rem;
  margin-bottom: 10rem;
  max-width: 38em;
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 5rem;
  margin-bottom: 5rem;

  @media (max-width: 32em) {
    margin-top: 3rem;
  }

  svg {
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.foreground};
    margin-left: 0.75rem;
  }
`
