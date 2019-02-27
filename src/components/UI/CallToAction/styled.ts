import styled from '@theme'

import { Display as BaseDisplay, Big as BaseBig } from '../'

export const CallToActionWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};

  padding: 12rem 2rem 10rem;

  text-align: center;

  @media (max-width: 48em) {
    padding: 8rem 2rem 7rem;
  }

  @media (max-width: 32em) {
    padding: 6.5rem 1rem 6rem;
  }
`

export const Display = styled(BaseDisplay)`
  margin-bottom: 0.5rem;

  @media (max-width: 32em) {
    font-size: 2em;
    line-height: 1.25;
    letter-spacing: 0;
  }
`

export const Big = styled(BaseBig)`
  margin-bottom: 2.5rem;
`
